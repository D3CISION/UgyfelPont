import React, { useState, useEffect } from "react";
import VezerloHeader from "../VezerloHeader/VezerloHeader";
import { Months } from "../../data/date.js";
import { colors } from "../../assets/js/functions.jsx";
import Cookies from "js-cookie";
import { Tooltip } from "react-tooltip";
import { Box, Typography, Card, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PieChart } from "@mui/x-charts/PieChart";

// Stílusok
const styles = {
  container: {
    backgroundColor: colors.background,
    minHeight: "100vh",
  },
  statCont: {
    display: { xs: "flex", md: "grid" },
    gridTemplateColumns: { md: "0.3fr 0.7fr" },
    gridTemplateAreas: { md: '"left-column right-column-horizontal"' },
    flexDirection: { xs: "column" },
  },
  leftColumn: {
    gridArea: "left-column",
    margin: "10px",
    paddingTop: "28px",
  },
  rightColumnVertical: {
    backgroundColor: colors.secondaryBackground,
    margin: "10px",
    padding: "20px",
    display: { xs: "block", md: "none" }
  },
  rightColumnHorizontal: {
    gridArea: "right-column-horizontal",
    padding: "10px",
    paddingBottom: "50px",
    display: { xs: "none", md: "block" },
  },
  selectType: {
    padding: "20px",
    marginBottom: "10px",
    backgroundColor: colors.card,
    "&:hover": {
      cursor: "pointer",
    },
  },
  listType: {
    padding: "20px",
    backgroundColor: colors.card,
    display: "flex",
    flexDirection: "column",
  },
  selectedType: {
    backgroundColor: colors.buttonHover,
    color: colors.text,
    borderRadius: "5px",
    padding: "5px 10px",
    textAlign: "center",
    border: "2px solid",
    "&:hover": {
      cursor: "pointer",
    },
    marginBottom: "10px",
  },
  notSelectedType: {
    backgroundColor: colors.button,
    color: colors.text,
    borderRadius: "5px",
    padding: "5px 10px",
    textAlign: "center",
    border: "2px solid",
    "&:hover": {
      cursor: "pointer",
    },
    marginBottom: "10px",
  },
  chart: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "start", md: "end" },
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: "10px",
    gap: "10px",
    height: { md: "80%" },
  },
  row: {
    width: { xs: "100%", md: "auto" },
    height: { xs: "auto", md: "100%" },
    display: "flex",
    flexDirection: { xs: "row-reverse", md: "column" },
    justifyContent: { xs: "start", md: "end" },
  },
  statistic: {
    backgroundColor: "red",
    height: { xs: "20px", md: "auto" },
    "&:hover": {
      cursor: "pointer",
    },
  },
  statisticSelected: {
    backgroundColor: "darkred",
  },
  sorszam: {
    color: "black",
    fontSize: "1.05rem",
    paddingTop: { xs: "5px", md: "0" },
    textAlign: { md: "center" },
    width: { md: "100%" },
  },
  statRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statRowDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  verticalCounter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  verticalLabel: {
    color: "black",
    textAlign: "left",
    minWidth: "30px",
  },
  halfValue: {
    color: "black",
    textAlign: "center",
    flex: 1,
    height: "20px",
  },
  maxValue: {
    color: "black",
    textAlign: "right",
    minWidth: "30px",
    height: "20px",
  },
  horizontalCounter: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  horizontalLabel: {
    color: "black",
  },
  name: {
    color: colors.text,
  },
  selectedYearVertical:{
    color: "black",
    padding: "5px",
  },
  selectedYear: {
    color: colors.text,
    padding: "5px",
  },
  selectedPersonTasksCount: {
    display: "flex",
    flexDirection: { xs: "column", md: "column" },
    padding: "10px",
    gap: { xs: "10px", md: "5px" },
    color: "white",
  },
  monthTasks: {
    display: "flex",
    justifyContent: "space-between",
  },
  pieChartContainer: {
    maxWidth: { xs:"90%", md: "50%"},
    margin: "20px auto",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pieChartTitle: {
    color: "black",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default function Statisztika() {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tasksByMonth, setTasksByMonth] = useState(Array(12).fill(0));
  const [completedTasksByMonth, setCompletedTasksByMonth] = useState(
    Array(12).fill(0)
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    if (selectedPerson) {
      handlePersonClick(selectedPerson);
    }
  }, [selectedYear]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      if (fetchedData) {
        setData(fetchedData);
      }
    }
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

  function Max(tomb) {
    let max = tomb[0] || 0;
    for (let i = 1; i < tomb.length; i++) {
      if (tomb[i] > max) {
        max = tomb[i];
      }
    }
    return max;
  }

  function Half(tomb) {
    return Max(tomb) / 2;
  }

  async function getData() {
    const url = `https://localhost:44396/api/Felhasznalok`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      var user = JSON.parse(localStorage.getItem("user"));
      var data = await response.json();
      data = data.filter((x) => x.CegId == user.CegId);

      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  const handleTypeClick = (type) => {
    selectedType != type ? setSelectedType(type) : setSelectedType(null);
    setFilteredData(data.filter((x) => x.Szerepkor === type));
    setSelectedPerson(null);
    setTasksByMonth(Array(12).fill(0));
    setCompletedTasksByMonth(Array(12).fill(0));
    setSelectedMonth(null);
  };

  function sum(tomb) {
    return tomb.reduce((acc, curr) => acc + curr, 0);
  }

  function handleFelhasznaloClick(type) {
    handleTypeClick(type);
  }

  const handlePersonClick = async (person) => {
    setSelectedPerson(person);
    setSelectedMonth(null);

    try {
      const response = await fetch(
        `https://localhost:44396/api/FelhasznaloFeladat/FeladatForFelhasznalo?id=${person.FelhasznaloId}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const taskData = await response.json();

      const monthlyCounts = Array(12).fill(0);
      const selectedMonthlyCounts = Array(12).fill(0);

      taskData.forEach((taskObj) => {
        const hatarido = taskObj.Feladat?.Hatarido;
        if (hatarido) {
          if (new Date(hatarido).getFullYear() === selectedYear) {
            const monthIndex = new Date(hatarido).getMonth();
            monthlyCounts[monthIndex] += 1;
          }
          if (
            new Date(hatarido).getFullYear() === selectedYear &&
            taskObj.Feladat?.Allapot
          ) {
            const monthIndex = new Date(hatarido).getMonth();
            selectedMonthlyCounts[monthIndex] += 1;
          }
        }
      });

      setTasksByMonth(monthlyCounts);
      setCompletedTasksByMonth(selectedMonthlyCounts);
    } catch (error) {
      toast.error("Hiba a feladatok lekérdezésénél:", error.message);
    }
  };

  const handleMonthClick = (monthIndex) => {
    if(monthIndex!=selectedMonth){
      setSelectedMonth(monthIndex);
    }
    else{
      setSelectedMonth(null)
    }
  };

  const maxValue = Math.max(...tasksByMonth, 1);
  const maxWidth = 100;
  const maxHeight = 100;
  const barWidths = tasksByMonth.map((value) => (value / maxValue) * maxWidth);
  const barHeights = tasksByMonth.map(
    (value) => (value / maxValue) * maxHeight
  );

  // Pie chart adatok
  const getPieChartData = () => {
    if (!selectedPerson) return null;

    let completed, uncompleted, title;
    if (selectedMonth !== null) {
      // havi adatok
      completed = completedTasksByMonth[selectedMonth] || 0;
      uncompleted = (tasksByMonth[selectedMonth] || 0) - completed;
      title = `${Months[selectedMonth]} feladatok aránya`;
    } else {
      // éves adatok
      completed = sum(completedTasksByMonth);
      uncompleted = sum(tasksByMonth) - completed;
      title = `Éves feladatok aránya (${selectedYear})`;
    }

    // százalékok számítása
    const total = completed + uncompleted;
    const completedPercentage =
      total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
    const uncompletedPercentage =
      total > 0 ? ((uncompleted / total) * 100).toFixed(1) : 0;

    // Ne legyen üres
    completed = completed > 0 ? completed : 0;
    uncompleted = uncompleted > 0 ? uncompleted : 0;
    if (completed === 0 && uncompleted === 0) {
      completed = 1; // Minimum érték
      uncompleted = 1;
    }

    return {
      data: [
        {
          id: 0,
          value: completed,
          label: `Teljesített (${completedPercentage}%)`,
          color: colors.completed,
        },
        {
          id: 1,
          value: uncompleted,
          label: `Nem teljesített (${uncompletedPercentage}%)`,
          color: colors.uncompleted,
        },
      ],
      title,
      percentages: {
        completed: completedPercentage,
        uncompleted: uncompletedPercentage,
      },
    };
  };

  const pieChartData = getPieChartData();

  // tooltip tartalom
  const CustomTooltip = ({ datum }) => {
    if (!datum) return null;
    const percentage = datum.label.includes("Teljesített")
      ? pieChartData.percentages.completed
      : pieChartData.percentages.uncompleted;
    return (
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
          {datum.label.split(" ")[0]}: {percentage}%
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={styles.container}>
      <VezerloHeader />
      <Box sx={styles.statCont}>
        {/* Bal oszlop */}
        <Box sx={styles.leftColumn}>
          <Card sx={styles.selectType}>
            <Typography
              variant="h6"
              sx={
                selectedType === "ügyfél"
                  ? styles.selectedType
                  : styles.notSelectedType
              }
              onClick={() => handleTypeClick("ügyfél")}
            >
              Ügyfelek
            </Typography>
            <Typography
              variant="h6"
              sx={
                selectedType === "alkalmazott"
                  ? styles.selectedType
                  : styles.notSelectedType
              }
              onClick={() => handleTypeClick("alkalmazott")}
            >
              Alkalmazottak
            </Typography>
            <Typography
              variant="h6"
              sx={
                selectedType === "felhasználó"
                  ? styles.selectedType
                  : styles.notSelectedType
              }
              onClick={() => handleFelhasznaloClick("felhasználó")}
            >
              Saját feladatok
            </Typography>
          </Card>

          <Card sx={styles.listType}>
            <Typography
              variant="h5"
              sx={{
                margin: "auto",
                paddingBottom: "10px",
                color: colors.text,
              }}
            >
              {selectedType === "alkalmazott"
                ? "Alkalmazottak"
                : selectedType === "felhasználó"
                ? "Felhasználó"
                : selectedType === "ügyfél"
                ? "Ügyfelek"
                : "Személyek"}
            </Typography>
            {selectedType && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <Typography
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={showTips ? "Kattints rám!" : ""}
                  key={index}
                  variant="body1"
                  sx={{ color: colors.text, "&:hover": { cursor: "pointer" } }}
                  onClick={() => handlePersonClick(item)}
                >
                  {item.Nev}
                </Typography>
              ))
            ) : selectedType ? (
              <Typography variant="body2" sx={{ color: colors.text }}>
                {selectedType === "alkalmazott"
                  ? "Nincsenek alkalmazottak"
                  : selectedType === "felhasználó"
                  ? "Hiba történt a betöltéskor"
                  : "Nincsenek ügyfelek"}
              </Typography>
            ) : (
              data.map((item, index) => (
                <Typography
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={showTips ? "Kattints rám!" : ""}
                  key={index}
                  variant="body1"
                  sx={{ color: colors.text, "&:hover": { cursor: "pointer" } }}
                  onClick={() => handlePersonClick(item)}
                >
                  {item.Nev}
                </Typography>
              ))
            )}
          </Card>
        </Box>

        {/* Jobb oszlop (mobil nézet) */}
        <Box sx={styles.rightColumnVertical}>
          <Box sx={styles.statRow}>
            <Typography variant="h5" sx={{color: "black"}}>
              {selectedPerson ? selectedPerson.Nev : "Név"}
            </Typography>
            <Box sx={styles.statRowDate}>
              <IconButton onClick={() => setSelectedYear(selectedYear - 1)}>
                <ArrowBackIosIcon sx={{color: "black"}} />
              </IconButton>
              <Typography variant="h5" sx={styles.selectedYearVertical}>
                {selectedYear}
              </Typography>
              <IconButton onClick={() => setSelectedYear(selectedYear + 1)}>
                <ArrowForwardIosIcon sx={{color: "black"}}/>
              </IconButton>
            </Box>
          </Box>
          <Box sx={styles.chart}>
            {selectedPerson && (
              <Box sx={styles.verticalCounter}>
                <Typography sx={styles.verticalLabel}>db</Typography>
                <Typography sx={styles.halfValue}>
                  {Half(tasksByMonth)}
                </Typography>
                <Typography sx={styles.maxValue}>
                  {Max(tasksByMonth)}
                </Typography>
              </Box>
            )}
            {selectedPerson ? (
              Months.map((month, index) => (
                <Box sx={styles.row} key={index}>
                  <Box
                    sx={{
                      ...styles.statistic,
                      ...(selectedMonth === index
                        ? styles.statisticSelected
                        : {}),
                      width: `${barWidths[index]}%`,
                    }}
                    onClick={() => handleMonthClick(index)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={showTips ? "Kattints rám!" : ""}
                  />
                  <Typography sx={styles.sorszam}>
                    {month.slice(0, 3) + "."}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "black" }}>
                Válassz ki egy személyt!
              </Typography>
            )}
          </Box>
          {selectedPerson && (
            <Box sx={styles.selectedPersonTasksCount}>
              <Typography sx={{color: "black"}}>
                Összes feladat ebben az évben: {sum(tasksByMonth)}
              </Typography>
              <Typography sx={{color: "black"}}>
                Összes teljesített feladat az évben:{" "}
                {sum(completedTasksByMonth)}
              </Typography>
              {selectedMonth !== null && (
                <Box sx={styles.monthTasks}>
                  <Typography sx={{color: "black"}}>
                    {Months[selectedMonth]} feladatai:{" "}
                    {tasksByMonth[selectedMonth]}
                  </Typography>
                  <Typography sx={{color: "black"}}>
                    Teljesített feladatok:{" "}
                    {completedTasksByMonth[selectedMonth]}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Jobb oszlop (asztali nézet) */}
        <Box sx={styles.rightColumnHorizontal}>
          <Box sx={styles.statRow}>
            <Typography variant="h5" sx={styles.name}>
              {selectedPerson ? selectedPerson.Nev : "Név"}
            </Typography>
            <Box sx={styles.statRowDate}>
              <IconButton onClick={() => setSelectedYear(selectedYear - 1)}>
                <ArrowBackIosIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography variant="h5" sx={styles.selectedYear}>
                {selectedYear}
              </Typography>
              <IconButton onClick={() => setSelectedYear(selectedYear + 1)}>
                <ArrowForwardIosIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={styles.chart}>
            {selectedPerson && (
              <Box sx={styles.horizontalCounter}>
                <Typography
                  sx={{
                    height: `${maxHeight / 2}%`,
                    ...styles.horizontalLabel,
                  }}
                >
                  {Max(tasksByMonth)}
                </Typography>
                <Typography
                  sx={{
                    height: `${maxHeight / 2}%`,
                    ...styles.horizontalLabel,
                  }}
                >
                  {Half(tasksByMonth)}
                </Typography>
                <Typography sx={styles.sorszam}>db</Typography>
              </Box>
            )}
            {selectedPerson ? (
              Months.map((month, index) => (
                <Box sx={styles.row} key={index}>
                  <Box
                    sx={{
                      ...styles.statistic,
                      ...(selectedMonth === index
                        ? styles.statisticSelected
                        : {}),
                      height: `${barHeights[index]}%`,
                    }}
                    onClick={() => handleMonthClick(index)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={showTips ? "Kattints rám!" : ""}
                  />
                  <Typography sx={styles.sorszam}>
                    {month.slice(0, 3) + "."}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "black" }}>
                Válassz ki egy személyt!
              </Typography>
            )}
          </Box>
          {selectedPerson && (
            <Box sx={styles.selectedPersonTasksCount}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  Összes feladat ebben az évben: {sum(tasksByMonth)}
                </Typography>
                <Typography>
                  Összes teljesített feladat az évben:{" "}
                  {sum(completedTasksByMonth)}
                </Typography>
              </Box>
              {selectedMonth !== null && (
                <Box sx={styles.monthTasks}>
                  <Typography>
                    {Months[selectedMonth]} feladatai:{" "}
                    {tasksByMonth[selectedMonth]}
                  </Typography>
                  <Typography>
                    Teljesített feladatok:{" "}
                    {completedTasksByMonth[selectedMonth]}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        
      </Box>
      {/** PieChart */}
      {selectedPerson && pieChartData && (
            <Box sx={styles.pieChartContainer}>
              <Typography variant="h6" sx={styles.pieChartTitle}>
                {pieChartData.title}
              </Typography>
              <PieChart
                series={[
                  {
                    data: pieChartData.data,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                    padding: 0,
                    labelStyle: { fill: "black" },
                  },
                }}
                tooltip={{
                  trigger: "item",
                  formatter: (datum) => <CustomTooltip datum={datum} />,
                }}
                height={220}
                margin={{ top: 30, bottom: 50, left: 10, right: 10 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  width: '90%',
                }}
              />
            </Box>
          )}
      {showTips && <Tooltip id="my-tooltip" />}
    </Box>
  );
}
