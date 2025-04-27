import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Színek az előző feladatokból
const colors = {
  background: "#152238",
  button: "#2a3b5f",
  card: "#1c2e4a",
  text: "#c5cacd",
  buttonHover: "#3b4e7a",
  secondaryBackground: "#f5f5f5",
};

// A TaskPopup-ban használt disabledInputStyle átvétele
const disabledInputStyle = {
  "& .Mui-disabled": {
    color: colors.text,
    WebkitTextFillColor: colors.text,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    backgroundColor: "transparent !important",
  },
};

export default function Password(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
  const [visible, setVisible] = useState(false);

  const errorsShow = () => {
    setVisible(false);
  };

  // ellenőrzés
  function checkPassword(){
    if (newPassword === "") {
      return "A jelszó nem lehet üres";
    }
    if (newPassword === repeatNewPassword) {
      if (passwordRegEx.test(newPassword)) {
        return true;
      }
      return "A jelszó nem megfelelő formátumú";
    }
    return "A jelszavak nem egyeznek";
  };


  function updatePassword(){
    const check = checkPassword();
    // jelszó módosítás
    if (check === true) {
      fetch("https://localhost:44396/api/Felhasznalok/changepassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: user.Email,
          OldPassword: oldPassword,
          NewPassword: newPassword,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (!response.status == 401) {
              toast.error("Hibás jelszó", {toastId: "password-error"});
            } else {
              toast.dismiss();
              toast.error("Hiba történt: " + response.status, {toastId: "error"});
            }
          } else {
            toast.success("Sikeres jelszómódosítás", {toastId: "password-success"});
            setTimeout(() => {
              close()
            },3000);
          }
        })
        .catch((error) => {
          toast.error("Hiba történt: " + error);
        });
    } else {
      //hibakezelés
      setVisible(true);
      toast.error(check);
    }
  };

  const emptyPopup = () => {
    setOldPassword("");
    setNewPassword("");
    setRepeatNewPassword("");
    setVisible(false);
  };

  const close = () => {
    toast.dismiss("password-error");
    toast.dismiss("error")
    toast.dismiss("password-success")
    setShowNewPassword(false)
    setShowOldPassword(false)
    emptyPopup();
    props.closePopup();
  };

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  return (
    <Dialog
      open={props.trigger}
      onClose={close}
      fullWidth
      maxWidth="sm"
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
        <Typography variant="h6">Jelszó módosítása</Typography>
        <IconButton
          aria-label="close"
          onClick={close}
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
        }}
      >
        <TextField
          sx={{
            ...disabledInputStyle,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.buttonHover,
            },
          }}
          margin="dense"
          fullWidth
          label="Régi jelszó"
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onFocus={errorsShow}
          onChange={(e) => setOldPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleOldPasswordVisibility}
                  edge="end"
                  sx={{ color: colors.text }}
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          sx={{
            ...disabledInputStyle,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.buttonHover,
            },
          }}
          margin="dense"
          fullWidth
          label="Új jelszó"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onFocus={errorsShow}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleNewPasswordVisibility}
                  edge="end"
                  sx={{ color: colors.text }}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          sx={{
            ...disabledInputStyle,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.buttonHover,
            },
          }}
          margin="dense"
          fullWidth
          label="Új jelszó ismét"
          type="password"
          value={repeatNewPassword}
          onFocus={errorsShow}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          variant="outlined"
        />
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#243249", padding: "10px 20px" }}>
        <Button
          onClick={updatePassword}
          variant="contained"
          sx={{
            backgroundColor: colors.button,
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
