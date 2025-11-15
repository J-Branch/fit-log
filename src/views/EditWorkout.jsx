// EditWorkout.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import { FetchWorkout } from "../hooks/workouts/FetchWorkout";
import { useWorkoutContext } from "../context/workout.context";
import { useSubmitWorkout } from "../hooks/workouts/useSubmitWorkout";

function EditWorkout() {
    const { id: workoutId } = useParams();

    // --- ALWAYS top-level hooks (never inside conditions) ---
    const { userWorkouts, userExercises, userSets } = useWorkoutContext();
    const { form, updateForm, setForm } = useWorkoutForm();
    const [isEditing, setIsEditing] = useState(false);

    // Memoize the fetched workout (safe: won't break hook order)
    const fetchedWorkout = useMemo(() => {
        if (!userWorkouts.length) return null; // data not loaded yet
        return FetchWorkout({
            workoutId,
            userWorkouts,
            userExercises,
            userSets,
        });
    }, [workoutId, userWorkouts, userExercises, userSets]);

    // Sync fetched workout into form ONLY when it becomes available
    useEffect(() => {
        if (fetchedWorkout && form.$id !== fetchedWorkout.$id) {
            setForm(fetchedWorkout);
        }
    }, [fetchedWorkout]);

    const { onEditSubmit, workoutSubmitStatus } = useSubmitWorkout({ form });

    // -----------------------------
    // LOADING & NOT FOUND
    // -----------------------------
    if (!userWorkouts.length) {
        return <div>Loading workout...</div>;
    }

    if (!fetchedWorkout) {
        return (
            <div>
                <h1 className="text-xl font-semibold text-red-600">
                    Workout Not Found
                </h1>
                <Link className="text-blue-500" to="/workouts">
                    Back to workouts
                </Link>
            </div>
        );
    }

    // -----------------------------
    // Exercise & Set Handlers
    // -----------------------------
    function handleAddExercise() {
        updateForm(["exercises"], [
            ...form.exercises,
            {
                $id: null,
                name: "",
                sets: [{ $id: null, setCounter: 1, reps: "", weight: "" }],
            },
        ]);
    }

    function handleAddSet(exIndex) {
        const currentSets = form.exercises[exIndex].sets;
        updateForm(["exercises", exIndex, "sets"], [
            ...currentSets,
            {
                $id: null,
                setCounter: currentSets.length + 1,
                reps: "",
                weight: "",
            },
        ]);
    }

    function handleRemoveExercise(exIndex) {
        updateForm(
            ["exercises"],
            form.exercises.filter((_, i) => i !== exIndex)
        );
    }

    function handleRemoveSet(exIndex, setIndex) {
        updateForm(
            ["exercises", exIndex, "sets"],
            form.exercises[exIndex].sets.filter((_, i) => i !== setIndex)
        );
    }

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <div className="space-y-4">
            <Link to="/workouts" className="text-blue-500">
                Back to workouts
            </Link>

            {/* Workout Name */}
            <div>
                {isEditing ? (
                    <input
                        className="border p-2 text-xl font-semibold"
                        value={form.workoutName}
                        onChange={(e) =>
                            updateForm(["workoutName"], e.target.value)
                        }
                    />
                ) : (
                    <h1 className="text-2xl font-semibold">
                        {form.workoutName}
                    </h1>
                )}
            </div>

            {/* Edit Mode Toggle */}
            <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="px-4 py-2 bg-gray-800 text-white rounded"
            >
                {isEditing ? "Cancel" : "Edit Workout"}
            </button>

            {/* Exercises */}
            {form.exercises.map((ex, exIndex) => (
                <div key={ex.$id ?? `new-${exIndex}`} className="border p-4 rounded space-y-3">
                    <div className="flex justify-between">
                        {isEditing ? (
                            <input
                                className="border p-2 font-semibold"
                                value={ex.name}
                                onChange={(e) =>
                                    updateForm(
                                        ["exercises", exIndex, "name"],
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <h2 className="text-lg font-semibold">{ex.name}</h2>
                        )}

                        {isEditing && (
                            <button
                                className="text-red-500"
                                onClick={() => handleRemoveExercise(exIndex)}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    {/* SETS */}
                    <div className="space-y-2">
                        {ex.sets.map((set, setIndex) => (
                            <div
                                key={set.$id ?? `newset-${setIndex}`}
                                className="flex items-center justify-between bg-gray-100 p-2 rounded"
                            >
                                {isEditing ? (
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            className="border p-1 w-20"
                                            value={set.reps}
                                            onChange={(e) =>
                                                updateForm(
                                                    [
                                                        "exercises",
                                                        exIndex,
                                                        "sets",
                                                        setIndex,
                                                        "reps",
                                                    ],
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            type="number"
                                            className="border p-1 w-20"
                                            value={set.weight}
                                            onChange={(e) =>
                                                updateForm(
                                                    [
                                                        "exercises",
                                                        exIndex,
                                                        "sets",
                                                        setIndex,
                                                        "weight",
                                                    ],
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            className="text-red-500"
                                            onClick={() =>
                                                handleRemoveSet(
                                                    exIndex,
                                                    setIndex
                                                )
                                            }
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <span>
                                        Set {setIndex + 1}: {set.reps} reps ×{" "}
                                        {set.weight} lbs
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {isEditing && (
                        <button
                            className="text-blue-500"
                            onClick={() => handleAddSet(exIndex)}
                        >
                            + Add Set
                        </button>
                    )}
                </div>
            ))}

            {isEditing && (
                <>
                    <button
                        className="text-green-600"
                        onClick={handleAddExercise}
                    >
                        + Add Exercise
                    </button>

                    <hr />

                    <button
                        onClick={onEditSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Save Changes
                    </button>
                </>
            )}
        </div>
    );
}

export default EditWorkout;