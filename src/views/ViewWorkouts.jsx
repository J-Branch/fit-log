import { Link, useLoaderData, useNavigate, useSearchParams} from "react-router-dom";
import { WorkoutRow } from "../utils/workoutPageUtils/workoutPageTable";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

function getPagination(currentPage, totalPages) {
    const delta = 2;

    // If total pages is small enough, show everything
    const maxVisible = delta * 2 + 5; 
    // explanation: first + last + current ± delta + 2 possible "..."
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

    // Left ellipsis
    if (start > 2) {
        result.push("...");
    }

    // Middle pages
    result.push(...range);

    // Right ellipsis
    if (end < totalPages - 1) {
        result.push("...");
    }

    // Always include last page
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

        // toast message if user created new workout
        if (toastType === "created") {
            toast.success("Workout Created!");
        }

        // toast message if user edited workout
        if (toastType === "edited") {
            toast.success("Workout Updated!");
        }

        // toast message if user deleted workout
        if (toastType === "deleted") {
            toast.success("Workout Deleted!");
        }

        toastShown.current = true;

        navigate(".", {replace: true});
    }, [searchParams, navigate]);

    return (
        <div>
            <div>
                <h1></h1>
                <Link to="../workouts/create">Create Workout</Link>
            </div>

            {workouts.length ? (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pr-3">
                        {workouts.map(workout => (
                            <WorkoutRow key={workout.$id} workout={workout} />
                        ))}
                    </ul>

                    <div className="flex justify-center gap-2 mt-8">
                        {pages.map((p,i) =>
                            p === "..." ? (
                                <span key={i}>...</span>
                            ) : (
                                <Link
                                    key={i}
                                    to={`?page=${p}`}
                                    className={`px-3 py-1 border rounded ${
                                        p === page ? "bg-indigo-500 text-white" : ""
                                    }`}
                                >
                                    {p}
                                </Link>
                            )
                        )}
                    </div>
                </>
            ) : (
                <Link to="../workouts/create">You have no workouts. Create one!</Link>
            )}
        </div>
    );
}

export default ViewWorkouts;