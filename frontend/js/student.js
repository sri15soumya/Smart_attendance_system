function onScanSuccess(decodedText) {
    markAttendance(decodedText);
}

let scanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 250
});

scanner.render(onScanSuccess);

async function markAttendance(tokenFromQR) {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/mark-attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                token: tokenFromQR,
                latitude,
                longitude
            })
        });

        const data = await response.json();

        alert(data.msg);
    });
}