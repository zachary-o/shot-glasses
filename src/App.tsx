import { Route, Routes } from "react-router-dom";
import "./assets/fonts/fonts.scss";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import MainLayout from "./layouts/MainLayout";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import "./scss/app.scss";

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
      </Route>
    </Routes>
  );
}

export default App;
