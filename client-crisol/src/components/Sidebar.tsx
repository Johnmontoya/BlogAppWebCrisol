import { useContext } from "react";
import {
  FcDocument,
  FcInspection,
  FcList,
  FcPortraitMode,
  FcSms,
  FcTemplate,
  FcTodoList,
  FcViewDetails,
} from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const Sidebar = () => {
  const { role, darkMode } = useContext(UserContext);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center py-3 px-4 md:px-6 transition-colors border-r border-black/10 dark:border-zinc-800/50 last:border-r-0 ${isActive
      ? "bg-black text-white dark:bg-white dark:text-black font-bold"
      : `hover:bg-black/5 dark:hover:bg-white/5 ${darkMode ? 'text-slate-300' : 'text-ink'}`
    }`;

  const iconClass = ({ isActive }: { isActive: boolean }) =>
    `grayscale ${isActive ? "opacity-100 brightness-0 invert" : "opacity-70 group-hover:opacity-100"}`

  return (
    <>
      <div className={`w-full border-b border-black dark:border-zinc-800 ${darkMode ? 'bg-brand-dark' : 'bg-brand-light'}`}>
        <nav className="max-w-7xl mx-auto flex flex-wrap justify-center text-xs tracking-widest uppercase font-medium">
          {role === "Admin" && (
            <>
              <NavLink end={true} to={"/admin"} className={linkClass}>
                {({ isActive }) => (
                  <div className="flex flex-row gap-2 justify-center items-center group">
                    <div className={iconClass({ isActive })}><FcTemplate size={18} /></div>
                    <p className="hidden md:inline-block">Dashboard</p>
                  </div>
                )}
              </NavLink>

              <NavLink end={true} to={"/admin/userlist"} className={linkClass}>
                {({ isActive }) => (
                  <div className="flex flex-row gap-2 justify-center items-center group">
                    <div className={iconClass({ isActive })}><FcTodoList size={18} /></div>
                    <p className="hidden md:inline-block">Users</p>
                  </div>
                )}
              </NavLink>

              <NavLink end={true} to={"/news/add"} className={linkClass}>
                {({ isActive }) => (
                  <div className="flex flex-row gap-2 justify-center items-center group">
                    <div className={iconClass({ isActive })}><FcInspection size={18} /></div>
                    <p className="hidden md:inline-block">Add News</p>
                  </div>
                )}
              </NavLink>

              <NavLink end={true} to={"/news/list"} className={linkClass}>
                {({ isActive }) => (
                  <div className="flex flex-row gap-2 justify-center items-center group">
                    <div className={iconClass({ isActive })}><FcViewDetails size={18} /></div>
                    <p className="hidden md:inline-block">News List</p>
                  </div>
                )}
              </NavLink>
            </>
          )}

          <NavLink end={true} to={"/profile"} className={linkClass}>
            {({ isActive }) => (
              <div className="flex flex-row gap-2 justify-center items-center group">
                <div className={iconClass({ isActive })}><FcPortraitMode size={18} /></div>
                <p className="hidden md:inline-block">Profile</p>
              </div>
            )}
          </NavLink>

          <NavLink end={true} to={"/blog/addblog"} className={linkClass}>
            {({ isActive }) => (
              <div className="flex flex-row gap-2 justify-center items-center group">
                <div className={iconClass({ isActive })}><FcDocument size={18} /></div>
                <p className="hidden md:inline-block">Add Blog</p>
              </div>
            )}
          </NavLink>

          <NavLink end={true} to={"/blog/listblog"} className={linkClass}>
            {({ isActive }) => (
              <div className="flex flex-row gap-2 justify-center items-center group">
                <div className={iconClass({ isActive })}><FcList size={18} /></div>
                <p className="hidden md:inline-block">Blog List</p>
              </div>
            )}
          </NavLink>

          <NavLink end={true} to={"/blog/comments"} className={linkClass}>
            {({ isActive }) => (
              <div className="flex flex-row gap-2 justify-center items-center group">
                <div className={iconClass({ isActive })}><FcSms size={18} /></div>
                <p className="hidden md:inline-block">Comments</p>
              </div>
            )}
          </NavLink>
        </nav>
      </div>
      <div className={`${darkMode ? "bg-brand-dark" : "bg-brand-light"}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
