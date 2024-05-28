import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "./assets/fonts/fonts.scss";
import "./scss/app.scss";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
