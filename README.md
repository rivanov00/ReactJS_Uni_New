
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
Navigate into the project directory and install all the required Node.js packages.

npm install

Set up the database:

Make sure you have a db.json file in the root of your project. This file will serve as your database. It should have a structure like this (you can add initial user or shopping list data):
## ▶️ How to Run the Project
You need to run two things at the same time: the JSON Server (your fake backend) and the React development server.

Start the JSON Server:
Open your terminal in the project folder and run the server. This will serve your db.json file via a REST API.

npm run server

(This command assumes you have a script named server in your package.json file that runs json-server --watch db.json --port 5000. If not, you might need to adjust this command or add the script.)

Start the React Application:
Open a second terminal window (keeping the first one running the JSON Server) in the project folder and start the React development server.

npm start

Your application should now open automatically in your default web browser, typically at http://localhost:3000.

Remember to keep both terminal windows open while you are working on the project.

Feel free to contribute or report issues!