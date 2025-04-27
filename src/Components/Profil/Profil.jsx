import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import VezerloHeader from "../VezerloHeader/VezerloHeader";
import { stringAvatar, colors } from "../../assets/js/functions.jsx";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Link,
  FormControlLabel,
  Switch,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Password from "./Password.jsx";

const disabledInputStyle = {
  "& .Mui-disabled": {
    color: colors.text,
    WebkitTextFillColor: colors.text,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    backgroundColor: "transparent !important",
  },
};

export default function Profil() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [showTips, setShowTips] = useState(Cookies.get("showTips") === "true");
  const navigate = useNavigate();

  const handleTipsToggle = (event) => {
    const choice = event.target.checked;
    setShowTips(choice);
    Cookies.set("showTips", choice, { expires: 365 });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.href = window.location.href;
  };
  const [defaultUser, setDefaultUser] = useState(user);
  const [nev, setNev] = useState(user.Nev || "");
  const [telefon, setTelefon] = useState(user.Telszam || "");
  const [oldPassword, setOldPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [errorMessages, setErrorMessages] = useState([
    { uzenet: "Helytelen formátumú telefonszám.", ertek: false },
    {
      uzenet:
        "A jelszó legalább 8, maximum 20 karakterből állhat, tartalmaznia kell kis- és nagybetűket és nem tartalmazhat különleges karaktereket.",
      ertek: false,
    },
    { uzenet: "A jelszavak nem egyeznek.", ertek: false },
    { uzenet: "A régi jelszó nem lehet üres.", ertek: false },
  ]);
  const [visible, setVisible] = useState(false);

  const telefonRegEx = /^(?:06|\+36|0036)\d{1,2}\d{3}\d{3,4}$/m;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

  const errorsShow = () => {
    setVisible(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const enableInputs = () => {
    if (!disabled) {
      setNev(defaultUser.Nev);
      setTelefon(defaultUser.Telszam);
      setOldPassword("");
    }
    setDisabled(!disabled);
    errorsShow();
  };

  const changePassword = () => {
    setShowPasswordField(true);
  };

  const closePasswordPopup = () => {
    setShowPasswordField(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const saveChanges = () => {
    let errors = [...errorMessages];


    // ellenőrzés
    if (telefonRegEx.test(telefon)) {
      errors[0].ertek = false;
    } else {
      errors[0].ertek = true;
    }

    setErrorMessages(errors);
    // update
    if (!errors[0].ertek) {
      fetch(`https://localhost:44396/api/Felhasznalok/${user.Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nev: nev,
          Telszam: telefon,
          Passwd: oldPassword,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            if (response.status === 404) {
              toast.dismiss();
              toast.error("Nem található a felhasználó.");
            } else if (response.status === 401) {
              toast.dismiss();
              toast.error("Helytelen jelszó");
            } else {
              toast.dismiss();
              toast.error("Hiba történt a kérés feldolgozása közben.");
            }
            return {};
          }

          const data = await response.json();
          return data;
        })
        .then((data) => {
          if (Object.keys(data).length > 0) {
            localStorage.setItem("user", JSON.stringify(data));
            toast.dismiss();
            toast.success("Sikeres adatmódosítás!");
          }
        })
        .finally(() => {
          const updatedUser = JSON.parse(localStorage.getItem("user")) || user;
          setUser(updatedUser);
          setDefaultUser(updatedUser);
          setNev(updatedUser.Nev);
          setTelefon(updatedUser.Telszam);
          setOldPassword("");
          setDisabled(true);
        });
    } else {
      setVisible(true);
    }
  };

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
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: colors.button,
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
                  padding: "8px 16px",
                  borderRadius: "10px",
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
                    mt: "5px", // vagy próbáld -6, -8 – ez attól függ, mennyire csúszik le
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: colors.buttonHover,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: colors.button,
                    },
                    transform: "translateY(-2px)",
                    overflow: "visible", // engedjük kilógni a belső spanokat
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

        {/* Személyprofil komponens */}
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
            Személyes adatok
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
              label="Email cím"
              value={user.Email || ""}
              disabled
              fullWidth
              variant="outlined"
              sx={{
                ...disabledInputStyle,
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
            />
          </Box>

          <Grid item xs={12}>
            <TextField
              label="Név"
              value={nev}
              onFocus={errorsShow}
              onChange={(e) => setNev(e.target.value)}
              disabled={disabled}
              fullWidth
              variant="outlined"
              sx={{
                ...disabledInputStyle,
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Telefonszám"
              value={telefon}
              onFocus={errorsShow}
              onChange={(e) => setTelefon(e.target.value)}
              disabled={disabled}
              fullWidth
              variant="outlined"
              sx={{
                ...disabledInputStyle,
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Jelszó"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onFocus={errorsShow}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={disabled}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: colors.text }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ...disabledInputStyle,
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
            />
          </Grid>

          {visible && (
            <Box sx={{ mt: 2 }}>
              {errorMessages.map(
                (error, index) =>
                  error.ertek && (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ color: "red", mb: 1 }}
                    >
                      {error.uzenet}
                    </Typography>
                  )
              )}
            </Box>
          )}

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
              onClick={changePassword}
              variant="contained"
              sx={{
                backgroundColor: colors.button,
                color: colors.text,
                "&:hover": { backgroundColor: colors.buttonHover },
                borderRadius: "10px",
                padding: "8px 16px",
              }}
            >
              Jelszó módosítása
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

          <Password
            trigger={showPasswordField}
            closePopup={closePasswordPopup}
          />
        </Box>
      </Box>
    </Box>
  );
}
