async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split('.')[1]));

        if (payload.role === "faculty") {
            window.location.href = "faculty.html";
        } else {
            window.location.href = "student.html";
        }
    } else {
        alert("Login failed");
    }
}