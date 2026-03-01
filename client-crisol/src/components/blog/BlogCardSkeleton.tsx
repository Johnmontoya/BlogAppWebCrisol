import Skeleton from "../Skeleton";

const BlogCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full border border-black/10 dark:border-zinc-800">
            {/* Image Skeleton */}
            <Skeleton className="h-64 w-full" />

            <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Author & Date Skeleton */}
                <div className="flex items-center justify-between mb-4 border-b border-black/10 dark:border-zinc-800 pb-4">
                    <Skeleton width="100px" height="14px" />
                    <Skeleton width="80px" height="14px" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="mb-4" width="90%" height="32px" />
                <Skeleton className="mb-4" width="70%" height="32px" />

                {/* Description Skeleton */}
                <div className="space-y-2 mb-8">
                    <Skeleton width="100%" height="16px" />
                    <Skeleton width="100%" height="16px" />
                    <Skeleton width="40%" height="16px" />
                </div>

                {/* Read More Skeleton */}
                <Skeleton width="120px" height="14px" className="mt-auto" />
            </div>
        </div>
    );
};

export default BlogCardSkeleton;
