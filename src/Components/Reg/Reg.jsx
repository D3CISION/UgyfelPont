import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransitionHeader from "../Header/TransitionHeader.jsx";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GlobalStyles } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors = {
  background: "#152238",
  button: "#2a3b5f",
  card: "#1c2e4a",
  text: "#c5cacd",
  buttonHover: "#3a4e7a",
  secondaryBackground: "#f5f5f5",
  completed: "#4caf50",
  uncompleted: "#f44336",
};

const styles = {
  registration: {
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
  registrationCard: {
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
  loginItems: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
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
    color: colors.text,
  },
  registrationButton: {
    width: "50%",
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
  link: {
    color: colors.text,
    textDecoration: "underline",
    "&:hover": {
      color: colors.buttonHover,
    },
  },
  errorDiv: {
    backgroundColor: "red",
    width: "97%",
    padding: "5px",
    marginBottom: "10px",
  },
  errorItem: {
    color: "white",
    fontSize: "0.8rem",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
};

export default function Registration() {
  const [errorMessages, setErrorMessages] = useState([
    { uzenet: "Helytelen formátumú email cím.", ertek: false },
    { uzenet: "Helytelen formátumú telefonszám.", ertek: false },
    {
      uzenet:
        "A jelszó legalább 8, maximum 20 karakterből állhat, tartalmaznia kell kis- és nagybetűket és nem tartalmazhat különleges karakterek.",
      ertek: false,
    },
    { uzenet: "A jelszavak nem egyeznek.", ertek: false },
  ]);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [telefon, setTelefon] = useState("");
  const [visible, setVisible] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const user = {
    Nev: "",
    Email: "",
    Passwd: "",
    Telszam: "",
    Szerepkor: "felhasználó",
  };

  function errorsShow() {
    setVisible(false);
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }


  function registration() {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g;
    const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/gm;

    let pass = 0;
    let errors = [...errorMessages];

    // validáció

    if (emailRegEx.test(email)) {
      pass++;
      errors[0].ertek = false;
    } else {
      errors[0].ertek = true;
    }

    if (telefonRegEx.test(telefon)) {
      pass++;
      errors[1].ertek = false;
    } else {
      errors[1].ertek = true;
    }

    if (passwordRegEx.test(password)) {
      pass++;
      errors[2].ertek = false;
    } else {
      errors[2].ertek = true;
    }

    if (password === rePassword) {
      pass++;
      errors[3].ertek = false;
    } else {
      errors[3].ertek = true;
    }

    setErrorMessages(errors);

    // ha jó, akkor post
    if (pass === 4) {
      fetch(
        `https://localhost:44396/api/Felhasznalok/check-email?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.status === 409) {
            setEmailStatus("invalid");
          } else if (response.ok) {
            user.Email = email;
            user.Nev = userName;
            user.Passwd = password;
            user.Telszam = telefon;
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/ceg");
          } else {
            setEmailStatus(null);
          }
        })
        .catch((error) => {
          setEmailStatus(null);
          toast.error("Szerver hiba. Kérlek próbáld meg később!");
        });
    } 
    // különben hibaüzenetek
    else {
      setVisible(true);
    }
  }

  return (
    <>
      <GlobalStyles
        styles={{
          "input:-webkit-autofill": {
            boxShadow: `0 0 0 100px ${colors.button} inset !important`,
            WebkitTextFillColor: `${colors.text} !important`,
            caretColor: colors.text,
          },
        }}
      />
      <TransitionHeader />
      <Box sx={styles.registration}>
        <Card sx={styles.registrationCard}>
          <Typography variant="h4" sx={{ color: colors.text, mb: 2 }}>
            Regisztráció
          </Typography>
          <Box sx={styles.loginItems}>
            <TextField
              id="email"
              label="Email cím"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={errorsShow}
              sx={styles.input}
              fullWidth
            />
          </Box>
          <Box sx={styles.loginItems}>
            <TextField
              id="username"
              label="Név"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onFocus={errorsShow}
              sx={styles.input}
              fullWidth
            />
          </Box>
          <Box sx={styles.loginItems}>
            <TextField
              id="password1"
              label="Jelszó"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={errorsShow}
              sx={styles.input}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                      sx={{ color: colors.text }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={styles.loginItems}>
            <TextField
              id="password2"
              label="Jelszó ismétlése"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              onFocus={errorsShow}
              sx={styles.input}
              fullWidth
            />
          </Box>
          <Box sx={styles.loginItems}>
            <TextField
              id="telefon"
              label="Telefonszám"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              onFocus={errorsShow}
              sx={styles.input}
              fullWidth
            />
          </Box>
          {visible && (
            <Box sx={styles.errorDiv} id="errors">
              {errorMessages
                .filter((x) => x.ertek === true)
                .map((item, index) => (
                  <Box sx={styles.errorItem} key={index}>
                    <Typography sx={styles.errorItem}>{item.uzenet}</Typography>
                  </Box>
                ))}
            </Box>
          )}
          <Button
            id="registration_button"
            onClick={registration}
            sx={styles.registrationButton}
          >
            Regisztráció
          </Button>
          <Typography sx={styles.text}>
            Van már fiókod?{" "}
            <Link to="/bejelentkezes" style={styles.link}>
              Bejelentkezés
            </Link>
          </Typography>
        </Card>
      </Box>
    </>
  );
}
