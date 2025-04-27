import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../../assets/js/functions.jsx";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.palette?.primary?.main || "#192841",
  color: theme?.palette?.text?.secondary || "gray",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: "100%",
}));

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
  },
}));

const FooterRight = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: colors.text || theme.palette.text.secondary,
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-end",
  },
}));

const contacts = [
  "lzsombi05@gmail.com",
  "molbe05@gmail.com",
  "spaitsricsi27@gmail.com",
];

const Footer = () => (
  <FooterContainer id="footer" role="contentinfo">
    <Container maxWidth="lg">
      <FlexContainer>
        <FooterSection>
          <Typography variant="body2" sx={{ color: colors.text || "gray" }}>
            © 2025 - Minden jog fenntartva
          </Typography>
        </FooterSection>
        <FooterSection>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #00C6FF, #0072FF)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "1px",
            }}
          >
            ÜgyfélPont. Minőség, Megbízhatóság, Elkötelezettség!
          </Typography>
        </FooterSection>
        <FooterRight>
          <Typography variant="body2" component="span">
            Elérhetőség:{" "}
          </Typography>
          {contacts.map((email, index) => (
            <Typography key={index} variant="body2">
              {email}
            </Typography>
          ))}
        </FooterRight>
      </FlexContainer>
    </Container>
  </FooterContainer>
);

export default Footer;
