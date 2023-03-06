import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./src/styles.css"


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));