import { FcAbout, FcAnswers, FcBusinessman, FcFullTrash } from "react-icons/fc";
import Sidebar from "../../components/Sidebar";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { useGetDashboardQueries } from "../../queries/blog.query";

const DashboardAdminPage = () => {
  const { darkMode } = useContext(UserContext);

  const [data] = useGetDashboardQueries();
  const dashboardData = data.data?.Blogs;

  const cardClass = `border border-black dark:border-zinc-800 p-8 flex flex-col justify-between group transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${darkMode ? "bg-brand-dark" : "bg-brand-light"
    }`;

  const iconClass = "grayscale group-hover:brightness-0 opacity-70 group-hover:invert group-hover:opacity-100 transition-all duration-300";

  return (
    <>
      <Sidebar />
      <div className={`flex-1 p-6 md:p-12 min-h-screen ${darkMode ? "bg-brand-dark text-slate-100" : "bg-brand-light text-ink"}`}>
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
              Metrics.
            </h1>
            <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
              System oversight and quantitative reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className={cardClass}>
              <div className="flex justify-between items-start mb-12">
                <div className={iconClass}><FcAnswers size={42} /></div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">01</span>
              </div>
              <div>
                <p className="text-5xl font-serif font-bold mb-2">
                  {dashboardData?.blogs || 0}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100">Published Dispatches</p>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex justify-between items-start mb-12">
                <div className={iconClass}><FcAbout size={42} /></div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">02</span>
              </div>
              <div>
                <p className="text-5xl font-serif font-bold mb-2">
                  {dashboardData?.comments || 0}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100">Public Comments</p>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex justify-between items-start mb-12">
                <div className={iconClass}><FcFullTrash size={42} /></div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">03</span>
              </div>
              <div>
                <p className="text-5xl font-serif font-bold mb-2">
                  {dashboardData?.drafts || 0}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100">Unpublished Drafts</p>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex justify-between items-start mb-12">
                <div className={iconClass}><FcBusinessman size={42} /></div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">04</span>
              </div>
              <div>
                <p className="text-5xl font-serif font-bold mb-2">
                  {dashboardData?.users || 0}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100">Registered Users</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdminPage;
