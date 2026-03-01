import Skeleton from "../Skeleton";

const ArticleSkeleton = () => {
    return (
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center pb-24">
            <header className="w-full text-center px-6 pt-24 pb-16 md:pt-32 md:pb-24 max-w-5xl mx-auto">
                <div className="flex justify-center mb-8">
                    <Skeleton width="80px" height="24px" />
                </div>
                <Skeleton width="80%" height="72px" className="mx-auto mb-8" />
                <Skeleton width="60%" height="32px" className="mx-auto mb-12" />
                <div className="pt-8 border-t border-black/10 dark:border-zinc-800/50 w-full max-w-lg mx-auto flex justify-center gap-4">
                    <Skeleton width="120px" height="16px" />
                    <Skeleton width="10px" height="16px" />
                    <Skeleton width="100px" height="16px" />
                </div>
            </header>

            <div className="w-full max-w-3xl mx-auto px-6">
                <div className="space-y-4 mb-24">
                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="90%" height="20px" />
                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="40%" height="20px" />
                </div>
                <div className="w-full h-[1px] bg-black/10 dark:bg-zinc-800 mb-20" />
            </div>
        </div>
    );
};

export default ArticleSkeleton;
