import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import VezerloHeader from "../VezerloHeader/VezerloHeader";
import { iranyitoszamok } from "../../data/iranyitoszam.js";
import { errors } from "../../data/validation.js";
import { toast } from "react-toastify";
import { colors, stringAvatar } from "../../assets/js/functions.jsx";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Link,
} from "@mui/material";
import Cookies from "js-cookie";

export default function Cegprofil() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [ceg, setCeg] = useState(null);
  const [defaultCeg, setDefaultCeg] = useState(ceg);
  const [cegNev, setCegnev] = useState("");
  const [cegTelefon, setCegTelefon] = useState("");
  const [forma, setForma] = useState(null);
  const [irsz, setIrsz] = useState("");
  const [telepules, setTelepules] = useState("");
  const [utca, setUtca] = useState("");
  const [hazszam, setHazszam] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState(errors);
  const [cegTipusok, setCegTipusok] = useState([]);
  const [showTips, setShowTips] = useState(Cookies.get("showTips") === "true");
  const navigate = useNavigate();

  const disabledInputStyle = {
    "& .Mui-disabled": {
      color: colors.text,
      WebkitTextFillColor: colors.text,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      backgroundColor: "transparent !important",
    },
    "& .MuiInputBase-root": {
      color: colors.text,
      backgroundColor: colors.button,
    },
    "& .MuiInputLabel-root": {
      color: colors.text,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.text,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.buttonHover,
    },
  };

  const handleTipsToggle = (event) => {
    const choice = event.target.checked;
    setShowTips(choice);
    Cookies.set("showTips", choice, { expires: 365 });
  };

  useEffect(() => {
    getCegTipusok();
    setUser(JSON.parse(localStorage.getItem("user")));
    cegData();
  }, []);

  async function getCegTipusok() {
    fetch("https://localhost:44396/api/Forma")
      .then((response) => {
        if (!response.ok) {
          toast.error("hiba a betöltéskor");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCegTipusok(data);
      });
  }

  async function cegData() {
    await getCeg();
  }

  async function getCeg() {
    const url = `https://localhost:44396/api/Cegek/${user.CegId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setCeg(data);
      setDefaultCeg(data);
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  }

  useEffect(() => {
    if (ceg) {
      setDefaultCeg(ceg);
      setCegnev(ceg.Nev || "");
      setCegTelefon(ceg.Telszam || "");
      setForma(ceg.Forma || null);
      setIrsz(ceg.Cim?.Irsz || "");
      setTelepules(ceg.Cim?.TelepulesNev || "");
      setUtca(ceg.Cim?.Utca || "");
      setHazszam(ceg.Cim?.Hazszam || "");
    }
  }, [ceg]);

  function enableInputs() {
    if (!disabled) {
      setCegnev(defaultCeg.Nev || "");
      setCegTelefon(defaultCeg.Telszam || "");
      setForma(defaultCeg.Forma || cegTipusok[0] || null);
      setIrsz(defaultCeg.Cim?.Irsz || "");
      setTelepules(defaultCeg.Cim?.TelepulesNev || "");
      setUtca(defaultCeg.Cim?.Utca || "");
      setHazszam(defaultCeg.Cim?.Hazszam || "");
    }
    setDisabled(!disabled);
    errorsShow();
  }

  function errorsShow() {
    setVisible(false);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("ceg");
    navigate("/");
    window.location.href = window.location.href;
  }


  // irányítószám alapján a város beállítása
  function irszam(iranyitoszam) {
    var eredmeny = iranyitoszamok.find((x) => x.IRSZ == iranyitoszam);
    if (eredmeny) {
      setTelepules(eredmeny.Település);
    } else {
      setTelepules("");
    }
  }

  // ellenőrzi, hogy van-e ilyen irányítószám
  function iszValid() {
    if (iranyitoszamok.find((x) => x.IRSZ == irsz)) {
      return true;
    }
    return false;
  }


  // ellenőrzi, hogy az irányítószám az adott városhoz tartozik-e
  function iszMatch() {
    if (telepules == "") return false;

    var tegyed = iranyitoszamok.find((x) => x.IRSZ == irsz);

    if (!tegyed) return false;

    return telepules == tegyed.Település;
  }

  function saveChanges() {
    const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/gm;
    let pass = 0;
    let errors = [...errorMessages];


    // ellenőrzések
    if (telefonRegEx.test(cegTelefon)) {
      pass++;
      errors[1].ertek = false;
    } else {
      errors[1].ertek = true;
    }
    if (cegNev.length > 3) {
      pass++;
      errors[2].ertek = false;
    } else {
      errors[2].ertek = true;
    }
    if (iszValid()) {
      pass++;
      errors[3].ertek = false;
      if (iszMatch()) {
        pass++;
        errors[4].ertek = false;
      } else {
        errors[4].ertek = true;
      }
    } else {
      errors[3].ertek = true;
    }
    // van-e olyan forma
    const isValidForma = forma && cegTipusok.some((t) => t.FormaId === forma.FormaId);
    if (isValidForma) {
      pass++;
      errors[5].ertek = false;
    } else {
      errors[5].ertek = true;
    }
    if (hazszam.length !== 0) {
      pass++;
      errors[6].ertek = false;
    } else {
      errors[6].ertek = true;
    }
    setErrorMessages(errors);

    if (pass === 6) {
      // update
      fetch(`https://localhost:44396/api/Cegek/${ceg.CegId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Telszam: cegTelefon,
          Email: ceg.Email,
          Nev: cegNev,
          FormaId: forma.FormaId,
          Cimek: {
            Hazszam: hazszam,
            Utca: utca,
            TelepulesNev: telepules,
            Irsz: irsz,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              toast.error("Nem található a cég.");
            }
            return Promise.reject("Hiba történt a kérés feldolgozása közben.");
          }
          return response.text().then((text) => (text ? JSON.parse(text) : {}));
        })
        .then((data) => {
          if (Object.keys(data).length > 0) {
            localStorage.setItem("ceg", JSON.stringify(data));
          }
          toast.success("Sikeres adatmódosítás!");
          const updatedCeg = JSON.parse(localStorage.getItem("ceg")) || ceg;
          setCeg(updatedCeg);
          setDefaultCeg(updatedCeg);
          setCegnev(updatedCeg.Nev);
          setCegTelefon(updatedCeg.Telszam);
          setForma(updatedCeg.Forma);
          setIrsz(updatedCeg.Cim.Irsz);
          setTelepules(updatedCeg.Cim.TelepulesNev);
          setUtca(updatedCeg.Cim.Utca);
          setHazszam(updatedCeg.Cim.Hazszam);
          setDisabled(true);
        })
        .catch((error) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    } else {
      setVisible(true);
    }
  }

  function irszOnChange(e) {
    setIrsz(e.target.value);
    irszam(e.target.value);
  }

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <VezerloHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "center",
          padding: 2,
          gap: 2,
        }}
      >
        {/* Profil kártya */}
        <Card
          sx={{
            width: { xs: "90%", sm: "300px" },
            backgroundColor: colors.card,
            borderRadius: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: 0,
            }}
          >
            <Avatar
              {...stringAvatar(user.Nev)}
              sx={{
                width: "80px",
                height: "80px",
                fontSize: "2rem",
                backgroundColor: colors.text,
                color: "black",
              }}
            />
            <Typography variant="h6" sx={{ color: colors.text }}>
              {user.Nev || "N/A"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <Link
                component={RouterLink}
                to="/profil"
                sx={{
                  color: colors.text,
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: colors.buttonHover,
                  },
                }}
              >
                Profil
              </Link>
              <Link
                component={RouterLink}
                to="/cegprofil"
                sx={{
                  color: colors.text,
                  textDecoration: "none",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: colors.button,
                  "&:hover": {
                    backgroundColor: colors.buttonHover,
                  },
                }}
              >
                Céged
              </Link>
              <Button
                onClick={logout}
                sx={{
                  color: colors.text,
                  textTransform: "none",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: colors.buttonHover,
                  },
                }}
              >
                Kijelentkezés
              </Button>
            </Box>
            <FormControlLabel
              label="Tippek ki/bekapcsolása"
              labelPlacement="start"
              control={
                <Switch
                  checked={showTips}
                  onChange={handleTipsToggle}
                  sx={{
                    alignSelf: "center",
                    mt: "5px",
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: colors.buttonHover,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: colors.button,
                    },
                    transform: "translateY(-2px)",
                    overflow: "visible",
                  }}
                />
              }
              sx={{
                color: colors.text,
                marginY: 1,
                alignItems: "center",
                display: "flex",
                alignSelf: "center",
              }}
            />
          </CardContent>
        </Card>

        {/* Adatmódosítás */}
        <Box
          sx={{
            backgroundColor: colors.card,
            borderRadius: "10px",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: { xs: "90%", md: "50%" },
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: colors.text,
              mb: 3,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Céges adatok
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Cég emailcím"
              id="cegemail"
              value={ceg ? ceg.Email : ""}
              disabled
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Cég neve"
              id="cegnev"
              value={cegNev}
              onFocus={errorsShow}
              onChange={(e) => setCegnev(e.target.value)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Cég telefonszáma"
              id="cegtelefon"
              value={cegTelefon}
              onFocus={errorsShow}
              onChange={(e) => setCegTelefon(e.target.value)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <FormControl sx={{ width: "100%", ...disabledInputStyle }}>
              <InputLabel
                id="cegforma-label"
                sx={{ color: colors.text }}
                shrink={!!forma}
              >
                Cégforma
              </InputLabel>
              <Select
                label="Cégforma"
                labelId="cegforma-label"
                value={forma ? forma.FormaId : ""}
                onChange={(e) => {
                  const selectedForma = cegTipusok.find(
                    (x) => x.FormaId === e.target.value
                  );
                  setForma(selectedForma);
                }}
                disabled={disabled}
                notched
                sx={{
                  "& .MuiSelect-icon": {
                    color: colors.text,
                  },
                  color: colors.text,
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: colors.card,
                      color: colors.text,
                      maxHeight: 200,
                      overflowY: "auto",
                    },
                  },
                }}
              >
                {cegTipusok.map((type) => (
                  <MenuItem
                    key={type.FormaId}
                    value={type.FormaId}
                    sx={{ color: colors.text }}
                  >
                    {type.Nev}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Irányítószám"
              id="isz"
              type="number"
              value={irsz}
              onFocus={errorsShow}
              onChange={(e) => irszOnChange(e)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Település"
              id="telepules"
              value={telepules}
              onFocus={errorsShow}
              onChange={(e) => setTelepules(e.target.value)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Utca"
              id="utca"
              value={utca}
              onFocus={errorsShow}
              onChange={(e) => setUtca(e.target.value)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
              alignItems: "center",
            }}
          >
            <TextField
              label="Házszám"
              id="hazszam"
              value={hazszam}
              onFocus={errorsShow}
              onChange={(e) => setHazszam(e.target.value)}
              disabled={disabled}
              variant="outlined"
              sx={{
                width: "100%",
                ...disabledInputStyle,
              }}
            />
          </Box>

          {/* Gombok */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
              mt: 3,
              "@media(min-width: 768px)": { flexDirection: "row" },
            }}
          >
            <Button
              onClick={enableInputs}
              variant="contained"
              sx={{
                backgroundColor: colors.button,
                color: colors.text,
                "&:hover": { backgroundColor: colors.buttonHover },
                borderRadius: "10px",
                padding: "8px 16px",
              }}
            >
              Adatok módosítása
            </Button>
            <Button
              onClick={saveChanges}
              disabled={disabled}
              variant="contained"
              sx={{
                backgroundColor: colors.button,
                color: colors.text,
                "&:hover": { backgroundColor: colors.buttonHover },
                "&.Mui-disabled": {
                  backgroundColor: colors.button,
                  color: colors.text,
                  opacity: 0.5,
                },
                borderRadius: "10px",
                padding: "8px 16px",
              }}
            >
              Mentés
            </Button>
          </Box>

          {/* Hibaüzenetek */}
          {visible && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {errorMessages
                .filter((x) => x.ertek === true)
                .map((item, index) => (
                  <Typography key={index} sx={{ color: "red" }}>
                    {item.uzenet}
                  </Typography>
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}