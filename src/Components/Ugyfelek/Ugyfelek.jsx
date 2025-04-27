import React, { useEffect, useState, useCallback } from "react";
import VezerloHeader from "../VezerloHeader/VezerloHeader";
import UgyfelPopup from "./UgyfelPopup.jsx";
import TaskPopup from "../Naptar/TaskPopup.jsx";
import NewTaskPopup from "../Naptar/NewTaskPopup.jsx";
import AddUgyfelPopup from "./AddUgyfelPopup.jsx";
import { Tooltip } from "react-tooltip";
import Cookies from "js-cookie";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function Ugyfelek() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [ugyfelek, setUgyfelek] = useState([]);
  const [selectedUgyfel, setSelectedUgyfel] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showUgyfelPopup, setShowUgyfelPopup] = useState(false);
  const [showAddUgyfelPopup, setShowAddUgyfelPopup] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showTips, setShowTips] = useState(true);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);


  // ügyfelek frissítése
  function frissitUgyfelek() {
    fetch(
      `https://localhost:44396/api/Felhasznalok/getUgyfelek?id=${user.FelhasznaloId}`
    )
      .then((res) => res.json())
      .then((data) => setUgyfelek(data));
  }
  // Adatok lekérése
  const fetchData = useCallback(async () => {
    const data = await getData();
    if (data) setUgyfelek(data);

    const tasksData = await getAllTasks();
    if (tasksData) setAllTasks(tasksData);
  }, []);


  // felhasználóhoz tartozó ügyfelek
  const getData = useCallback(async () => {
    const url = `https://localhost:44396/api/Felhasznalok/getUgyfelek?id=${user.FelhasznaloId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      return await response.json();
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }, [user]);


  // kiválasztott ügyfél feladatai
  const getSelectedTasks = useCallback(async (id) => {
    const url = `https://localhost:44396/api/FelhasznaloFeladat/FeladatForFelhasznalo?id=${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      setTasks(data);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }, []);

  const getAllTasks = useCallback(async () => {
    const url = "https://localhost:44396/api/FelhasznaloFeladat";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      const filteredData = data.filter(
        (x) =>
          x.Felhasznalok.CegId == user.CegId &&
          x.Felhasznalok.Szerepkor == "ügyfél"
      );

      const distinctData = [];
      const seenFeladatIds = new Set();

      for (let i of filteredData) {
        if (!seenFeladatIds.has(i.Feladatok.FeladatId)) {
          seenFeladatIds.add(i.Feladatok.FeladatId);
          distinctData.push(i);
        }
      }
      return distinctData;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }, [user]);

  useEffect(() => {
    if (user) getAllTasks();
  }, [user, getAllTasks]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const tipsChoice = Cookies.get("showTips");
    if (tipsChoice === undefined) {
      setShowPopup(true);
    } else {
      setShowTips(tipsChoice === "true");
    }
  }, []);


  //tabos váltás
  useEffect(() => {
    const handleTabNavigation = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const items = document.querySelectorAll(".scroll");
        if (items.length === 0) return;

        let currentIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("active-ugyfel")
        );

        //shift+tab
        if (event.shiftKey) {
          currentIndex =
            currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        } else {
          currentIndex = (currentIndex + 1) % items.length;
        }

        items.forEach((item) => item.classList.remove("active-ugyfel"));
        items[currentIndex].classList.add("active-ugyfel");
        setSelectedUgyfel(ugyfelek[currentIndex]);
        getSelectedTasks(ugyfelek[currentIndex].FelhasznaloId);

        items[currentIndex].focus();
      }
    };

    document.addEventListener("keydown", handleTabNavigation);
    return () => document.removeEventListener("keydown", handleTabNavigation);
  }, [ugyfelek, getSelectedTasks]);

  const handleUgyfelClick = (t, index) => {
    setSelectedUgyfel(t);
    const elemek = document.querySelectorAll(".scroll");
    elemek.forEach((x) => x.classList.remove("active-ugyfel"));
    elemek[index].classList.add("active-ugyfel");
    getSelectedTasks(t.FelhasznaloId);
  };

  // kiválasztott ügyfél kiürítése
  const handleSelectedUgyfelReset = () => {
    setSelectedUgyfel(null);
    setTasks([]);
    const elemek = document.querySelectorAll(".scroll");
    elemek.forEach((x) => x.classList.remove("active-ugyfel"));
  };

  const handleTaskClick = (t) => {
    setSelectedTask(t);
  };

  useEffect(() => {
    if (selectedTask !== null) setShowPopup(true);
  }, [selectedTask]);

  const closePopup = () => {
    getSelectedTasks(selectedUgyfel.FelhasznaloId);
    setShowPopup(false);
    setSelectedTask(null);
  };

  // adatok frissítése
  function refreshData() {
    getSelectedTasks(selectedUgyfel.FelhasznaloId);
  }
  const closeUgyfelPopup = () => setShowUgyfelPopup(false);
  const closeAddUgyfelPopup = () => setShowAddUgyfelPopup(false);

  const deleteSelectedUgyfel = (id) => {
    if (id != "") {
      fetch(`https://localhost:44396/api/Felhasznalok/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          toast.error("Hiba történt a törlés közben");
        } else {
          toast.success("Sikeres törlés");
        }
      });
      setUgyfelek(ugyfelek.filter((x) => x.FelhasznaloId != id));
      handleSelectedUgyfelReset();
    } else {
      toast.error("Nincs kiválasztott ügyfél");
    }
  };

  const stringAvatar = (name) => ({
    sx: { color: "black", backgroundColor: colors.text },
    children: name
      ? `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`
      : "",
  });

  function closeNewTaskPopup() {
    setShowNewTaskPopup(false);
  }

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <VezerloHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 64px)", // Header magasság levonása
        }}
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
          {/* Ügyfél kiválasztása */}
          <Box sx={styles.sectionHeader}>
            <Typography {...styles.sectionTitle}>
              Ügyfél kiválasztása
            </Typography>
            <IconButton
              onClick={handleSelectedUgyfelReset}
              title="Kiválasztás megszűntetése"
              sx={styles.iconButton}
            >
              <ClearIcon />
            </IconButton>
          </Box>

          {/* Ügyfelek listája */}
          <Box sx={styles.container}>
            {ugyfelek.length > 0 ? (
              ugyfelek.map((t, index) => (
                <Card
                  key={index}
                  className="scroll"
                  onClick={() => handleUgyfelClick(t, index)}
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
                    "&.active-ugyfel": { backgroundColor: colors.buttonHover },
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={showTips ? "Kattints rám!" : ""}
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
                Nincsenek ügyfelek
              </Typography>
            )}
          </Box>

          {/* Ügyfél hozzáadása */}
          <Box sx={styles.sectionHeader}>
            <Typography {...styles.sectionTitle}>Ügyfél hozzáadása</Typography>
            <IconButton
              onClick={() => setShowAddUgyfelPopup(true)}
              sx={styles.iconButton}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Ügyfél törlése */}
          <Box sx={styles.sectionHeader}>
            <Typography {...styles.sectionTitle}>Ügyfél törlése</Typography>
            <IconButton
              onClick={() =>
                deleteSelectedUgyfel(
                  selectedUgyfel ? selectedUgyfel.FelhasznaloId : ""
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
          {/* Kiválasztott ügyfél kártyája */}
          <Card
            sx={{
              width: { xs: "70%", sm: "50%" },
              height: "200px",
              backgroundColor: colors.card,
              margin: "20px",
              position: "relative",
              borderRadius: "10px",
            }}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={
              showTips && selectedUgyfel ? "" : "Válassz ki egy ügyfelet!"
            }
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
                {...stringAvatar(selectedUgyfel?.Nev)}
                sx={{
                  width: "60px",
                  height: "60px",
                  padding: "10px",
                  backgroundColor: colors.text,
                  color: "black",
                }}
              />
              <Typography variant="h6" sx={styles.text}>
                {selectedUgyfel ? selectedUgyfel.Nev : "Ügyfél neve"}
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
                  {selectedUgyfel ? selectedUgyfel.Email : "Ügyfél email címe"}
                </Typography>
                <Typography variant="body2" sx={styles.text}>
                  {selectedUgyfel
                    ? selectedUgyfel.Telszam
                    : "Ügyfél telefonszáma"}
                </Typography>
              </Box>
              {selectedUgyfel && (
                <IconButton
                  onClick={() => setShowUgyfelPopup(true)}
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
            {selectedUgyfel ? `${selectedUgyfel.Nev} feladatai` : "Feladatok"}
          </Typography>
          <Box sx={styles.container}>
            {selectedUgyfel && tasks.length > 0 ? (
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
                    "&:hover": {
                      cursor: "pointer",
                    },
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
                          ? t.Feladat.Leiras.substring(0, 30).trimEnd() + "..."
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
                {selectedUgyfel
                  ? "Nincsenek feladatok"
                  : "Válassz egy ügyfelet"}
              </Typography>
            )}
          </Box>
          <Box sx={styles.sectionHeader}>
            <Typography {...styles.sectionTitle}>Feladat hozzáadása</Typography>
            <IconButton
              onClick={() => setShowNewTaskPopup(true)}
              sx={styles.iconButton}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Popup komponensek */}
      {showPopup && selectedTask && (
        <TaskPopup
          trigger={showPopup}
          task={selectedTask || {}}
          closePopup={closePopup}
          refreshData={refreshData}
        />
      )}
      <NewTaskPopup
        trigger={showNewTaskPopup}
        closePopup={closeNewTaskPopup}
        refreshData={refreshData}
        postToUser={user}
        ugyfel={selectedUgyfel}
      />
      <UgyfelPopup
        trigger={showUgyfelPopup}
        ugyfel={selectedUgyfel}
        closePopup={closeUgyfelPopup}
        onSuccess={() => {
          frissitUgyfelek();
          setSelectedUgyfel(null);
          toast.success("Sikeres törlés.");
        }}
        updateSelectedUgyfel={(ujAdatok) => {
          frissitUgyfelek()
          setSelectedUgyfel(ujAdatok)}}
      />
      {showAddUgyfelPopup && (
        <AddUgyfelPopup
          trigger={showAddUgyfelPopup}
          closePopup={closeAddUgyfelPopup}
          onSuccess={() => {
            frissitUgyfelek();
            toast.success("Sikeres rögzítés.");
          }}
        />
      )}

      {showTips && <Tooltip id="my-tooltip" style={{ zIndex: 10000 }} />}
    </Box>
  );
}
