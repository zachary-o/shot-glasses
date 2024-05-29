import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import "./assets/fonts/fonts.scss"
import "./scss/app.scss"
import Home from "./pages/Home"
import Admin from "./pages/Admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
