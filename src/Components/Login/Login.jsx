import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import TransitionHeader from "../Header/TransitionHeader.jsx";
import { Box, Card, Typography, TextField, Button } from "@mui/material";
import { colors } from "../../assets/js/functions.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  loginCont: {
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
  loginCard: {
    width: { xs: "90%", sm: "80%", md: "50%" },
    height: "350px",
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
  loginButton: {
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
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Bejelentkezés
  async function login() {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Felhasznalok/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Passwd: password,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Helytelen jelszó");
        } else if (response.status === 404) {
          toast.error("Nincs ilyen email cím");
        } else {
          throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Sikeres bejelentkezés");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Szerver hiba. Kérlek próbáld meg később! "+error);
    }
  }

  return (
    <>
      <TransitionHeader />
      <Box sx={styles.loginCont}>
        <Card sx={styles.loginCard}>
          <Box sx={styles.loginItems}>
            <Typography sx={styles.text}>Email cím</Typography>
            <TextField
              id="email"
              label="Email cím"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={styles.input}
              fullWidth
            />
          </Box>
          <Box sx={styles.loginItems}>
            <TextField
              id="password1"
              label="Jelszó"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={styles.input}
              fullWidth
            />
          </Box>
          <Button id="login_button" onClick={login} sx={styles.loginButton}>
            Belépés
          </Button>
          <Typography sx={styles.text}>
            Még nincs fiókod?{" "}
            <Link to="/regisztracio" style={styles.link}>
              Regisztráció
            </Link>
          </Typography>
        </Card>
      </Box>
    </>
  );
}
