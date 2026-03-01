import Skeleton from "../Skeleton";

const ProfileSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12 border-b border-black/10 dark:border-zinc-800 pb-6">
                <Skeleton width="180px" height="60px" className="mb-2" />
                <Skeleton width="240px" height="20px" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Left Column */}
                <div className="md:col-span-4 border border-black/10 dark:border-zinc-800 p-8 flex flex-col items-center">
                    <Skeleton width="96px" height="96px" borderRadius="50%" className="mb-6" />
                    <Skeleton width="120px" height="24px" className="mb-2" />
                    <Skeleton width="160px" height="16px" className="mb-8" />
                    <Skeleton width="100%" height="40px" />
                </div>

                {/* Right Column */}
                <div className="md:col-span-8 flex flex-col justify-center">
                    <Skeleton width="120px" height="28px" className="mb-6" />
                    <div className="space-y-3 mb-12">
                        <Skeleton width="100%" height="16px" />
                        <Skeleton width="100%" height="16px" />
                        <Skeleton width="80%" height="16px" />
                    </div>

                    <Skeleton width="160px" height="28px" className="mb-6 border-t border-black/10 dark:border-zinc-800/50 pt-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <Skeleton width="80px" height="12px" className="mb-2" />
                                <Skeleton width="140px" height="20px" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
