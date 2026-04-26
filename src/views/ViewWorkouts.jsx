import { Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { WorkoutRow } from "../utils/workoutPageUtils/workoutPageTable";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

function getPagination(currentPage, totalPages) {
    const delta = 2;

    const maxVisible = delta * 2 + 5;

    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range = [];
    const result = [];

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    result.push(1);

    if (start > 2) result.push("...");

    result.push(...range);

    if (end < totalPages - 1) result.push("...");

    result.push(totalPages);

    return result;
}

function ViewWorkouts() {
    const { workouts, page, totalPages, total, error } = useLoaderData();
    const pages = getPagination(page, totalPages);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const toastShown = useRef(false);

    useEffect(() => {
        if (error === "rate_limit") {
            toast.error("Too many requests. Please wait a moment.");
        }
    }, [error]);

    useEffect(() => {
        if (toastShown.current) return;

        const toastType = searchParams.get("toast");
        if (!toastType) return;

        if (toastType === "created") toast.success("Workout Created!");
        if (toastType === "edited") toast.success("Workout Updated!");
        if (toastType === "deleted") toast.success("Workout Deleted!");

        toastShown.current = true;
        navigate(".", { replace: true });
    }, [searchParams, navigate]);

    return (
        <div
            className="w-full min-h-screen bg-gray-50 py-4 px-2"
            style={{
                backgroundColor: "#f9fafb",
                backgroundImage: `
                    radial-gradient(#e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))
                `,
                backgroundSize: "20px 20px, 100% 100%",
            }}
        >
            <div className="max-w-4xl mx-auto">

                <div className="bg-white border border-gray-100 overflow-hidden">

                    {/* Header with total */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Your Workouts
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {total} total workout{total === 1 ? "" : "s"}
                            </p>
                        </div>

                        <Link
                            to="../workouts/create"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            + Create Workout
                        </Link>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 px-4 py-3 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 z-10">
                        <div>Workout Name</div>
                        <div className="text-center">Date</div>
                        <div className="text-right">Type</div>
                    </div>

                    {/* List */}
                    {workouts.length ? (
                        <>
                            <ul className="flex flex-col">
                                {workouts.map(workout => (
                                    <WorkoutRow key={workout.$id} workout={workout} />
                                ))}
                            </ul>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 py-4 border-t border-gray-100">
                                {pages.map((p, i) =>
                                    p === "..." ? (
                                        <span key={i} className="px-2">...</span>
                                    ) : (
                                        <Link
                                            key={i}
                                            to={`?page=${p}`}
                                            className={`px-3 py-1 border rounded text-sm ${
                                                p === page
                                                    ? "bg-primary-red-one text-white"
                                                    : "bg-white hover:bg-gray-100"
                                            }`}
                                        >
                                            {p}
                                        </Link>
                                    )
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="py-10 text-center text-gray-500">
                            <p className="text-lg font-medium">No workouts yet</p>
                            <p className="text-sm mt-1">
                                Create your first workout to get started
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ViewWorkouts;