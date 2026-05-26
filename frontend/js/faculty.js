async function startSession() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/start-session", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (!response.ok) {
        throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    const qrImg = document.getElementById("qrImage");
    qrImg.src = data.qr;
    qrImg.style.display = "block";

    document.getElementById("qrPlaceholder").style.display = "none";

    const chip = document.getElementById("statusChip");
    chip.className = "chip chip-live";
    chip.textContent = "Live";
}