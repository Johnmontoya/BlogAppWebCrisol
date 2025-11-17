import { FcDocument, FcList, FcSms, FcTemplate } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full justify-center flex flex-row pt-4 gap-2 text-gray-900">
      <NavLink
        end={true}
        to={"/admin"}
        className={(isActive) =>
          `flex justify-center items-center py-1 rounded-2xl gap-3 px-3 md:px-9 md:min-w-56 cursor-pointer ${
            isActive && "bg-slate-400 hover:bg-slate-200"
          }`
        }
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <FcTemplate size={28} />
          <p className="hidden md:inline-block">Dashboard</p>
        </div>
      </NavLink>

      <NavLink
        end={true}
        to={"/admin/addBlog"}
        className={(isActive) =>
          `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-slate-400 hover:bg-slate-200"
          }`
        }
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <FcDocument size={28} />
          <p className="hidden md:inline-block">Agregar Blogs</p>
        </div>
      </NavLink>

      <NavLink
        end={true}
        to={"/admin/listBlog"}
        className={(isActive) =>
          `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-slate-400 hover:bg-slate-200"
          }`
        }
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <FcList size={28} />
          <p className="hidden md:inline-block">Lista de Blogs</p>
        </div>
      </NavLink>

      <NavLink
        end={true}
        to={"/admin/comments"}
        className={(isActive) =>
          `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-slate-400 hover:bg-slate-200"
          }`
        }
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <FcSms size={28} />
          <p className="hidden md:inline-block">Comentarios</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
