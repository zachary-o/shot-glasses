import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="container">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
