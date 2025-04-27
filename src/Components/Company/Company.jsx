import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errors } from "../../data/validation.js";
import { iranyitoszamok } from "../../data/iranyitoszam";
import TransitionHeader from "../Header/TransitionHeader.jsx";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { colors } from "../../assets/js/functions.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  companyCont: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: colors.background,
    minHeight: "100vh",
  },
  companyCard: {
    width: { xs: "90%", sm: "80%", md: "50%" },
    backgroundColor: colors.card,
    borderRadius: "20px",
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: "20px",
  },
  companyItems: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  input: {
    "& .MuiInputBase-root": {
      borderRadius: "5px",
      backgroundColor: colors.button,
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${colors.button} inset`,
        WebkitTextFillColor: colors.text,
        caretColor: colors.text,
      },
    },
    "& .MuiInputBase-input": {
      color: colors.text,
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
  },
  text: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "lighter",
    fontSize: "1.2rem",
    marginBlockStart: "0.5em",
    marginBlockEnd: "0.5em",
    color: colors.text,
  },
  companyButton: {
    margin: "auto",
    padding: "5px 20px",
    fontSize: "1.5rem",
    height: "15%",
    color: "white",
    backgroundColor: colors.button,
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: colors.buttonHover,
    },
    transition: "background-color 0.3s ease",
  },
  errorDiv: {
    width: "100%",
    marginTop: "10px",
  },
  errorItem: {
    color: colors.uncompleted,
    fontSize: "1rem",
    margin: "4px 0",
  },
};

export default function Company() {
  const [errorMessages, setErrorMessages] = useState(errors);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [cegTipusok, setCegTipusok] = useState([]);
  const [visible, setVisible] = useState(false);
  const [cegEmail, setCegEmail] = useState("");
  const [cegNev, setCegNev] = useState("");
  const [cegTelefon, setCegTelefon] = useState("");
  const [isz, setIsz] = useState("");
  const [varos, setVaros] = useState("");
  const [utca, setUtca] = useState("");
  const [hazszam, setHazszam] = useState("");
  const [tipus,setTipus] = useState("")
  function errorsShow() {
    setVisible(false);
  }

  useEffect(() => {
    getCegTipusok();
  }, []);

  async function getCegTipusok() {
    fetch("https://localhost:44396/api/Forma")
      .then((response) => {
        if (!response.ok) {
          toast.error("Hiba a betöltéskor");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCegTipusok(data);
      });
  }

  // település beállítása irányítószám alapján
  function irszam(iranyitoszam) {
    var eredmeny = iranyitoszamok.find((x) => x.IRSZ == iranyitoszam);
    if (eredmeny) {
      setVaros(eredmeny.Település);
    } else {
      setVaros("");
    }
  
  }

  //van-e ilyen irányítószám
  function iszValid() {
    if (iranyitoszamok.find((x) => x.IRSZ == isz)) {
      return true;
    }
    return false;
  }

  //a településhez az az irányítószám tartozik-e
  function iszMatch() {
    if (varos == "") return false;

    var tegyed = iranyitoszamok.find((x) => x.IRSZ == isz);

    if (!tegyed) return false;

    return varos==tegyed.Település
  }

  function createCompany() {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/gm;
    var pass = 0;
    let errors = [...errorMessages];

    //hibakezelés
    if (emailRegEx.test(cegEmail)) {
      pass++;
      errors[0].ertek = false;
    } else {
      errors[0].ertek = true;
    }
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

    if (cegNev?.length > 0) {
      pass++;
      errors[5].ertek = false;
    } else {
      errors[5].ertek = true;
    }
    if (hazszam.length != 0) {
      pass++;
      errors[6].ertek = false;
    } else {
      errors[6].ertek = true;
    }
    setErrorMessages(errors);

    //regisztráció
    if (pass == 7) {
      fetch("https://localhost:44396/api/Felhasznalok/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nev: user.Nev,
          Email: user.Email,
          Szerepkor: "felhasználó",
          Telszam: user.Telszam,
          CegEmail: cegEmail,
          Passwd: user.Passwd,
          CegNev: cegNev,
          CegTelszam: cegTelefon,
          Iranyitoszam: isz,
          Varos: varos,
          Utca: utca,
          Hazszam: hazszam,
          Cegforma: tipus.FormaId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 409) {
              toast.error("Ez az e-mail cím már regisztrálva van.");
            } else {
              throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
            }
          } else {
            toast.success("Sikeres regisztráció!");
            sessionStorage.clear();
            navigate("/bejelentkezes");
            window.location.href = window.location.href;
          }
          return response.json();
        })
        .catch((error) => {
          toast.error("Szerver hiba. Kérlek próbáld meg később! " + error);
        });
    } else {
      //hibák megjelenítése
      setVisible(true);
    }
  }
  function iszOnChange(e) {
    let value = e.target.value
    setIsz(value);
    irszam(value);
  }

  return (
    <>
      <TransitionHeader />
      <Box sx={styles.companyCont}>
        <Card sx={styles.companyCard}>
          <Typography variant="h5" sx={{ color: colors.text, mb: 2 }}>
            Cég adatai
          </Typography>
          <Box sx={styles.companyItems}>
            <TextField
              id="cegemail"
              label="Céges email cím"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setCegEmail(e.target.value)}
              value={cegEmail}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="cegnev"
              label="Cég neve"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setCegNev(e.target.value)}
              value={cegNev}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="cegtelefon"
              label="Telefonszám"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setCegTelefon(e.target.value)}
              value={cegTelefon}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="isz"
              label="Irányítószám"
              type="number"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => iszOnChange(e)}
              value={isz}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="varos"
              label="Település"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setVaros(e.target.value)}
              value={varos}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="utca"
              label="Utca"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setUtca(e.target.value)}
              value={utca}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <TextField
              id="hazszam"
              label="Házszám"
              sx={styles.input}
              fullWidth
              onFocus={errorsShow}
              onChange={(e) => setHazszam(e.target.value)}
              value={hazszam}
            />
          </Box>
          <Box sx={styles.companyItems}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.text }}>Cégforma</InputLabel>
              <Select
                label="Cégforma"
                value={tipus ? tipus.FormaId : ""}
                onChange={(e) => {
                  const selected = cegTipusok.find(
                    (type) => type.FormaId === e.target.value
                  );
                  setTipus(selected || "");
                }}
                sx={{
                  backgroundColor: colors.button,
                  color: colors.text,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.text,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.buttonHover,
                  },
                  "& .MuiSelect-icon": {
                    color: colors.text,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: colors.card,
                      color: colors.text,
                    },
                  },
                }}
              >
                {cegTipusok.map((type) => (
                  <MenuItem
                    key={type.FormaId}
                    value={type.FormaId}
                    sx={{
                      color: colors.text,
                      "&:hover": { backgroundColor: colors.buttonHover },
                    }}
                  >
                    {type.Nev}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {visible && (
            <Box sx={styles.errorDiv} id="errors">
              {errorMessages
                .filter((x) => x.ertek === true)
                .map((item, index) => (
                  <Typography key={index} sx={styles.errorItem}>
                    {item.uzenet}
                  </Typography>
                ))}
            </Box>
          )}
          <Button
            id="company_button"
            onClick={createCompany}
            sx={styles.companyButton}
          >
            Cég létrehozása
          </Button>
        </Card>
      </Box>
    </>
  );
}
