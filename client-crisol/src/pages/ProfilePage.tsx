import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContextProvider";
import { useGetUserIdQueries } from "../queries/user.query";
import { useAuthStore } from "../store/auth";
import { TfiEmail } from "react-icons/tfi";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import ProfileSkeleton from "../components/user/ProfileSkeleton";
import moment from "moment";

const ProfilePage = () => {
  const userId = useAuthStore((state) => state.userId);
  const { darkMode } = useContext(UserContext);
  const [data] = useGetUserIdQueries(userId);
  const user = data.data?.user;
  const isLoading = data.isLoading;

  if (isLoading) {
    return (
      <>
        <Sidebar />
        <div className={`w-full flex-1 p-6 md:p-12 min-h-screen ${darkMode ? 'bg-brand-dark' : 'bg-brand-light'}`}>
          <ProfileSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={`w-full flex-1 p-6 md:p-12 min-h-screen ${darkMode ? 'bg-brand-dark text-slate-100' : 'bg-brand-light'}`}>
        <div className="max-w-4xl mx-auto">

          <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
              Dossier.
            </h1>
            <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
              Identity and credentials on record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Column - Identification */}
            <div className={`md:col-span-4 border border-black dark:border-zinc-800 p-8 flex flex-col items-center text-center relative ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-black dark:border-zinc-800" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-black dark:border-zinc-800" />

              <div className="w-24 h-24 bg-ink text-white dark:bg-white dark:text-ink rounded-full flex items-center justify-center mb-6">
                <CiUser size={48} />
              </div>

              <h2 className="font-serif text-2xl font-bold mb-1">
                {user?.username}
              </h2>
              <p className={`text-sm mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {user?.email}
              </p>

              <button className="w-full font-bold tracking-widest uppercase text-xs border border-ink dark:border-zinc-600 bg-transparent text-ink dark:text-white hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink transition-colors py-3">
                Edit Record
              </button>
            </div>

            {/* Right Column - Information */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <h3 className="font-serif text-2xl italic mb-6">Biography</h3>
              <p className={`font-light leading-relaxed mb-12 ${darkMode ? 'text-slate-300' : 'text-ink-light'}`}>
                A discerning contributor to the historical record. Engaged in the critical analysis of emerging thought and established doctrine.
              </p>

              <h3 className="font-serif text-2xl italic mb-6 border-t border-black/10 dark:border-zinc-800/50 pt-8">Clearance Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-2">
                    <TfiEmail /> Comm Link
                  </div>
                  <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-ink'}`}>
                    {user?.email}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-2">
                    <CiUser /> Clearance Level
                  </div>
                  <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-ink'}`}>
                    {user?.role}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-2">
                    <CiCalendarDate /> Established
                  </div>
                  <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-ink'}`}>
                    {moment(user?.createdAt).format("MMM DD, YYYY")}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
