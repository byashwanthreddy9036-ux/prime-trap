const btn = document.getElementById("Start-btn");
const nameInput = document.getElementById("name");

btn.addEventListener("click", () => {
    const playerName = nameInput.value.trim();

    if (!playerName) {
        alert("Enter your name");
        return;
    }

    localStorage.setItem("playerName", playerName);

    window.location.href = "/game/index.html"; 
});
