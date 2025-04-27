import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../assets/js/functions";

function TooltipPopup({ onChoice }) {
  const handleYes = () => {
    onChoice(true); // igen - true
  };

  const handleNo = () => {
    onChoice(false); // nem - false
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: colors.button,
        color: colors.text,
        padding: "10px",
        width: { xs: "90%", sm: "70%" },
        height: "100px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          margin: 0,
          padding: 0,
          color: colors.text,
        }}
      >
        Szeretnél tippeket látni az oldalon? Később ki is kapcsolhatod őket a
        profil szekcióban.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={handleYes}
          disabled={false}
          variant="contained"
          color="primary"
          sx={{ width: "100px", height: "40px" }}
        >
          Igen
        </Button>
        <Button
          onClick={handleNo}
          disabled={false}
          variant="outlined"
          color="primary"
          sx={{ width: "100px", height: "40px" }}
        >
          Nem
        </Button>
      </Box>
    </Box>
  );
}

export default TooltipPopup;
