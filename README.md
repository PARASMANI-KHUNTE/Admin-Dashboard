# Admin Dashboard 🚀

![Admin Dashboard Demo](https://img.shields.io/badge/Demo-Live-brightgreen)  
**Live Demo:** [https://admin-dashboard-js6u.onrender.com](https://admin-dashboard-js6u.onrender.com)

---

## Overview 📋

The **Admin Dashboard** is a full-stack web application designed for managing hotels, vehicles, and regions. It provides a user-friendly interface for admins to perform CRUD (Create, Read, Update, Delete) operations on these entities. The application is built using **React** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** for the database.

---

## Features ✨

### 1. **Hotel Management 🏨**
   - Add, update, and delete hotels.
   - View a list of hotels with details like name, price, address, and region.
   - Search hotels by name, price, or region.

### 2. **Vehicle Management 🚗**
   - Add, update, and delete vehicles.
   - View a list of vehicles with details like type, price, and region.
   - Search vehicles by type, price, or region.

### 3. **Region Management 🌍**
   - Add, update, and delete regions.
   - View a list of regions with details like name and sub-regions.
   - Search regions by name.

### 4. **User Authentication 🔐**
   - Secure login functionality using JWT (JSON Web Tokens).
   - Protected routes for authenticated users only.

### 5. **Modern UI 🎨**
   - Built with **Tailwind CSS** for a clean and responsive design.
   - Interactive forms and tables for easy data management.

---

## Tech Stack 💻

### Frontend:
- **React** ⚛️
- **React Router** 🛣️
- **Axios** 🌐
- **Tailwind CSS** 🎨

### Backend:
- **Node.js** 🟢
- **Express** 🚀
- **MongoDB** 🍃
- **JWT** 🔐

### Deployment:
- **Render** ☁️

---

## Setup Instructions 🛠️

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PARASMANI-KHUNTE/Admin-Dashboard.git
   cd Admin-Dashboard
   ```

2. **Install Dependencies:**
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the `server` directory and add the following:
     ```env
     PORT=3000
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret-key>
     ```

4. **Run the Application:**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

5. **Access the Application:**
   - Open your browser and go to `http://localhost:3000`.

---

## Live Demo 🌐

Check out the live demo of the application:  
👉 [https://admin-dashboard-js6u.onrender.com](https://admin-dashboard-js6u.onrender.com)

---

## Screenshots 📸

### Login Page
![Login Page](https://drive.google.com/file/d/1L__MG4hCKWs6mvNyXaOfv96FeE2aP5h9/view?usp=sharing)

### Hotels Management
![Hotels Management](https://drive.google.com/file/d/1XRjRWrzg65RsvLvb4CCnRwXoa1wzdV4n/view?usp=sharing)

### Vehicles Management
![Vehicles Management](https://drive.google.com/file/d/1773RU7XFC8HJVMqQ41R_HgkQPrEAHeEE/view?usp=sharing)

### Regions Management
![Regions Management](https://drive.google.com/file/d/1IsyZoQoi_JQOTzk0m61AngZYJhhBYrdQ/view?usp=sharing)

---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact 📧

For any questions or feedback, feel free to reach out:  
- **Parasmani Khunte**  
- GitHub: [PARASMANI-KHUNTE](https://github.com/PARASMANI-KHUNTE)  
- Email: [parasmanikhunte@gmail.com](parasmanikhunte@gmail.com)

---

Enjoy using the Admin Dashboard! 🎉
