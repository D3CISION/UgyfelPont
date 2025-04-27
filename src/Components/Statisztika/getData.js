export async function getData() {
    const url = `https://localhost:44396/api/Felhasznalok`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        var user = JSON.parse(localStorage.getItem("user"))
        var data = await response.json();
        data = data.filter(x => x.CegId == user.CegId);
        console.log("response:", data);

        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}