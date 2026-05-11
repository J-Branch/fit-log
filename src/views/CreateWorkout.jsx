import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import { Link, Form, useNavigation, useActionData } from "react-router-dom";
import { addExercise, addSet, removeExercise, removeSet } from "../utils/workoutHandlers";
import { useEffect } from "react";
import Toast from "react-hot-toast";

function CreateWorkout() {
    const { form, updateForm } = useWorkoutForm();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const actionData = useActionData();
    const error = actionData?.error;

    useEffect(() => {
        if (error) {
            Toast.error(error);
        }
    }, [error]);

    const inputClass =
        "w-full px-4 py-2 mt-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    const labelClass = "text-sm font-medium text-gray-700";

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <Form method="post">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-100">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Workout
                            </h1>
                            <Link
                                to="../workouts"
                                className="inline-block mt-2 text-sm text-gray-500 hover:text-gray-700 transition"
                            >
                                ← Back to Workouts
                            </Link>
                        </div>

                        {/* Body */}
                        <div className="px-8 py-6 space-y-6">
                            
                            {/* Workout Name */}
                            <div>
                                <label className={labelClass}>Workout Name</label>
                                <input
                                    name="workoutName"
                                    type="text"
                                    className={inputClass}
                                    value={form.workoutName}
                                    onChange={(e) => updateForm(["workoutName"], e.target.value)}
                                />
                            </div>

                            {/* Workout Type */}
                            <div>
                                <label className={labelClass}>Workout Type</label>
                                <select
                                    name="workoutType"
                                    className={inputClass}
                                    value={form.workoutType}
                                    onChange={(e) => updateForm(["workoutType"], e.target.value)}
                                >
                                    <option value="">--- Select ---</option>
                                    <option value="Weightlifting">Weightlifting</option>
                                    <option value="Distance/Time">Distance/Time</option>
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label className={labelClass}>Date</label>
                                <div className="flex gap-3 mt-1">
                                    <input
                                        name="dateMonth"
                                        type="number"
                                        placeholder="MM"
                                        className={inputClass}
                                        value={form.date.month}
                                        onChange={(e) => updateForm(["date", "month"], e.target.value)}
                                    />
                                    <input
                                        name="dateDay"
                                        type="number"
                                        placeholder="DD"
                                        className={inputClass}
                                        value={form.date.day}
                                        onChange={(e) => updateForm(["date", "day"], e.target.value)}
                                    />
                                    <input
                                        name="dateYear"
                                        type="number"
                                        placeholder="YYYY"
                                        className={inputClass}
                                        value={form.date.year}
                                        onChange={(e) => updateForm(["date", "year"], e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Distance/Time */}
                            {form.workoutType === "Distance/Time" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Distance (miles)</label>
                                        <input
                                            name="distance"
                                            type="number"
                                            step=".01"
                                            className={inputClass}
                                            value={form.distance}
                                            onChange={(e) => updateForm(["distance"], e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Duration</label>
                                        <div className="flex gap-3 mt-1">
                                            <input
                                                name="durationMinutes"
                                                type="number"
                                                placeholder="Minutes"
                                                className={inputClass}
                                                value={form.time.minutes}
                                                onChange={(e) => updateForm(["time", "minutes"], e.target.value)}
                                            />
                                            <input
                                                name="durationSeconds"
                                                type="number"
                                                placeholder="Seconds"
                                                className={inputClass}
                                                value={form.time.seconds}
                                                onChange={(e) => updateForm(["time", "seconds"], e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Weightlifting */}
                            {form.workoutType === "Weightlifting" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Exercises
                                    </h3>

                                    <div className="space-y-4">
                                        {form.exercises.map((exercise, exerciseIndex) => (
                                            <div
                                                key={exerciseIndex}
                                                className="border border-gray-100 rounded-lg p-5 bg-gray-50"
                                            >
                                                <div className="mb-4">
                                                    <label className={labelClass}>Exercise Name</label>
                                                    <input
                                                        type="text"
                                                        className={inputClass}
                                                        value={exercise.exerciseName}
                                                        onChange={(e) =>
                                                            updateForm(
                                                                ["exercises", exerciseIndex, "exerciseName"],
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                {/* Sets */}
                                                <div className="space-y-3">
                                                    {exercise.sets.map((set, setIndex) => (
                                                        <div
                                                            key={setIndex}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <span className="text-xs text-gray-500 w-12">
                                                                Set {setIndex + 1}
                                                            </span>

                                                            <input
                                                                type="number"
                                                                placeholder="Reps"
                                                                className={inputClass}
                                                                value={set.reps}
                                                                onChange={(e) =>
                                                                    updateForm(
                                                                        ["exercises", exerciseIndex, "sets", setIndex, "reps"],
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                            <input
                                                                type="number"
                                                                placeholder="Weight"
                                                                className={inputClass}
                                                                value={set.weight}
                                                                onChange={(e) =>
                                                                    updateForm(
                                                                        ["exercises", exerciseIndex, "sets", setIndex, "weight"],
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeSet(form, updateForm, exerciseIndex, setIndex)
                                                                }
                                                                className="text-xs text-red-500 hover:text-red-700"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addSet(form, updateForm, exerciseIndex)
                                                        }
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        + Add Set
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeExercise(form, updateForm, exerciseIndex)
                                                        }
                                                        className="text-sm text-red-500 hover:text-red-700"
                                                    >
                                                        Remove Exercise
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => addExercise(form, updateForm)}
                                        className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        + Add Exercise
                                    </button>
                                </div>
                            )}

                            {form.workoutType === "Weightlifting" && (
                                <input
                                    type="hidden"
                                    name="exercises"
                                    value={JSON.stringify(form.exercises)}
                                />
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? "Saving..." : "Complete Workout"}
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreateWorkout;