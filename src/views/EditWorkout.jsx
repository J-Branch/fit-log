import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import Weightlifting from "../components/editWorkout/Weightlifting";
import DistanceTime from "../components/editWorkout/DistanceTime";
import { useFetchWorkout } from "../hooks/workouts/useFetchWorkout";
import { useWorkoutArrays } from "../hooks/workouts/useWorkoutArrays";

function EditWorkout() {
    const params = useParams();
    const workoutId = params.id;

    const fetchedWorkout = useFetchWorkout(workoutId);
    // const { form, updateForm, setForm, updateArray, deleteArray, toUpdateArray} = useWorkoutForm();
    const { form, updateForm, setForm } = useWorkoutForm();
    const { upArr, delArr, toUpArr, toDelArr } = useWorkoutArrays();
    const [isEditing, setIsEditing] = useState(false);
    const [backupForm, setBackupForm] = useState(null);

    // populate the form with the workout the user editing
    useEffect(() => {
        if (fetchedWorkout && !form.$id) {
            setForm(fetchedWorkout);
        }
    }, [fetchedWorkout]);

    // keep a backup up of the form in case of cancel
    function handleEditToggle() {
        if (!isEditing) {
            // ENTER edit mode keep a copy of workout
            setBackupForm(structuredClone(fetchedWorkout));
            setIsEditing(true);
        } else {
            // CANCEL edit restore copy
            setForm(backupForm);
            setIsEditing(false);
        }
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
            <Link to="../workouts" className="text-blue-500">
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
                            toUpArr({...form, workoutName: e.target.value});
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
                    toUpArr={toUpArr}
                    toDelArr={toDelArr}
                />
            )}

            {form.workoutType === "Distance/Time" && (
                <DistanceTime
                    form={form}
                    updateForm={updateForm}
                    isEditing={isEditing}
                    toUpArr={toUpArr}
                    toDelArr={toDelArr}
                />
            )}

            {/* {isEditing && (
                <form onSubmit={onEditSubmit} className="space-y-4 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        save changes
                    </button>
                </form>
            )} */}
            
        </div>
    );
}

export default EditWorkout;