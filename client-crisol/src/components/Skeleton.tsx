import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
}

const Skeleton = ({ className = "", width, height, borderRadius }: SkeletonProps) => {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={`bg-zinc-200 dark:bg-zinc-800 ${className}`}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
            }}
        />
    );
};

export default Skeleton;
