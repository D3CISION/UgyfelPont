import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "../../assets/js/functions.jsx";

export default function AddAlkalmazottPopup({ closePopup, onSuccess }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [nev, setNev] = useState("");
  const [telszam, setTelszam] = useState("");
  const [email, setEmail] = useState("");
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/m;

  function postAlkalmazott() {
    fetch("https://localhost:44396/api/Felhasznalok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nev: nev,
        Email: email,
        Passwd: "",
        Szerepkor: "alkalmazott",
        Telszam: telszam,
        CegId: user.CegId,
      }),
    }).then((response) => {
      if (!response.ok) {
        if (response.status == 409) {
          toast.error("Ezzel az email címmel már létezik regisztrált személy.");
        } else {
          toast.error("Szerver hiba: " + response.status);
        }
      } else {
        if (onSuccess) onSuccess();
        closePopup();
      }
    });
  }

  // ellenőrzés
  function addAlkalmazott() {
    if (nev == "") {
      toast.error("A név nem lehet üres.");
    } else {
      if (!telefonRegEx.test(telszam) || telszam == "") {
        toast.error("Rossz formátumú telefonszám");
      } else {
        if (!emailRegEx.test(email) || email == "") {
          toast.error("Helytelen email cím");
        } else {
          //post
          postAlkalmazott();
        }
      }
    }
  }

  function handleClose() {
    setNev("");
    setTelszam("");
    setEmail("");
    closePopup();
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: colors.card,
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
          backgroundColor: colors.card,
          color: colors.text,
          fontWeight: "bold",
          paddingBottom: 1,
          borderWidth: 1,
          borderColor: colors.text,
          borderRadius: "none",
        }}
      >
        Alkalmazott hozzáadása
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: colors.text }}
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
          bgcolor: colors.card,
          color: colors.text,
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
        }}
      >
        <TextField
          label="Név"
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Telefonszám"
          value={telszam}
          onChange={(e) => setTelszam(e.target.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={addAlkalmazott}
          variant="contained"
          sx={{
            color: colors.text,
            "&:hover": { backgroundColor: colors.buttonHover },
          }}
        >
          Mentés
        </Button>
      </DialogActions>
    </Dialog>
  );
}
