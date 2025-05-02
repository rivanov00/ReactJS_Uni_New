
## ✨ React Shopping List app developed for uni ✨

This is a simple web application built with React to manage a personal shopping list. It includes user authentication features.
## 🚀 What the Project Does

This application provides a user-friendly interface for managing your grocery or shopping items. Key features include:

User Authentication: Securely register new accounts and log in existing users.

Personalized Lists: Each logged-in user has their own private shopping list.

Item Management: Easily add, edit, and delete items from your list.

Data Persistence: Shopping list data is stored (simulated via JSON Server) and loaded when you log in.

Navigation: Simple navigation bar to switch between Home, Login, and Register pages.

Error Handling: Displays messages for actions like adding duplicates, failed API calls, etc.

Not Found Page: A custom page for invalid URLs.
## 🛠️ Technologies Used

React: Frontend JavaScript library for building the user interface.

React Router DOM: For handling client-side routing.

React Hooks: useState, useEffect, useContext, useNavigate for state management, side effects, authentication, and navigation.

JSON Server: A fake REST API used for simulating backend data storage (db.json).

CSS: For styling the application's appearance.
## 📦 Installation and Setup

To get this project running on your local machine, follow these steps:

Clone the repository:
Open your terminal or command prompt and clone the project from your GitHub repository.

git clone https://github.com/rivanov00/ReactJS_Uni_New/ 

cd ReactJS_Uni_New

Install dependencies:

npm install 

npm install json-server --save-dev

## ▶️ How to Run the Project

npm start - for react dev server 

npm run api - for JSON server (backend)

The application should open at http://localhost:3000

You can access the database here :

http://localhost:5000/users & http://localhost:5000/shoppinglist

Remember to keep both terminal windows open while you are working on the project.

Feel free to contribute or report issues!
