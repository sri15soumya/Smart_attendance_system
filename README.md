<div align="center">

# Smart Secure Attendance System

**QR Code · AES-256 Encryption · GPS Geo-fencing**

A lightweight, hardware-free attendance system that verifies physical presence using encrypted QR codes and real-time GPS validation — no dedicated hardware, no app install required.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![AES-256](https://img.shields.io/badge/AES--256--CBC-Encrypted-red?style=for-the-badge)]()

</div>

---

## Overview

Traditional QR attendance systems have one critical flaw — students can screenshot and forward the QR code to absent friends. This system closes that loophole with three layers of verification:

1. **Encrypted QR** — payload is AES-256-CBC encrypted, impossible to forge
2. **5-minute expiry** — QR is useless after the session window closes
3. **GPS geo-fence** — student must be physically within 50m of the classroom

> No dedicated hardware needed. Works on any modern smartphone browser.

---

## How It Works

```
 FACULTY                          SERVER                        STUDENT
   │                                │                               │
   │──── POST /start-session ───────▶│                               │
   │                                │── Generate session ID         │
   │                                │── Encrypt payload (AES-256)   │
   │                                │── Save to MongoDB             │
   │◀─── QR Code (Base64 PNG) ──────│                               │
   │                                │                               │
   │  [displays QR on screen]       │                               │
   │                                │                               │
   │                                │◀──── POST /mark-attendance ───│
   │                                │        QR token + GPS coords  │
   │                                │                               │
   │                                │── Decrypt QR token            │
   │                                │── Check expiry                │
   │                                │── Haversine distance ≤ 50m    │
   │                                │── Check duplicate             │
   │                                │── Save attendance record      │
   │                                │                               │
   │                                │──── 200 OK ───────────────────▶│
```

---

## Features

| Feature | Details |
|---------|---------|
| 🔐 Encrypted QR Codes | AES-256-CBC with random IV per session |
| ⏱️ Session Expiry | QR codes invalidate after 5 minutes |
| 📍 GPS Verification | Haversine formula, 50m geo-fence radius |
| 👥 Role-based Access | Separate dashboards for Faculty and Students |
| 🚫 Duplicate Prevention | One submission per student per session |
| 🔑 Secure Auth | JWT tokens + bcrypt password hashing |
| 📱 No App Required | Runs fully in the mobile browser |

---

## Tech Stack

```
Frontend        HTML · CSS · Vanilla JS · html5-qrcode (CDN)
Backend         Node.js · Express.js
Database        MongoDB · Mongoose ODM
Auth            JSON Web Tokens (JWT) · bcryptjs
Encryption      AES-256-CBC (Node.js crypto module)
QR              qrcode (npm) — server-side generation
```

---

## Project Structure

```
Smart_attendance_system/
│
├── server.js                   # App entry point
│
├── config/
│   └── db.js                   # MongoDB connection
│
├── routes/
│   ├── authRoutes.js           # POST /register, POST /login
│   ├── facultyRoutes.js        # POST /start-session
│   └── studentRoutes.js        # POST /mark-attendance
│
├── models/
│   ├── User.js                 # name, email, password, role
│   ├── Session.js              # sessionId, expiry, facultyId
│   └── Attendance.js           # sessionId, studentId, timestamp
│
├── middleware/
│   └── authMiddleware.js       # JWT verification
│
├── utils/
│   └── encryption.js           # AES encrypt / decrypt helpers
│
├── frontend/
│   ├── index.html              # Login
│   ├── register.html           # Registration
│   ├── faculty.html            # QR generation dashboard
│   └── student.html            # QR scanner + GPS submission
│
├── .env.example
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sri15soumya/Smart_attendance_system.git
cd Smart_attendance_system
git checkout modified

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/attendance_db
JWT_SECRET=your_jwt_secret_key
AES_SECRET=your_32_character_key_here!!  # must be exactly 32 chars
CLASS_LAT=12.84296
CLASS_LON=80.15804
ALLOWED_RADIUS=50
```

```bash
# 4. Start the server
node server.js

# Open in browser
# http://localhost:5000/index.html
```

---

## API Reference

### Auth

```
POST /register
Body: { name, email, password, role }       → 201 User created

POST /login
Body: { email, password }                   → 200 { token }
```

### Faculty

```
POST /start-session
Header: Authorization: Bearer <faculty_jwt>
Body: none                                  → 200 { qr: "<base64 PNG>" }
```

### Student

```
POST /mark-attendance
Header: Authorization: Bearer <student_jwt>
Body: { token, latitude, longitude }        → 200 Attendance recorded

Error responses:
  400 — Invalid/missing QR token or GPS data
  403 — Outside classroom or session expired
  409 — Attendance already marked
  401 — Unauthorized
```

---

## Security Design

```
Password Storage    bcrypt hash (never plaintext)
QR Payload          AES-256-CBC encrypted with random IV per session
Session Tokens      JWT signed with server secret, 1hr expiry
QR Window           5-minute hard expiry enforced server-side
Location Check      Haversine distance computed server-side (not client-trusted)
Duplicate Guard     Composite key (sessionId + studentId) checked before insert
```

---



---


