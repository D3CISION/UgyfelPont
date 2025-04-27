import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUgyfelPopup({ closePopup, onSuccess }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [nev, setNev] = useState("");
  const [telszam, setTelszam] = useState("");
  const [email, setEmail] = useState("");
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/m;


  // ügyfél postolása
  function postUgyfel() {
    fetch("https://localhost:44396/api/Felhasznalok/PostUgyfel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nev: nev,
        Email: email,
        Passwd: "",
        Szerepkor: "ügyfél",
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

  // adatok ellenőrzése
  function addUgyfel() {
    if (nev == "") {
      toast.error("A név nem lehet üres.");
    } else {
      if (!telefonRegEx.test(telszam) || telszam == "") {
        console.log(telszam);
        toast.error("Rossz formátumú telefonszám");
      } else {
        if (!emailRegEx.test(email) || email == "") {
          toast.error("Helytelen email cím");
        } else {
          postUgyfel();
        }
      }
    }
  }

  // popup bezárása
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
        Ügyfél hozzáadása
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
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c5cacd",
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
          onClick={addUgyfel}
          variant="contained"
          sx={{
            color: "#c5cacd",
            "&:hover": { backgroundColor: "#3a4b6f" },
          }}
        >
          Mentés
        </Button>
      </DialogActions>
    </Dialog>
  );
}