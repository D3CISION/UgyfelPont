export async function getUsers(filter) {
    try {
        const response = await fetch("https://localhost:44396/api/Felhasznalok", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                alert("Az adatok betöltése sikertelen volt");
            }
            return []; // Ha hiba van, térjünk vissza egy üres tömbbel
        }

        const data = await response.json();
        return data.filter(user => user.Szerepkor === "felhasználó");

    } catch (error) {
        console.error("Hiba történt az adatok lekérése közben:", error);
        return []; // Ha a fetch hibát dob, térjünk vissza egy üres tömbbel
    }
}
