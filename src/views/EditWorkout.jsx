// EditWorkout.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import { FetchWorkout } from "../hooks/workouts/FetchWorkout";
// import { useWorkoutContext } from "../context/workout.context";
import { useSubmitWorkout } from "../hooks/workouts/useSubmitWorkout";
import Weightlifting from "../components/editWorkout/Weightlifting";

function EditWorkout() {
    const { id: workoutId } = useParams();

    // --- ALWAYS top-level hooks (never inside conditions) ---
    const { userWorkouts, userExercises, userSets } = useWorkoutContext();
    const { form, updateForm, setForm, updateArray, deleteArray, toUpdateArray} = useWorkoutForm();
    const [isEditing, setIsEditing] = useState(false);
    const [backupForm, setBackupForm] = useState(null);

    function handleEditToggle() {
        if (!isEditing) {
            // ENTER edit mode → take snapshot
            setBackupForm(structuredClone(form)); // safest deep clone
            setIsEditing(true);
        } else {
            // CANCEL edit → restore snapshot
            setForm(backupForm);
            setIsEditing(false);
        }
    }   

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

    const { onEditSubmit, workoutSubmitStatus } = useSubmitWorkout({ form, updateArray, deleteArray });

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
                        onChange={(e) => {
                            updateForm(["workoutName"], e.target.value);
                            toUpdateArray({...form, workoutName: e.target.value});
                        }}
                    />
                ) : (
                    <h1 className="text-2xl font-semibold">{form.workoutName}</h1>
                )}
            </div>

            {/* Edit Mode Toggle */}
            <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-800 text-white rounded"
            >
                {isEditing ? "Cancel" : "Edit Workout"}
            </button>

            {form.workoutType === "Weightlifting" && (
                <Weightlifting
                    form={form}
                    updateForm={updateForm}
                    isEditing={isEditing}
                    updateArray={updateArray}
                    deleteArray={deleteArray}
                    toUpdateArray={toUpdateArray}
                />
            )}

            {isEditing && (
                <form onSubmit={onEditSubmit} className="space-y-4 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        save changes
                    </button>
                </form>
            )}
            
        </div>
    );
}

export default EditWorkout;