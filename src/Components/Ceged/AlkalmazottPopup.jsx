import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "../../assets/js/functions.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Disabled inputok stílusa
const disabledInputStyle = {
  "& .Mui-disabled": {
    color: colors.text,
    WebkitTextFillColor: `${colors.text} !important`,
    opacity: 0.6,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    backgroundColor: `${colors.button} !important`,
    opacity: 0.6,
  },
};


const textFieldStyle = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.text,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.buttonHover,
  },
  "& .MuiInputBase-root": {
    color: colors.text,
    backgroundColor: colors.button,
  },
  "& .MuiInputLabel-root": {
    color: colors.text,
  },
};

export default function AlkalmazottPopup({
  closePopup,
  onSuccess,
  alkalmazott,
  trigger,
  updateSelectedAlkalmazott,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [alkalmazottData, setAlkalmazottData] = useState(alkalmazott);
  const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/;


  useEffect(() => {
    setAlkalmazottData(alkalmazott);
  }, [alkalmazott]);

  const handleChange = (field, value) => {
    setAlkalmazottData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleClose() {
    setIsEditing(false);
    closePopup();
  }

  const handleMentes = async () => {
    if (!telefonRegEx.test(alkalmazottData.Telszam)) {
      toast.error("Kérlek, adj meg egy érvényes telefonszámot!");
      return;
    }
    await modifyData();
    setIsEditing(false);
  };

  const modifyData = () => {
    return fetch(
      `https://localhost:44396/api/Felhasznalok/PutUgyfelAlkalmazott?id=${alkalmazottData.FelhasznaloId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nev: alkalmazottData.Nev,
          Email: alkalmazottData.Email,
          OldPasswd: "",
          NewPasswd: "",
          Szerepkor: "alkalmazott",
          Telszam: alkalmazottData.Telszam,
          CegId: alkalmazottData.CegId,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        toast.success("Alkalmazott adatai sikeresen frissítve");
        return fetch(
          `https://localhost:44396/api/Felhasznalok/${alkalmazottData.FelhasznaloId}`
        );
      })
      .then((res) => res.json())
      .then((frissitettAdatok) => {
        if (updateSelectedAlkalmazott) {
          updateSelectedAlkalmazott(frissitettAdatok);
        }
      })
      .catch((error) => {
        toast.error("Szerver hiba. Kérlek próbáld meg később!");
      });
  };

  const handleDelete = () => {
    fetch(
      `https://localhost:44396/api/Felhasznalok/${alkalmazottData.FelhasznaloId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          if (onSuccess) onSuccess();
          closePopup();
        }
      })
      .catch((error) => {
        toast.error("Szerver hiba. Kérlek próbáld meg később!");
      });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Dialog
      open={trigger}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            backgroundColor: colors.card,
            border: "none",
            borderRadius: 2,
            boxShadow: "none",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
        >
          Alkalmazott adatai
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: colors.text }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          bgcolor: colors.card,
          color: colors.text,
        }}
      >
        <TextField
          sx={{ ...textFieldStyle, ...disabledInputStyle }}
          margin="dense"
          fullWidth
          label="Email"
          type="email"
          value={alkalmazottData?.Email || ""}
          onChange={(e) => handleChange("Email", e.target.value)}
          disabled={true}
          variant="outlined"
        />
        <TextField
          sx={{ ...textFieldStyle, ...disabledInputStyle }}
          margin="dense"
          fullWidth
          label="Név"
          value={alkalmazottData?.Nev || ""}
          onChange={(e) => handleChange("Nev", e.target.value)}
          disabled={!isEditing}
          variant="outlined"
        />
        <TextField
          sx={{ ...textFieldStyle, ...disabledInputStyle }}
          margin="dense"
          fullWidth
          label="Telefonszám"
          value={alkalmazottData?.Telszam || ""}
          onChange={(e) => handleChange("Telszam", e.target.value)}
          disabled={!isEditing}
          variant="outlined"
        />
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#243249", padding: "10px 20px" }}>
        <Button
          onClick={handleMentes}
          disabled={!isEditing}
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
          }}
        >
          Mentés
        </Button>
        <IconButton onClick={handleEditToggle} sx={{ color: colors.text }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} sx={{ color: colors.text }}>
          <DeleteIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
