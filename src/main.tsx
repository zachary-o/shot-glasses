import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import App from "./App.tsx"

import { ToastContainer } from "react-toastify"
import store from "./redux/store.ts"
import "./i18n.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
