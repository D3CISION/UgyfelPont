import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import BG from "../../assets/stats.jpg";
import Arrow from "../../assets/arrow.svg";
import { colors } from "../../assets/js/functions.jsx";

// nyíl animáció
const arrowAnim = keyframes`
    0% {
        top: 0px;
    }
    50% {
        top: 60px;
    }
    100% {
        top: 0px;
    }
`;

function Main() {
  const [opacity, setOpacity] = useState(1);
  const [divVisible, setDivVisible] = useState(false);

  // scroll kezelése
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // átlátszóság számítása
      const maxScroll = 300;
      const newOpacity = Math.max(1 - scrollTop / maxScroll, 0.6);
      setOpacity(newOpacity);
      // alsó div láthatóság
      const visibilityThreshold = 150;
      setDivVisible(scrollTop > visibilityThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          position: "relative",
          opacity: opacity,
          transition: "opacity 0.2s ease-out",
          overflow: "hidden",
        }}
      >
        {/* Top szekció */}
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              color: "black",
            }}
          >
            Görgess lefelé
          </Typography>
          <Box
            component="img"
            src={Arrow}
            alt="nyíl"
            sx={{
              width: { xs: "150px", sm: "200px" },
              height: "50%",
              position: "relative",
              top: { xs: "400px", sm: "500px" },
              animation: `${arrowAnim} infinite 2s ease`,
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: { xs: "10px 0", sm: "20px 0" },
            transition: "transform 0.4s ease, opacity 0.4s ease",
            opacity: divVisible ? 1 : 0,
            transform: divVisible ? "translateY(0)" : "translateY(100%)",
            zIndex: 1000,
            ...(divVisible && {
              top: "50vh",
              height: "48%",
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                px: { xs: 2, sm: 0 },
              }}
            >
              Magyarország első számú ügyfélnyilvántartója
            </Typography>
            <Button
              component={RouterLink}
              to="/regisztracio"
              sx={{
                width: { xs: "80%", sm: "50%" },
                margin: "auto",
                padding: { xs: "8px 16px", sm: "10px 20px" },
                marginTop: "1rem",
                fontSize: { xs: "1.5rem", sm: "2rem" },
                height: { xs: "auto", sm: "15%" },
                color: "black",
                backgroundColor: "white",
                border: "none",
                borderRadius: "25px",
                textTransform: "none",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: colors.buttonHover,
                  color: "white",
                },
              }}
            >
              Tervezz az ÜgyfélPonttal!
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
