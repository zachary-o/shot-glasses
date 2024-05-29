import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
