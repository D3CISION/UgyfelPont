import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { hu } from "date-fns/locale";

// Custom locale to override AM/PM with de./du.
const customLocale = {
  ...hu,
  formatLong: {
    ...hu.formatLong,
    time: ({ format }) => {
      if (format === "dayPeriod") {
        return {
          wide: (context) => (context === "am" ? "de." : "du."),
          abbreviated: (context) => (context === "am" ? "de." : "du."),
          narrow: (context) => (context === "am" ? "de." : "du."),
        };
      }
      return hu.formatLong.time({ format });
    },
  },
};

export default function NewTaskPopup({
  trigger,
  closePopup,
  refreshData,
  postToUser,
  ugyfel,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState(null);
  const [selectedIsmGyak, setSelectedIsmGyak] = useState("Egyszeri");
  const [selectedCustomer, setSelectedCustomer] = useState(ugyfel || "");
  const [selectedSzin, setSelectedSzin] = useState("");
  const [szins, setSzins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const iterationOptions = [
    "Egyszeri",
    "Heti",
    "Havi",
    "Negyedéves",
    "Féléves",
    "Éves",
  ];

  useEffect(() => {
    fetch(
      `https://localhost:44396/api/Felhasznalok/GetUgyfelek?id=${user.FelhasznaloId}`
    )
      .then((res) => res.json())
      .then((data) => setCustomers(data));

    fetch("https://localhost:44396/api/Szinek")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((v) => v && v.SzinId && v.szinNev)
          .map((v) => ({
            value: v.SzinId,
            label: v.szinNev,
          }));
        setSzins(filtered);
        if (filtered.length > 0) {
          setSelectedSzin(filtered[0].value); // Alapértelmezett szín beállítása
        }
      });
  }, []);

  useEffect(() => {
    setSelectedCustomer(ugyfel || "");
  }, [ugyfel]);


  //ügyfél hozzáadásának az ellenőrzése
  function customerCheck() {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/;
    if (!emailRegEx.test(customerEmail)) {
      return customerEmail;
    }
    if (!telefonRegEx.test(customerPhone)) {
      return customerPhone;
    }
    if (customerName.length == 0) {
      return customerName;
    }
    return true;
  }

  //ügyfél post
  function postCustomer() {
    const checkResult = customerCheck();
    if (checkResult == true) {
      const customer = {
        Nev: customerName,
        Email: customerEmail,
        Passwd: "",
        Telszam: customerPhone,
        CegId: user.CegId,
      };

      fetch("https://localhost:44396/api/Felhasznalok/PostUgyfel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status == 409) {
              toast.error(
                "Ezzel az email címmel már létezik regisztrált személy"
              );
            } else {
              toast.error("Hiba történt az ügyfél regisztrálásakor.");
            }
          }
          return res.json();
        })
        .then(() => {
          setCustomerName("");
          setCustomerEmail("");
          setCustomerPhone("");
          setShowCustomerForm(false);
          return fetch(
            `https://localhost:44396/api/Felhasznalok/GetUgyfelek?id=${user.FelhasznaloId}`
          );
        })
        .then((res) => res.json())
        .then((data) => setCustomers(data))
        .catch(() => toast.error("Hiba történt. Próbáld újra később."));
    } else {
      displayCustomerCheck(checkResult);
    }
  };

  //hiba kiírása
  function displayCustomerCheck(value) {
    switch (value) {
      case customerName:
        toast.error("A név nem lehet üres.");
        break;
      case customerEmail:
        toast.error("Az email cím nem megfelelő formátumú.");
        break;
      case customerPhone:
        toast.error("A telefonszám nem megfelelő formátumú.");
        break;
      default:
        toast.error("Ismeretlen hiba.");
    }
  }

  const postTask = () => {
    if (!taskName || !taskDate) {
      toast.error("A feladat címe és dátuma kötelező!");
      return;
    }

    // dátum összevonása
    let fullDateTime = taskDate;
    if (taskTime) {
      const hours = taskTime.getHours().toString().padStart(2, "0");
      const minutes = taskTime.getMinutes().toString().padStart(2, "0");
      const seconds = "00";
      fullDateTime = `${taskDate} ${hours}:${minutes}:${seconds}`;
    }

    const feladat = {
      Nev: taskName,
      Leiras: taskDesc || "Nincs leírás",
      Hatarido: fullDateTime,
      ismGyak: selectedIsmGyak || iterationOptions[0],
      Allapot: false,
      Ember: selectedCustomer ? selectedCustomer.FelhasznaloId : null, // ha nincs kiválasztott ügyfél, akkor csak a dolgozóhoz kerül a feladat
      szinId: selectedSzin || szins[0]?.value,
    };

    fetch(
      `https://localhost:44396/api/FelhasznaloFeladat/PostFeladatWithFelhasznalo?id=${postToUser.FelhasznaloId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feladat),
      }
    )
      .then(async (res) => {
        if (res.status !== 201 && res.status !== 200) {
          toast.error("Szerverhiba");
        } else {
          toast.success("Sikeres rögzítés");
          setTaskName("");
          setTaskDesc("");
          setTaskDate("");
          setTaskTime(null);
          setSelectedCustomer("");
          if (refreshData) refreshData();
          closePopup();
        }
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        return data;
      })
      .catch((err) => {
        toast.error("Szerver hiba. Kérlek próbáld meg később!");
      });
  };

  function handleClose() {
    setTaskName("");
    setTaskDesc("");
    setTaskDate("");
    setTaskTime(null);
    setSelectedCustomer("");
    setSelectedSzin(szins[0]?.value || "");
    closePopup();
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={customLocale}
    >
      <Dialog
        open={trigger}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1c2e4a",
              border: "none",
              borderRadius: 2,
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            border: "none",
            backgroundColor: "#1c2e4a",
            color: "#c5cacd",
            fontWeight: "bold",
            paddingBottom: 1,
            borderWidth: 1,
            borderColor: "#c5cacd",
            borderRadius: "none",
          }}
        >
          Feladat hozzáadása
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "#c5cacd" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "#1c2e4a",
            color: "#c5cacd",
            "& .MuiInputBase-root": {
              color: "#c5cacd",
              backgroundColor: "#2a3b5f",
            },
            "& .MuiInputLabel-root": {
              color: "#c5cacd",
            },
            "& .MuiSelect-icon": {
              color: "#c5cacd",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c5cacd",
            },
          }}
        >
          <TextField
            label="Dolgozó"
            value={postToUser ? postToUser.Nev : "Név"}
            disabled={true}
            fullWidth
          ></TextField>
          <TextField
            label="Feladat címe"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Leírás"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Határidő"
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
              max: "2100-12-31",
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c5cacd",
              },
            }}
          />

          <Box>
            <TimePicker
              ampm={false}
              label="Idő"
              value={taskTime}
              onChange={(newTime) => setTaskTime(newTime)}
              sx={{
                "& .MuiInputBase-root": {
                  color: "#c5cacd",
                  backgroundColor: "#2a3b5f",
                },
                "& .MuiInputLabel-root": {
                  color: "#c5cacd",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c5cacd",
                },
                width: "100%",
              }}
              slotProps={{
                dialog: {
                  sx: {
                    "& .MuiDialog-paper": {
                      backgroundColor: "#000 PMID: 000",
                      color: "#c5cacd",
                    },

                    "& .MuiClockNumber-root": {
                      color: "#000000 !important", // Fekete számok
                      backgroundColor: "#c5cacd",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      "&.Mui-selected": {
                        backgroundColor: "#2a3b5f",
                        color: "#c5cacd !important", // kiválasztott állapotban legyen világos
                      },
                      "&.Mui-focusVisible": {
                        outline: "2px solid #3a4b6f",
                        outlineOffset: 2,
                      },
                      "&:hover": {
                        backgroundColor: "#3a4b6f",
                        color: "#000000 !important",
                      },
                    },
                  },
                },
                actionBar: {
                  sx: {
                    "& .MuiButton-root": {
                      color: "#c5cacd",
                      backgroundColor: "#2a3b5f",
                      "&:hover": {
                        backgroundColor: "#3a4b6f",
                      },
                    },
                  },
                },
              }}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Ismétlődés</InputLabel>
            <Select
              value={selectedIsmGyak}
              onChange={(e) => setSelectedIsmGyak(e.target.value)}
              label="Ismétlődés"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                    backgroundColor: "#2a3b5f",
                    color: "#c5cacd",
                  },
                },
              }}
            >
              {iterationOptions.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ color: "#c5cacd" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {!ugyfel ? (
            <FormControl fullWidth>
              <InputLabel>Ügyfél</InputLabel>
              <Select
                value={
                  selectedCustomer ? selectedCustomer.FelhasznaloId || "" : ""
                }
                onChange={(e) => {
                  const selected = customers.find(
                    (c) => c.FelhasznaloId === e.target.value
                  );
                  setSelectedCustomer(selected || "");
                }}
                label="Ügyfél"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      overflowY: "auto",
                      backgroundColor: "#2a3b5f",
                      color: "#c5cacd",
                    },
                  },
                }}
              >
                <MenuItem value="" sx={{ color: "#c5cacd" }}>
                  Nincs kiválasztva
                </MenuItem>
                {customers.map((c) => (
                  <MenuItem
                    key={c.FelhasznaloId}
                    value={c.FelhasznaloId}
                    sx={{ color: "#c5cacd" }}
                  >
                    {c.Nev}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <div>{ugyfel ? ugyfel.Nev : ""}</div>
          )}
          {!ugyfel ? (
            <Button
              onClick={() => setShowCustomerForm((prev) => !prev)}
              sx={{
                color: "#c5cacd",
                "&:hover": { backgroundColor: "#2a3b5f" },
              }}
            >
              {showCustomerForm ? "Űrlap elrejtése" : "Új ügyfél hozzáadása"}
            </Button>
          ) : (
            <div></div>
          )}
          {showCustomerForm && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Ügyfél neve"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <TextField
                label="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <TextField
                label="Telefonszám"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={postCustomer}
                sx={{
                  backgroundColor: "#2a3b5f",
                  color: "#c5cacd",
                  "&:hover": { backgroundColor: "#3a4b6f" },
                }}
              >
                Ügyfél hozzáadása
              </Button>
            </Box>
          )}

          <FormControl fullWidth>
            <InputLabel>Szín</InputLabel>
            <Select
              value={selectedSzin}
              onChange={(e) => setSelectedSzin(e.target.value)}
              label="Szín"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                    backgroundColor: "#2a3b5f",
                    color: "#c5cacd",
                  },
                },
              }}
            >
              {szins.map((s) => (
                <MenuItem
                  key={s.value}
                  value={s.value}
                  sx={{ color: "#c5cacd" }}
                >
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSzin && (
            <Box
              mt={2}
              height="50px"
              borderRadius={2}
              bgcolor={selectedSzin || "grey.200"}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={postTask}
            variant="contained"
            sx={{
              backgroundColor: "#2a3b5f",
              color: "#c5cacd",
              "&:hover": { backgroundColor: "#3a4b6f" },
            }}
          >
            Feladat hozzáadása
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
