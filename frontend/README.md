# Kidney Compass
![logo](https://plus.unsplash.com/premium_photo-1702598804759-8fb687f774fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlhbHlzaXN8ZW58MHx8MHx8fDA%3D)
## Overview

Kidney Compass is a full-stack MERN application designed to help dialysis patients organize trusted kidney education resources and keep track of questions they want to discuss with their healthcare team.

Patients can build their own personalized learning library by saving trusted educational topics and creating questions related to those topics. The goal is to encourage patient education, organization, and meaningful conversations with nephrologists, nurses, dietitians, and other members of the dialysis care team.


---

## Why Kidney Compass?

As a Certified Hemodialysis Technician (CHT), I've seen firsthand how overwhelming kidney disease education can be for patients. Kidney Compass was created to provide a simple way for patients to organize trusted educational resources and keep track of questions they want to discuss with their healthcare team, helping them become more informed and engaged in their own care.

---

## Live Demo

**Application:** 

[Click Here for Live Demo](https://kidney-compass-frontend.netlify.app)

---

## Planning Materials

### Trello Board

[Click Here for Trello Board](https://trello.com/invite/b/6a431c4c578e04c39d626165/ATTI17e14350641053ec5d78fbbb382371fa550EF7D8/kidney-compass)

---

## Features

- User authentication (Signup/Login/Logout)
- Secure JWT authorization
- Personalized Learning Library
- Create, edit, and delete learning topics
- Create, edit, and delete patient questions
- Link questions to specific education topics
- Trusted Resources page
- Responsive design
- Protected routes
- User-specific data privacy

---

## Technologies Used

### Frontend

- React
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

### Development Tools

- Git
- GitHub
- Postman
- Visual Studio Code

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/kidney-compass.git
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

```bash
cd ../frontend
npm install
```

### Create a .env file inside the backend folder

```env
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
PORT=3000
```

### Start the backend

```bash
cd backend
node server.js
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Data Models

### User

- username
- email
- password

### EducationTopic

- title
- category
- summary
- body
- sourceName
- sourceUrl
- user

### PatientQuestion

- educationTopic
- question
- notes
- status
- user

---

## Future Enhancements

- AI-powered educational explanations
- Save favorite topics
- Search and filter learning topics
- Category filtering
- Patient reminders
- Admin role for curated educational content
- Upload educational PDFs
- Dark mode
- Mobile app version

---

## Attributions

Educational resources referenced from:

- National Kidney Foundation
- National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)
- American Kidney Fund
- DaVita Kidney Care
- American Association of Kidney Patients (AAKP)

---

## Author

**Christina Boles**

GitHub:

https://github.com/cbolze91