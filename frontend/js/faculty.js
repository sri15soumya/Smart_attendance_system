async function startSession() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/start-session", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();

    document.getElementById("qrImage").src = data.qr;
}