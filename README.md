# Personal Expense Tracker

A **Personal Expense Tracker** web application built with **MERN stack** (MongoDB, Express.js, React/Next.js, Node.js). Users can add, view, edit, and delete expenses. This project also includes optional bonus features like filtering, charts, and JWT authentication.

---

## **Demo**
**Frontend:** [Frontend Live Link](https://personal-expense-tracker-flame-psi.vercel.app)  
**Backend:** [Backend Live Link](https://personal-expense-tracker-server-six.vercel.app)

---

## **Features**

### **Core Features**
- Add new expenses with:
  - Title
  - Amount
  - Category (Food, Transport, Shopping, Others)
  - Date
- View all expenses in a table or card layout
- Display total expense amount
- Edit and delete expenses
- Responsive design for mobile, tablet, and desktop

### **Bonus Features**
- Filter expenses by category or date range
- Display expenses by category in a **pie chart** using Chart.js
- JWT authentication (register & login)
- Fully deployed on **Vercel**

---

## **Technologies Used**

- **Frontend:** Next.js(App router), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Charts:** Chart.js
- **Deployment:** Vercel

---

---

## **API Endpoints**

| Method | Endpoint             | Description                     |
|--------|---------------------|---------------------------------|
| POST   | /expenses           | Add a new expense               |
| GET    | /expenses           | Get all expenses                |
| PATCH  | /expenses/:id       | Update an expense               |
| DELETE | /expenses/:id       | Delete an expense               |
| POST   | /auth/register      | Register a new user (JWT)      |
| POST   | /auth/login         | Login user (JWT)                |

**Validation Rules:**
- `title`: required, min length 3
- `amount`: required, must be a number > 0
- `date`: required, valid date

---

## **Getting Started**

### **Prerequisites**
- Node.js >= 14
- MongoDB (Atlas)
- npm

### **Backend Setup**
```bash
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb+srv://sifatikram96:S2PjEh0STqJS33Fb@cluster0.lvhaoea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# JWT_SECRET=da8f18f49c767d1e1f3199ff3862752a40a6b2dd3a57d6709bf3b0906267b3a0a7bb262d9b520a1282b411800877f5a73a13aff17ff51a024ffe9c56c98125c2
# JWT_REFRESH_SECRET=db553ee522803ffb37b26ca55034eb78f8b21fbb764069a0969503e4338314e175d33e8ccbd7d4c55b3c288f3950aeb8dbd5327b8c59f7a6912468bcdc001e66
# NODE_ENV=production
# CLIENT_URL=https://personal-expense-tracker-flame-psi.vercel.app
npm run dev

---

### **Frontend Setup**
```bash
cd client
npm install
npm run dev
---
Then open http://localhost:3000 to view the app.

