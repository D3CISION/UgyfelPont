import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Switch,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { hu } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { toast } from "react-toastify";

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

function TaskPopup(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState(props.task || { Feladat: {} });
  const [feladatNev, setFeladatNev] = useState(taskData.Feladat?.Nev || "");
  const [hatarido, setHatarido] = useState(taskData.Feladat?.Hatarido || "");
  const [tasks, setTasks] = useState(props.tasks || []);
  const [feladatIdo, setFeladatIdo] = useState(() => {
    return taskData.Feladat?.Hatarido
      ? new Date(taskData.Feladat.Hatarido)
      : null;
  });
  const [leiras, setLeiras] = useState(taskData.Feladat?.Leiras || "");
  const [allapot, setAllapot] = useState(taskData.Feladat?.Allapot || false);
  const [selectedSzin, setSelectedSzin] = useState("");
  const [selectedIsmGyak, setSelectedIsmGyak] = useState("");
  const [szins, setSzins] = useState([]);
  const [taskUsers, setTaskUsers] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [applyToAll, setApplyToAll] = useState("single");

  const disabledInputStyle = {
    "& .Mui-disabled": {
      color: "#c5cacd",
      WebkitTextFillColor: "#c5cacd",
    },
    "& .MuiSelect-nativeInput": {
      display: "none",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      backgroundColor: "transparent !important",
    },
  };

  const iterationOptions = [
    "Egyszeri",
    "Heti",
    "Havi",
    "Negyedéves",
    "Féléves",
    "Éves",
  ];

  // dátum validáció
  function isValidDate(dateString){
    if (!dateString) return false;

    // megfelelő dátum ellenőrzése
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    // (2000-01-01 és 2100-12-31 között)
    const minDate = new Date("2000-01-01");
    const maxDate = new Date("2100-12-31");
    return date >= minDate && date <= maxDate;
  };

  useEffect(() => {
    getUsers();
  }, []);


  // színek
  useEffect(() => {
    fetch("https://localhost:44396/api/Szinek")
      .then((response) => response.json())
      .then((data) => {
        const filtered = data
          .filter((v) => v && v.SzinId && v.szinNev)
          .map((v) => ({ key: v.SzinId, value: v.SzinId, label: v.szinNev }));
        setSzins(filtered);
      })
      .catch((error) => toast.error(error.message));
  }, []);


  // alapértelmezett szín beállítása
  useEffect(() => {
    if (szins.length > 0 && taskData.Feladat?.szinId) {
      const defaultSzin = szins.find(
        (szin) => szin.value === taskData.Feladat.szinId
      );
      if (defaultSzin) setSelectedSzin(defaultSzin.value);
    }
  }, [szins, taskData.Feladat?.szinId]);

  useEffect(() => {
    if (taskData.Feladat?.ismGyak) {
      setSelectedIsmGyak(taskData.Feladat.ismGyak);
    }
  }, [taskData.Feladat?.ismGyak]);

  useEffect(() => {
    if (feladatIdo) {
      const hours = feladatIdo.getHours().toString().padStart(2, "0");
      const minutes = feladatIdo.getMinutes().toString().padStart(2, "0");
      const seconds = "00";
      const datePart =
        hatarido?.substring(0, 10) || new Date().toISOString().substring(0, 10);
      const localTimeString = `${datePart} ${hours}:${minutes}:${seconds}`;
      setHatarido(localTimeString);
    }
  }, [feladatIdo]);

  const getUsers = () => {
    fetch(
      `https://localhost:44396/api/FelhasznaloFeladat/FelhFromFeladat?id=${taskData.Feladat.FeladatId}`
    )
      .then((response) => {
        if (!response.ok) {
          toast.error("Hiba a felhasználók betöltésekor");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setTaskUsers(data);
      });
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setConfirmAction("delete");
    setConfirmDialogOpen(true);
  };

  const handleSaveClick = () => {
    // van-e határidő és érvényes-e
    if (!hatarido) {
      toast.error("A határidő megadása kötelező!");
      return;
    }
    if (!isValidDate(hatarido)) {
      toast.error(
        "Érvénytelen vagy túl távoli dátum! Kérlek, adj meg egy valós dátumot (2000-2100 között)."
      );
      return;
    }
    setConfirmAction("save");
    setConfirmDialogOpen(true);
  };

  // confirm
  const handleConfirmAction = () => {
    setConfirmDialogOpen(false);
    if (confirmAction === "delete") {
      handleDelete();
    } else if (confirmAction === "save") {
      handleMentes();
    }
  };

  const handleDelete = () => {
    const taskIdsToDelete =
      applyToAll === "group"
        ? tasks
            .filter((task) => task.Feladat.Csoport === taskData.Feladat.Csoport)
            .map((task) => task.Feladat.FeladatId)
        : [taskData.Feladat.FeladatId];

    if (taskIdsToDelete.length === 0) {
      toast.error("Nincs törölhető feladat a csoportban.");
      return;
    }

    if (applyToAll === "single") {
      fetch(
        `https://localhost:44396/api/Feladatok/${taskData.Feladat.FeladatId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Hiba a törléskor");
          }
          toast.success("Sikeres törlés");
          if (props.refreshData) props.refreshData();
          props.closePopup();
        })
        .catch((err) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    } else {
      Promise.all(
        taskIdsToDelete.map((id) =>
          fetch(`https://localhost:44396/api/Feladatok/DeleteAll?id=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
        )
      )
        .then((results) => {
          const failed = results.filter((result) => !result.res.ok);
          if (failed.length > 0) {
            throw new Error(
              `Hiba a törléskor: ${failed
                .map((f) => `Feladat ${f.id}`)
                .join(", ")}`
            );
          }
          toast.success("Sikeres törlés");
          if (props.refreshData) props.refreshData();
          props.closePopup();
        })
        .catch((err) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    }
  };

  const handleMentes = () => {
    // határidő meg van-e adva és érvényes-e
    if (!hatarido) {
      toast.error("A határidő megadása kötelező!");
      return;
    }
    if (!isValidDate(hatarido)) {
      toast.error(
        "Érvénytelen vagy túl távoli dátum! Kérlek, adj meg egy valós dátumot (2000-2100 között)."
      );
      return;
    }

    const feladat = {
      Nev: feladatNev,
      Hatarido: hatarido, // Pl. "2025-04-24 20:30:00"
      Leiras: leiras,
      ismGyak: selectedIsmGyak,
      Allapot: allapot,
      szinId: selectedSzin || taskData.Feladat.szinId,
    };

    const taskIdsToUpdate =
      applyToAll === "group"
        ? tasks
            .filter((task) => {
              const matchesGroup =
                task.Feladat.Csoport === taskData.Feladat.Csoport;
              return matchesGroup;
            })
            .map((task) => task.Feladat.FeladatId)
        : [taskData.Feladat.FeladatId];

    if (taskIdsToUpdate.length === 0) {
      toast.error("Nincs frissíthető feladat a csoportban.");
      return;
    }

    if (applyToAll === "single") {
      fetch(
        `https://localhost:44396/api/Feladatok/${taskData.Feladat.FeladatId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feladat),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Hiba a mentéskor");
          }
          toast.success("Sikeres frissítés");
          if (props.refreshData) props.refreshData();
          setIsEditing(false);
        })
        .catch((err) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    } else {
      fetch(
        `https://localhost:44396/api/Feladatok/PutAll?id=${taskData.Feladat.FeladatId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feladat),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Hiba a mentéskor");
          }
          toast.success("Sikeres frissítés");
          if (props.refreshData) props.refreshData();
          setIsEditing(false);
        })
        .catch((err) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={customLocale}
    >
      <Dialog
        open={props.trigger}
        onClose={props.closePopup}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1c2e4a",
              border: "none",
              borderRadius: 2,
              boxShadow: "none",
              overflowX: "hidden",
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
          }}
        >
          Feladat részletei
          <IconButton
            aria-label="close"
            onClick={props.closePopup}
            sx={{ position: "absolute", right: 8, top: 8, color: "#c5cacd" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box mt={2} ml={2}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="#c5cacd"
            gutterBottom
          >
            Személyek:
          </Typography>

          {taskUsers.length > 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              sx={{
                marginBottom: 1,
              }}
            >
              {taskUsers.map((user, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    padding: 1.5,
                    width: "50%",
                    borderRadius: 2,
                    backgroundColor: "#2a3b5f",
                  }}
                >
                  <Typography variant="body2" color="#c5cacd">
                    <strong>{user.Nev}</strong> — {user.Szerepkor}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nincs felhasználó a feladathoz.
            </Typography>
          )}
        </Box>
        <DialogContent
          dividers
          sx={{
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
            overflowX: "hidden",
          }}
        >
          <TextField
            sx={disabledInputStyle}
            margin="dense"
            fullWidth
            label="Feladat neve"
            value={feladatNev}
            onChange={(e) => setFeladatNev(e.target.value)}
            disabled={!isEditing}
          />
          <TextField
            sx={disabledInputStyle}
            margin="dense"
            fullWidth
            label="Leírás"
            value={leiras}
            onChange={(e) => setLeiras(e.target.value)}
            multiline
            rows={3}
            disabled={!isEditing}
          />
          <TextField
            sx={disabledInputStyle}
            margin="dense"
            fullWidth
            label="Határidő"
            type="date"
            value={hatarido.substring(0, 10)}
            onChange={(e) => {
              const newDate = e.target.value;
              const newHatarido = newDate ? `${newDate} 00:00:00` : "";
              setHatarido(newHatarido);
              setFeladatIdo(newDate ? new Date(newHatarido) : null);
            }}
            disabled={!isEditing}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
              max: "2100-12-31",
            }}
            required
          />

          <TimePicker
            ampm={false}
            label="Idő"
            value={feladatIdo}
            onChange={(newTime) => {
              if (!newTime) return;

              const datePart =
                hatarido?.substring(0, 10) ||
                new Date().toISOString().substring(0, 10);

              const hours = newTime.getHours().toString().padStart(2, "0");
              const minutes = newTime.getMinutes().toString().padStart(2, "0");
              const seconds = "00";

              const localTimeString = `${datePart} ${hours}:${minutes}:${seconds}`;
              const updatedDateTime = new Date(
                `${datePart}T${hours}:${minutes}:${seconds}`
              );

              setFeladatIdo(updatedDateTime);
              setHatarido(localTimeString);
            }}
            disabled={!isEditing}
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
              ...(isEditing ? {} : disabledInputStyle),
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
              },
              dialog: {
                sx: {
                  "& .MuiDialog-paper": {
                    backgroundColor: "#000000",
                    color: "#c5cacd",
                  },
                  "& .MuiDialogActions-root": {
                    px: 2,
                  },
                  "& .MuiDialogActions-root button": {
                    width: "100%",
                  },
                  "& .MuiClockNumber-root": {
                    color: "#000000 !important",
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
                      color: "#c5cacd !important",
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

          <FormControl fullWidth margin="dense">
            <InputLabel>Ismétlődés</InputLabel>
            <Select
              sx={disabledInputStyle}
              value={selectedIsmGyak}
              onChange={(e) => setSelectedIsmGyak(e.target.value)}
              disabled={!isEditing}
              label="Ismétlődés"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {iterationOptions.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ color: "black" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Szín</InputLabel>
            <Select
              sx={disabledInputStyle}
              value={selectedSzin}
              onChange={(e) => setSelectedSzin(e.target.value)}
              disabled={!isEditing}
              label="Szín"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {szins.map((szin) => (
                <MenuItem
                  key={szin.value}
                  value={szin.value}
                  sx={{ color: "black" }}
                >
                  {szin.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            mt={2}
            height="50px"
            borderRadius={2}
            bgcolor={selectedSzin || "grey.200"}
          />

          <Box
            mt={2}
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography>
              Állapot: {allapot ? "Teljesítve" : "Nincs teljesítve"}
            </Typography>
            <Switch
              checked={allapot}
              onChange={() => isEditing && setAllapot(!allapot)}
              disabled={!isEditing}
              sx={{
                alignSelf: "center",
                mt: "5px",
                transform: "translateY(-2px)",
                overflow: "visible",
                "&.Mui-disabled": {
                  opacity: 1,
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: allapot ? "#fff" : "#c5cacd",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: allapot ? "#4caf50" : "#2a3b5f",
                  opacity: 1,
                },
                "&.Mui-disabled .MuiSwitch-track": {
                  opacity: 1,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "#243249" }}>
          <Button
            onClick={handleSaveClick}
            disabled={!isEditing || !hatarido || !isValidDate(hatarido)}
            variant="contained"
            color="primary"
          >
            Mentés
          </Button>
          <IconButton onClick={handleEdit} color="secondary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick} color="error">
            <DeleteIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1c2e4a",
              border: "none",
              borderRadius: 2,
              boxShadow: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#1c2e4a",
            color: "#c5cacd",
            fontWeight: "bold",
          }}
        >
          {confirmAction === "delete"
            ? "Törlés megerősítése"
            : "Mentés megerősítése"}
          <IconButton
            aria-label="close"
            onClick={() => setConfirmDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#c5cacd" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#1c2e4a",
            color: "#c5cacd",
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            {confirmAction === "delete"
              ? "Biztosan törölni szeretnéd a feladatot?"
              : "Biztosan menteni szeretnéd a változtatásokat?"}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={applyToAll}
              onChange={(e) => setApplyToAll(e.target.value)}
            >
              <FormControlLabel
                value="single"
                control={
                  <Radio
                    sx={{
                      color: "#c5cacd",
                      "&.Mui-checked": { color: "#c5cacd" },
                    }}
                  />
                }
                label="Csak ezt a feladatot"
                sx={{ color: "#c5cacd" }}
              />
              <FormControlLabel
                value="group"
                control={
                  <Radio
                    sx={{
                      color: "#c5cacd",
                      "&.Mui-checked": { color: "#c5cacd" },
                    }}
                  />
                }
                label="Az összes azonos csoportba tartozó feladatot"
                sx={{ color: "#c5cacd" }}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#243249" }}>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            color={confirmAction === "delete" ? "error" : "primary"}
          >
            {confirmAction === "delete" ? "Törlöm" : "Mentem"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default TaskPopup;
