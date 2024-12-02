export default function HomeSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center h-screen animate-pulse">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded w-48 mb-4">Loading ...</div>

            {/* Button skeleton */}
            <div className="h-10 bg-gray-200 rounded w-24">Loading ...</div>
        </div>
    );
}
