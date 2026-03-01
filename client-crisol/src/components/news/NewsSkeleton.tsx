import Skeleton from "../Skeleton";

export const HeroNewsSkeleton = () => (
    <div className="mb-12 border-b border-black/10 dark:border-zinc-800 pb-8">
        <Skeleton className="h-80 w-full mb-6 border border-black/10 dark:border-zinc-800" />
        <Skeleton width="60px" height="12px" className="mb-3" />
        <Skeleton className="mb-4" width="90%" height="28px" />
        <Skeleton className="mb-6" width="100%" height="40px" />
        <Skeleton width="100px" height="12px" />
    </div>
);

export const BulletNewsSkeleton = () => (
    <div className="border-b border-black/10 dark:border-zinc-800 p-6 mb-8">
        <Skeleton width="60px" height="12px" className="mb-2" />
        <Skeleton className="mb-4" width="80%" height="24px" />
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                    <Skeleton width="18px" height="18px" borderRadius="50%" />
                    <Skeleton width="80%" height="16px" />
                </div>
            ))}
        </div>
    </div>
);

const NewsSkeleton = () => {
    return (
        <div className="space-y-4">
            <HeroNewsSkeleton />
            <BulletNewsSkeleton />
            <BulletNewsSkeleton />
        </div>
    );
};

export default NewsSkeleton;
