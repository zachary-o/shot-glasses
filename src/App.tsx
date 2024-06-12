import { Route, Routes } from "react-router-dom"
import "./assets/fonts/fonts.scss"
import AdminOnlyRoute from "./components/AdminOnlyRoute"
import MainLayout from "./layouts/MainLayout"
import Admin from "./pages/Admin"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import "./scss/app.scss"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route
          path="admin"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
