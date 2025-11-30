import { useContext } from "react";
import { FcDocument, FcInspection, FcList, FcPortraitMode, FcSms, FcTemplate, FcTodoList, FcViewDetails } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const Sidebar = () => {
  const { role } = useContext(UserContext);

  return (
    <>
      <div className="m-auto max-w-7xl justify-center grid grid-cols-4 pt-4 gap-2 text-gray-900 px-4">
        {role === "Admin" ? (
          <>
            <NavLink
              end={true}
              to={"/admin"}
              className={(isActive) =>
                `flex justify-center items-center py-1 rounded-2xl gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
                  isActive && "bg-slate-300 hover:bg-slate-200"
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
              to={"/admin/userlist"}
              className={(isActive) =>
                `flex justify-center items-center py-1 rounded-2xl gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
                  isActive && "bg-slate-300 hover:bg-slate-200"
                }`
              }
            >
              <div className="flex flex-row gap-1 justify-center items-center">
                <FcTodoList size={28} />
                <p className="hidden md:inline-block">Lista de usuarios</p>
              </div>
            </NavLink>

            <NavLink
              end={true}
              to={"/news/add"}
              className={(isActive) =>
                `flex justify-center items-center py-1 rounded-2xl gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
                  isActive && "bg-slate-300 hover:bg-slate-200"
                }`
              }
            >
              <div className="flex flex-row gap-1 justify-center items-center">
                <FcInspection size={28} />
                <p className="hidden md:inline-block"> Agregar Noticias</p>
              </div>
            </NavLink>

            <NavLink
              end={true}
              to={"/news/list"}
              className={(isActive) =>
                `flex justify-center items-center py-1 rounded-2xl gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
                  isActive && "bg-slate-300 hover:bg-slate-200"
                }`
              }
            >
              <div className="flex flex-row gap-1 justify-center items-center">
                <FcViewDetails size={28} />
                <p className="hidden md:inline-block">Lista de Noticias</p>
              </div>
            </NavLink>
          </>
        ) : (
          <></>
        )}

        <NavLink
          end={true}
          to={"/profile"}
          className={(isActive) =>
            `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
              isActive && "bg-slate-300 hover:bg-slate-200"
            }`
          }
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <FcPortraitMode size={28} />
            <p className="hidden md:inline-block">Perfil</p>
          </div>
        </NavLink>

        <NavLink
          end={true}
          to={"/blog/addblog"}
          className={(isActive) =>
            `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
              isActive && "bg-slate-300 hover:bg-slate-200"
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
          to={"/blog/listblog"}
          className={(isActive) =>
            `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
              isActive && "bg-slate-300 hover:bg-slate-200"
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
          to={"/blog/comments"}
          className={(isActive) =>
            `flex justify-center items-center py-1 rounded-2xl  gap-3 px-3 md:px-9 md:min-w-48 cursor-pointer ${
              isActive && "bg-slate-300 hover:bg-slate-200"
            }`
          }
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <FcSms size={28} />
            <p className="hidden md:inline-block">Comentarios</p>
          </div>
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
