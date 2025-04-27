import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import { Tooltip } from "react-tooltip";
import TaskPopup from "./TaskPopup.jsx";
import NewTaskPopup from "./NewTaskPopup.jsx";
import TooltipPopup from "../TooltipPopup/TooltipPopup.jsx";
import {
  getCurrentMonth,
  monthsData,
  yearsData,
} from "../../data/comboData.js";
import { actualYear } from "../../data/date.js";

export default function Naptar() {
  const [y, setY] = useState(yearsData[0]);
  const [m, setM] = useState(getCurrentMonth(actualYear));
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  const firstRender = useRef(true);
  const [showTips, setShowTips] = useState(false);
  const [showTooltipPopup, setShowTooltipPopup] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  // Adatok lekérése
  async function getData() {
    try {
      const response = await fetch(
        `https://localhost:44396/api/FelhasznaloFeladat/GetUgyfelekWithFeladat?id=${user.FelhasznaloId}`
      );
      const data = await response.json();
      setTasks(data);
      return data;
    } catch (error) {
      return [];
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    async function fetchData() {
      await getData();
      await getCombo();
    }
    fetchData();

    fetch("https://localhost:44396/api/Feladatok/Repeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });
  }, [y, m, showOnlyIncomplete]);

  // TooltipPopup megjelenésének vezérlése
  useEffect(() => {
    const tipsChoice = Cookies.get("showTips");
    if (tipsChoice === undefined) {
      setShowTooltipPopup(true); // csak ez fogja vezérelni a TooltipPopupot
    } else {
      setShowTips(tipsChoice === "true");
    }
  }, []);
  function handleChoice(choice) {
    Cookies.set("showTips", choice, { expires: 365 });
    setShowTips(choice);
    setShowTooltipPopup(false);
  };

  async function getCombo() {
    setFilteredTasks([]);
    const freshData = await getData();
    const filter = `${y?.value}-${String(m?.value).padStart(2, "0")}`;

    // szűrés év és hónap szerint
    const filteredByDate = freshData.filter((task) => {
      let dueDate = new Date(task.Feladat.Hatarido);
      let yearMonth = `${dueDate.getFullYear()}-${String(
        dueDate.getMonth() + 1
      ).padStart(2, "0")}`;
      return yearMonth === filter;
    });

    // teljesített feladatok kiszűrése
    const finalFilteredTasks = showOnlyIncomplete
      ? filteredByDate.filter((task) => !task.Feladat.Allapot)
      : filteredByDate;

    // rendezés
    const sortedTasks = [...finalFilteredTasks].sort(
      (a, b) => new Date(a.Feladat.Hatarido) - new Date(b.Feladat.Hatarido)
    );

    setFilteredTasks(sortedTasks);
  }

  function handleTaskClick(t) {
    setSelectedTask(t);
  }

  useEffect(() => {
    if (selectedTask !== null) {
      setShowPopup(true);
    }
  }, [selectedTask]);

  function closePopup() {
    setShowPopup(false);
    setSelectedTask(null);
  }

  function closeTooltipPopup() {
    setShowTooltipPopup(false);
  }

  function showNewTask() {
    setShowNewTaskPopup(true);
  }

  function closeNewTaskPopup() {
    setShowNewTaskPopup(false);
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#1c2e4a",
        minHeight: "100vh",
        color: "#c5cacd",
      }}
    >
      {/* Naptár fejléc */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "center" }, 
          flexDirection: { xs: "column", md: "row" }, 
          gap: { xs: 2, md: 0 },
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "center", md: "center" },
          }}
        >
          {/* Év választó */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: "#c5cacd" }}>Év</InputLabel>
            <Select
              data-tooltip-id="my-tooltip"
              data-tooltip-content={showTips ? "Válaszd ki az évet!" : ""}
              value={y?.value || ""}
              onChange={(e) =>
                setY(yearsData.find((year) => year.value === e.target.value))
              }
              label="Év"
              sx={{
                color: "#c5cacd",
                backgroundColor: "#2a3b5f",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c5cacd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c5cacd",
                },
                "& .MuiSelect-icon": {
                  color: "#c5cacd",
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {yearsData.map((year) => (
                <MenuItem
                  key={year.value}
                  value={year.value}
                  sx={{ color: "black" }}
                >
                  {year.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Hónap választó */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: "#c5cacd" }}>Hónap</InputLabel>
            <Select
              data-tooltip-id="my-tooltip"
              data-tooltip-content={showTips ? "Válaszd ki a hónapot!" : ""}
              value={m?.value || ""}
              onChange={(e) =>
                setM(monthsData.find((month) => month.value === e.target.value))
              }
              label="Hónap"
              sx={{
                color: "#c5cacd",
                backgroundColor: "#2a3b5f",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c5cacd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c5cacd",
                },
                "& .MuiSelect-icon": {
                  color: "#c5cacd",
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {monthsData.map((month) => (
                <MenuItem
                  key={month.value}
                  value={month.value}
                  sx={{ color: "black" }}
                >
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlyIncomplete}
                onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                sx={{
                  color: "#c5cacd",
                  "&.Mui-checked": {
                    color: "#c5cacd",
                  },
                }}
              />
            }
            label="Csak befejezetlen feladatok"
            sx={{ color: "#c5cacd" }}
          />
        </Box>

        {/* Új feladat hozzáadása gomb */}
        <IconButton
          onClick={showNewTask}
          sx={{
            backgroundColor: "#2a3b5f",
            color: "#c5cacd",
            "&:hover": {
              backgroundColor: "#3b4e7a",
            },
            position: "relative",
            bottom: { xs: 10, md: 10 },
            alignSelf: { xs: "center", md: "flex-end" },
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={showTips ? "Feladat hozzáadása" : ""}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Feladatok listája rács elrendezésben */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          // Reszponzív rács: 1 oszlop kis képernyőn, 2 oszlop közepesen, 3 oszlop nagy képernyőn
          gridTemplateColumns: {
            xs: "1fr", // Kis képernyő (1 oszlop)
            md: "repeat(2, 1fr)", // Közepes képernyő (2 oszlop)
            lg: "repeat(3, 1fr)", // Nagy képernyő (3 oszlop)
          },
        }}
      >
        {filteredTasks.length !== 0 ? (
          filteredTasks.map((task,index) => {
            const dueDate = new Date(task.Feladat.Hatarido);
            const now = new Date();
            const isDueToday = dueDate.toDateString() === now.toDateString();
            const isOverdue = dueDate < now;

            return (
              <Card
                key={index}
                onClick={() => handleTaskClick(task)}
                sx={{
                  backgroundColor: task.Feladat.Allapot
                    ? "green"
                    : task.Feladat?.szinId || "#2a3b5f",
                  cursor: "pointer",
                  width: 250,
                  height: 120,
                  border: "1px solid black",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: task.Feladat.Allapot
                      ? "darkgreen"
                      : task.Feladat?.szinId
                      ? `${task.Feladat.szinId}cc`
                      : "#3b4e7a",
                    transition: "background-color 0.2s ease",
                  },
                }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  showTips ? "Kattints a részletekért!" : ""
                }
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "black" }}>
                    {task.Feladat.Nev}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {task.Feladat.Hatarido.substring(0, 10)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {task.Feladat.Allapot ? "Teljesítve" : "Nincs teljesítve"}
                  </Typography>
                  {isDueToday && !isOverdue && (
                    <Typography
                      variant="body2"
                      sx={{ color: "orange", fontWeight: "bold" }}
                    >
                      Ma esedékes
                    </Typography>
                  )}
                  {isOverdue && (
                    <Typography
                      variant="body2"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      Lejárt
                    </Typography>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "#c5cacd",
              gridColumn: "span 3"
            }}
          >
            Nincs feladat
          </Typography>
        )}
      </Box>

      {/* Popupok */}
      <NewTaskPopup
        trigger={showNewTaskPopup}
        closePopup={closeNewTaskPopup}
        refreshData={getCombo}
        postToUser={user}
        ugyfel={null}
      />
      {showPopup && selectedTask && (
        <TaskPopup
          trigger={showPopup}
          task={selectedTask || {}}
          closePopup={closePopup}
          refreshData={getCombo}
          tasks={filteredTasks}
        />
      )}
      {showTips && <Tooltip id="my-tooltip" />}
      {showTooltipPopup && <TooltipPopup onChoice={handleChoice} />}
    </Box>
  );
}
