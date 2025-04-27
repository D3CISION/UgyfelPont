import React, { useEffect, useState } from "react";
import VezerloHeader from "../VezerloHeader/VezerloHeader";
import TaskPopup from "../Naptar/TaskPopup.jsx";
import NewTaskPopup from "../Naptar/NewTaskPopup.jsx";
import AddAlkalmazottPopup from "./AddAlkalmazottPopup.jsx";
import AlkalmazottPopup from "./AlkalmazottPopup.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import companyIcon from "../../assets/company.svg";
import Cookies from "js-cookie";
import { Tooltip } from "react-tooltip";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../assets/js/functions.jsx";

const styles = {
  sectionHeader: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    backgroundColor: colors.button,
    borderRadius: "10px",
  },
  sectionTitle: {
    variant: "h6",
    sx: { color: colors.text },
  },
  iconButton: {
    color: colors.text,
  },
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
    padding: "0 20px",
  },
  taskCard: {
    width: "100%",
    height: "70px",
    display: "flex",
    borderRadius: "0px",
    flexDirection: "column",
    padding: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  text: {
    color: colors.text,
  },
  blackText: {
    color: "black",
  },
};

export default function Ceged() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [alkalmazottak, setAlkalmazottak] = useState([]);
  const [selectedAlkalmazott, setSelectedAlkalmazott] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [company, setCompany] = useState(null);
  const [showAddAlkalmazottPopup, setShowAddAlkalmazottPopup] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showAlkalmazottPopup, setShowAlkalmazottPopup] = useState(false);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  const [showTips, setShowTips] = useState(false);

  function getCombo() {
    getSelectedTasks(selectedAlkalmazott?.FelhasznaloId);
  }

  function frissitAlkalmazottak() {
    fetch(
      `https://localhost:44396/api/Felhasznalok/getAlkalmazottak?id=${user.FelhasznaloId}`
    )
      .then((res) => res.json())
      .then((data) => setAlkalmazottak(data));
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    fetchData();
  }, []);

  useEffect(() => {
    const tipsChoice = Cookies.get("showTips");
    if (tipsChoice === undefined) {
      setShowTooltipPopup(true); // csak ez fogja vezérelni a TooltipPopupot
    } else {
      setShowTips(tipsChoice === "true");
    }
  }, []);
  const handleChoice = (choice) => {
    Cookies.set("showTips", choice, { expires: 365 });
    setShowTips(choice);
    setShowTooltipPopup(false);
  };

  async function fetchData() {
    const data = await getData();
    if (data) setAlkalmazottak(data);
    const tasksData = await getAllTasks();
    if (tasksData) setAllTasks(tasksData);
    const companyData = await getCompany();
    if (companyData) setCompany(companyData);
  }

  async function getCompany() {
    const url = `https://localhost:44396/api/Cegek/${user.CegId}`;
    try {
      const response_ans = await fetch(url);
      if (!response_ans.ok)
        throw new Error(`Response status: ${response_ans.status}`);
      return await response_ans.json();
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  }

  async function getData() {
    const url = `https://localhost:44396/api/Felhasznalok/getAlkalmazottak?id=${user.FelhasznaloId}`;
    try {
      const response_ans = await fetch(url);
      if (!response_ans.ok)
        throw new Error(`Response status: ${response_ans.status}`);
      return await response_ans.json();
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  async function getSelectedTasks(id) {
    if (!id) return;
    const url = `https://localhost:44396/api/FelhasznaloFeladat/FeladatForFelhasznalo?id=${id}`;
    try {
      const response_ans = await fetch(url);
      if (!response_ans.ok)
        throw new Error(`Response status: ${response_ans.status}`);
      const data = await response_ans.json();
      setTasks(data);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  async function getAllTasks() {
    const url = "https://localhost:44396/api/FelhasznaloFeladat";
    try {
      const response_ans = await fetch(url);
      if (!response_ans.ok)
        throw new Error(`Response status: ${response_ans.status}`);
      const data = await response_ans.json();
      const filteredData = data.filter(
        (x) =>
          x.Felhasznalok.CegId == user.CegId &&
          x.Felhasznalok.Szerepkor == "alkalmazott"
      );
      const distinctData = [];
      const seenFeladatIds = new Set();
      for (let i of filteredData) {
        if (!seenFeladatIds.has(i.Feladatok.FeladatId)) {
          seenFeladatIds.add(i.Feladatok.FeladatId);
          distinctData.push(i);
        }
      }
      setAllTasks(distinctData);
      return distinctData;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  function handleAlkalmazottClick(t, index) {
    setSelectedAlkalmazott(t);
    const elemek = document.querySelectorAll(".scroll");
    elemek.forEach((x) => x.classList.remove("active-ugyfel"));
    elemek[index].classList.add("active-ugyfel");
    getSelectedTasks(t.FelhasznaloId);
  }

  function handleSelectedAlkalmazottReset() {
    setSelectedAlkalmazott(null);
    setTasks([]);
    const elemek = document.querySelectorAll(".scroll");
    elemek.forEach((x) => x.classList.remove("active-ugyfel"));
  }

  function handleTaskClick(t) {
    setSelectedTask(t);
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    setSelectedTask(null);
  }

  const deleteSelectedAlkalmazott = (id) => {
    if (!id) {
      toast.error("Nincs kiválasztott alkalmazott");
      return;
    }
    fetch(`https://localhost:44396/api/Felhasznalok/${id}`, {
      method: "DELETE",
    }).then((response_ans) => {
      if (!response_ans.ok) toast.error("Hiba történt a törlés közben");
      else {
        toast.success("Sikeres törlés");
        setAlkalmazottak(alkalmazottak.filter((x) => x.FelhasznaloId != id));
        handleSelectedAlkalmazottReset();
      }
    });
  };

  function closeAddAlkalmazottPopup() {
    setShowAddAlkalmazottPopup(false);
  }
  function closeAlkalmazottPopup() {
    setShowAlkalmazottPopup(false);
  }
  function closeNewTaskPopup() {
    setShowNewTaskPopup(false);
  }

  function stringAvatar(name) {
    ({
      sx: { color: "black", backgroundColor: colors.text },
      children: name
        ? `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`
        : "",
    });
  }

  // tab-os, shift+tab-os váltás
  useEffect(() => {
    const handleTabNavigation = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const items = document.querySelectorAll(".scroll");
        if (items.length === 0) return;

        let currentIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("active-ugyfel")
        );

        if (event.shiftKey) {
          currentIndex =
            currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        } else {
          currentIndex = (currentIndex + 1) % items.length;
        }

        items.forEach((item) => item.classList.remove("active-ugyfel"));
        items[currentIndex].classList.add("active-ugyfel");
        setSelectedAlkalmazott(alkalmazottak[currentIndex]);
        getSelectedTasks(alkalmazottak[currentIndex].FelhasznaloId);

        items[currentIndex].focus();
      }
    };

    document.addEventListener("keydown", handleTabNavigation);
    return () => document.removeEventListener("keydown", handleTabNavigation);
  }, [alkalmazottak, getSelectedTasks]);

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <VezerloHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          className="company-display-container"
          sx={{
            width: "100%",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {company ? (
            <Box
              className="company-display"
              sx={{
                width: { xs: "70%", md: "40%" },
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "10px 20px",
                backgroundColor: colors.card,
                borderRadius: "10px",
              }}
            >
              <Box
                className="company-display-row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={companyIcon}
                  alt=""
                  style={{ width: "60px", height: "60px" }}
                />
              </Box>
              <Box
                className="company-display-row"
                sx={{
                  fontWeight: "bold",
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                {company.Nev} {company.Forma?.Rovidites}
              </Box>
              <Box
                className="company-display-row"
                sx={{ color: colors.text, textAlign: "center" }}
              >
                {company.Forma?.Nev}
              </Box>
              <Box
                className="company-display-row"
                sx={{ color: colors.text, textAlign: "center" }}
              >
                E-mail cím: {company.Email}
              </Box>
              <Box
                className="company-display-row"
                sx={{ color: colors.text, textAlign: "center" }}
              >
                Telefonszám: {company.Telszam}
              </Box>
              <Box
                className="company-display-row"
                sx={{ color: colors.text, textAlign: "center" }}
              >
                {company.Cim?.Irsz} {company.Cim?.TelepulesNev}{" "}
                {company.Cim?.Utca} {company.Cim?.Hazszam}
              </Box>
            </Box>
          ) : (
            <Typography sx={styles.text}>Nincs cég adat</Typography>
          )}
        </Box>

        {/* Két oszlop (bal és jobb) */}
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Bal oszlop */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              gap: 2,
            }}
          >
            {/* Alkalmazott kiválasztása */}
            <Box sx={styles.sectionHeader}>
              <Typography {...styles.sectionTitle}>
                Alkalmazott kiválasztása
              </Typography>
              <IconButton
                onClick={handleSelectedAlkalmazottReset}
                title="Kiválasztás megszűntetése"
                sx={styles.iconButton}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            {/* Alkalmazottak listája */}
            <Box sx={styles.container}>
              {alkalmazottak.length > 0 ? (
                alkalmazottak.map((t, index) => (
                  <Card
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={showTips ? "Kattints rám!" : ""}
                    key={index}
                    className="scroll"
                    onClick={() => handleAlkalmazottClick(t, index)}
                    sx={{
                      width: "100%",
                      gap: 2,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: colors.card,
                      borderRadius: "0px",
                      "&:hover": { cursor: "pointer" },
                      "&.active-ugyfel": {
                        backgroundColor: colors.buttonHover,
                      },
                    }}
                  >
                    <Avatar {...stringAvatar(t.Nev)} />
                    <Box>
                      <Typography variant="h6" sx={styles.text}>
                        {t.Nev || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={styles.text}>
                        {t.Email || "N/A"}
                      </Typography>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography variant="body1" sx={styles.text}>
                  Nincsenek alkalmazottak
                </Typography>
              )}
            </Box>

            {/* Alkalmazott hozzáadása */}
            <Box sx={styles.sectionHeader}>
              <Typography {...styles.sectionTitle}>
                Alkalmazott hozzáadása
              </Typography>
              <IconButton
                onClick={() => setShowAddAlkalmazottPopup(true)}
                sx={styles.iconButton}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Alkalmazott törlése */}
            <Box sx={styles.sectionHeader}>
              <Typography {...styles.sectionTitle}>
                Alkalmazott törlése
              </Typography>
              <IconButton
                onClick={() =>
                  deleteSelectedAlkalmazott(
                    selectedAlkalmazott ? selectedAlkalmazott.FelhasznaloId : ""
                  )
                }
                sx={styles.iconButton}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Jobb oszlop */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: colors.background,
            }}
          >
            {/* Kiválasztott alkalmazott kártyája */}
            <Card
              sx={{
                width: { xs: "70%", sm: "50%" },
                height: "200px",
                backgroundColor: colors.card,
                margin: "20px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "20px",
                  height: "100%",
                  backgroundColor: colors.card,
                }}
              >
                <Avatar
                  {...stringAvatar(selectedAlkalmazott?.Nev)}
                  sx={{
                    width: "60px",
                    height: "60px",
                    padding: "10px",
                    backgroundColor: colors.text,
                    color: "black",
                  }}
                />
                <Typography variant="h6" sx={styles.text}>
                  {selectedAlkalmazott
                    ? selectedAlkalmazott.Nev
                    : "Alkalmazott neve"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    width: "100%",
                    padding: "5px 10px",
                  }}
                >
                  <Typography variant="body2" sx={styles.text}>
                    {selectedAlkalmazott
                      ? selectedAlkalmazott.Email
                      : "Alkalmazott email címe"}
                  </Typography>
                  <Typography variant="body2" sx={styles.text}>
                    {selectedAlkalmazott
                      ? selectedAlkalmazott.Telszam
                      : "Alkalmazott telefonszáma"}
                  </Typography>
                </Box>
                {selectedAlkalmazott && (
                  <IconButton
                    onClick={() => setShowAlkalmazottPopup(true)}
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: colors.text,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </CardContent>
            </Card>

            {/* Feladatok listája */}
            <Typography
              variant="h6"
              sx={{
                width: "70%",
                padding: "0 20px",
                backgroundColor: colors.button,
                borderRadius: "10px",
                color: colors.text,
                textAlign: "center",
              }}
            >
              {selectedAlkalmazott
                ? `${selectedAlkalmazott.Nev} feladatai`
                : "Feladatok"}
            </Typography>
            <Box sx={styles.container}>
              {selectedAlkalmazott && tasks.length > 0 ? (
                tasks.map((t, index) => (
                  <Card
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      showTips ? "Kattints a részletekért!" : ""
                    }
                    key={index}
                    onClick={() => handleTaskClick(t)}
                    sx={{
                      ...styles.taskCard,
                      backgroundColor: t.Feladat.Allapot
                        ? "green"
                        : t.Feladat?.szinId || colors.button,
                      borderRadius: "0px",
                    }}
                  >
                    <Typography variant="h6" sx={styles.blackText}>
                      {t.Feladat.Nev}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" sx={styles.blackText}>
                          {t.Feladat.Hatarido.substring(0, 10)}
                        </Typography>
                        <Typography variant="body2" sx={styles.blackText}>
                          {t.Feladat.Leiras.length > 30
                            ? t.Feladat.Leiras.substring(0, 30).trimEnd() +
                              "..."
                            : t.Feladat.Leiras}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "1.2rem", ...styles.text }}
                      >
                        {t.Feladat.Allapot ? "✅" : "❌"}
                      </Typography>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography variant="body1" sx={styles.text}>
                  {selectedAlkalmazott
                    ? "Nincsenek feladatok"
                    : "Válassz egy alkalmazottat"}
                </Typography>
              )}
            </Box>

            {/* Feladat hozzáadása */}
            <Box sx={styles.sectionHeader}>
              <Typography {...styles.sectionTitle}>
                Feladat hozzáadása
              </Typography>
              <IconButton
                onClick={() => setShowNewTaskPopup(true)}
                sx={styles.iconButton}
                disabled={!selectedAlkalmazott}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Popup komponensek */}
      {showPopup && selectedTask && (
        <TaskPopup
          trigger={showPopup}
          task={selectedTask || {}}
          closePopup={closePopup}
          refreshData={getCombo}
        />
      )}
      <NewTaskPopup
        trigger={showNewTaskPopup}
        closePopup={closeNewTaskPopup}
        refreshData={getCombo}
        postToUser={selectedAlkalmazott}
        ugyfel={null}
      />
      <AlkalmazottPopup
        trigger={showAlkalmazottPopup}
        alkalmazott={selectedAlkalmazott}
        closePopup={closeAlkalmazottPopup}
        onSuccess={() => {
          frissitAlkalmazottak();
          setSelectedAlkalmazott(null);
          toast.success("Sikeres törlés.");
        }}
        updateSelectedAlkalmazott={(ujAdatok) => {
          frissitAlkalmazottak();
          setSelectedAlkalmazott(ujAdatok);
        }}
      />
      {showAddAlkalmazottPopup && (
        <AddAlkalmazottPopup
          trigger={showAddAlkalmazottPopup}
          closePopup={closeAddAlkalmazottPopup}
          onSuccess={() => {
            frissitAlkalmazottak();
            toast.success("Sikeres rögzítés.");
          }}
        />
      )}
      {showTips && <Tooltip id="my-tooltip" />}
    </Box>
  );
}
