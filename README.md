# 📖 Shri RamcharitManas

A modern full-stack web application for reading **Goswami Tulsidas Ji's Shri RamcharitManas** with Hindi meaning, English translation, transliteration, bookmarks, reading progress, authentication, and a personalized dashboard.

The goal of this project is to provide devotees and readers with a beautiful, easy-to-use digital platform for studying and reading the RamcharitManas.

---

## ✨ Features

### 📚 Reading Experience
- Read all seven Kand of Shri RamcharitManas
- Verse-wise reading
- Hindi meaning (अर्थ)
- English translation
- Transliteration
- Continue Reading
- Previous / Next verse navigation
- Responsive reading interface

### 👤 User Features
- User Registration
- Secure Login (JWT Authentication)
- Personalized Dashboard
- Continue Reading section
- Reading Progress Tracking
- Bookmark favourite verses
- Profile Management

### 🔍 Search
- Search verses
- Search by Hindi text
- Fast verse lookup

### 🛠 Admin Features
- Admin Login
- Add New Verse
- Edit Verse
- Delete Verse
- Verse Management Panel

### 🔐 Security
- JWT Authentication
- Spring Security
- Role Based Authorization
- Protected Routes

---

# 🏗 Project Architecture

```
                React Frontend
                       │
                  REST API
                       │
               Spring Boot Backend
                       │
                 Spring Security
                       │
                     MySQL
```

---

# 💻 Technology Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- JavaScript
- HTML5
- CSS3

## Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- MySQL

## Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📁 Project Structure

```
RamcharitManas
│
├── backend
│   └── ramcharitmanas
│       ├── src
│       ├── pom.xml
│       └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ypandey9/RamcharitManas.git
```

---

## Backend

```bash
cd backend/ramcharitmanas
```

Configure MySQL in

```
application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ramcharitmanas
spring.datasource.username=root
spring.datasource.password=yourpassword
```

Run

```bash
mvn spring-boot:run
```

Backend will start on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm start
```

Frontend

```
http://localhost:3000
```

---

# 🔐 Authentication

The application uses

- JWT Authentication
- Spring Security
- BCrypt Password Encryption

---

# 📸 Screenshots

## Home Page

(Add Screenshot)

---

## Dashboard

(Add Screenshot)

---

## Continue Reading

(Add Screenshot)

---

## Bookmark Page

(Add Screenshot)

---

## Search

(Add Screenshot)

---

## Admin Panel

(Add Screenshot)

---

# 📖 Current Features

- ✅ Authentication
- ✅ Registration
- ✅ Login
- ✅ Dashboard
- ✅ Reading Progress
- ✅ Continue Reading
- ✅ Bookmarks
- ✅ Search
- ✅ Verse Management
- ✅ JWT Security
- ✅ Responsive Design

---

# 🚧 Upcoming Features

- 🔊 Audio Recitation
- 🌙 Dark Mode
- ❤️ Donation Module
- 📅 Daily Reading Plan
- 📊 Reading Statistics
- 📱 Progressive Web App (PWA)
- 🔔 Notifications
- 📥 PDF Export
- 📖 Reading History
- 🎧 Audio Player

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

# 👨‍💻 Developer

**Yogesh Pandey**

GitHub

https://github.com/ypandey9

---

# 🙏 Acknowledgement

This project is dedicated to **Goswami Tulsidas Ji** and all devotees of **Shri Ram**.

**॥ श्री सीतारामचन्द्रार्पणमस्तु ॥**
