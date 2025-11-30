import { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import { UserContext } from "../../contexts/UserContextProvider";

const DashboardUsersPage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <div
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900"
          : "border-gray-200 bg-slate-100"
      }`}
    >
      <Sidebar />
    </div>
  );
};

export default DashboardUsersPage;
