export const monthsData = [
    { value: "01", label: "Január" },
    { value: "02", label: "Február" },
    { value: "03", label: "Március" },
    { value: "04", label: "Április" },
    { value: "05", label: "Május" },
    { value: "06", label: "Június" },
    { value: "07", label: "Július" },
    { value: "08", label: "Augusztus" },
    { value: "09", label: "Szeptember" },
    { value: "10", label: "Október" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
]

export function getCurrentMonth() {
    // Az aktuális hónap lekérése (0-indexelt, ezért +1)
    const currentMonthNumber = new Date().getMonth() + 1;
    // Kétjegyű formátumra alakítjuk, pl. "01", "02", stb.
    const currentMonthValue = String(currentMonthNumber).padStart(2, '0');
    // A monthsData tömbből megtaláljuk az aktuális hónapnak megfelelő objektumot
    return monthsData.find(month => month.value === currentMonthValue);
  }

    var szamok = []
    for (let i = 2025; i < 2041; i++) {
        szamok.push({ value: i, label: i });
    }
    export const yearsData = szamok;
