export const stringAvatar = (name) => ({
    sx: { color: "black", backgroundColor: colors.text },
    children: name
      ? `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`
      : "",
  });

export const colors = {
    background: "#152238",
    button: "#2a3b5f",
    card: "#1c2e4a",
    text: "#c5cacd",
    buttonHover: "#3b4e7a",
    secondaryBackground: "#f5f5f5",
    completed: "#4caf50", 
    uncompleted: "#f44336", 
  };