import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";
import { useState } from "react";

function Weightlifting({ form, updateForm, mode, uiSelection, setUiSelection }) {

    function toggleExerciseUI(exercise) {
        setUiSelection(prev => {
            const newValue = !prev.exercises[exercise.$id];

            const updated = {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exercise.$id]: newValue
                },
                sets: { ...prev.sets }
            };

            exercise.sets.forEach(set => {
                updated.sets[set.$id] = newValue;
            });

            return updated;
        });
    }

    function toggleSetUI(set) {
        setUiSelection(prev => ({
            ...prev,
            sets: {
                ...prev.sets,
                [set.$id]: !prev.sets[set.$id]
            }
        }));
    }

    return (
        <div className="space-y-6">

            {form.exercises.map((exercise, exerciseIndex) => (
                <div
                    key={exercise.$id ?? `new-ex-${exerciseIndex}`}
                    className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm"
                >

                    {/* EXERCISE HEADER */}
                    <div className="flex justify-between items-start gap-4">

                        <div className="flex items-start gap-3 w-full">

                            {/* checkbox */}
                            {mode === "edit" && exercise.$id && (
                                <input
                                    type="checkbox"
                                    className="accent-primary-red-one w-4 h-4 mt-2"
                                    checked={!!uiSelection.exercises[exercise.$id]}
                                    onChange={() => toggleExerciseUI(exercise)}
                                />
                            )}

                            <div className="w-full space-y-1">

                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                    Exercise
                                </p>

                                {mode === "edit" ? (
                                    <input
                                        name="exerciseName"
                                        className="w-full px-3 py-2 text-sm font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                                        value={exercise.exerciseName}
                                        onChange={(e) => {
                                            updateForm(
                                                ["exercises", exerciseIndex, "exerciseName"],
                                                e.target.value
                                            );
                                        }}
                                        onBlur={() => {
                                            updateForm(
                                                ["exercises", exerciseIndex, "isDirty"],
                                                true
                                            );
                                        }}
                                    />
                                ) : (
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {exercise.exerciseName}
                                    </h2>
                                )}

                            </div>
                        </div>

                        {mode === "edit" && !exercise.$id && (
                            <button
                                type="button"
                                className="text-xs text-red-500 hover:text-red-700 transition"
                                onClick={() =>
                                    removeExercise(form, updateForm, exerciseIndex)
                                }
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    {/* SETS SECTION */}
                    <div className="space-y-3">

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Sets
                        </p>

                        {exercise.sets.map((set, setIndex) => (
                            <div
                                key={set.$id ?? `new-set-${setIndex}`}
                                className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100/60 transition"
                            >

                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-3">

                                    {mode === "edit" && set.$id && (
                                        <input
                                            type="checkbox"
                                            className="accent-primary-red-one w-4 h-4"
                                            checked={!!uiSelection.sets[set.$id]}
                                            onChange={() => toggleSetUI(set)}
                                        />
                                    )}

                                    {mode === "edit" ? (
                                        <>
                                            <input
                                                name="setReps"
                                                type="number"
                                                placeholder="Reps"
                                                className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                                                value={set.reps}
                                                onChange={(e) =>
                                                    updateForm(
                                                        [
                                                            "exercises",
                                                            exerciseIndex,
                                                            "sets",
                                                            setIndex,
                                                            "reps"
                                                        ],
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    updateForm(
                                                        [
                                                            "exercises",
                                                            exerciseIndex,
                                                            "sets",
                                                            setIndex,
                                                            "isDirty"
                                                        ],
                                                        true
                                                    )
                                                }
                                            />

                                            <input
                                                name="setWeight"
                                                type="number"
                                                placeholder="Weight"
                                                className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red-one"
                                                value={set.weight}
                                                onChange={(e) =>
                                                    updateForm(
                                                        [
                                                            "exercises",
                                                            exerciseIndex,
                                                            "sets",
                                                            setIndex,
                                                            "weight"
                                                        ],
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    updateForm(
                                                        [
                                                            "exercises",
                                                            exerciseIndex,
                                                            "sets",
                                                            setIndex,
                                                            "isDirty"
                                                        ],
                                                        true
                                                    )
                                                }
                                            />
                                        </>
                                    ) : (
                                        <span className="text-sm text-gray-700">
                                            Set {setIndex + 1}:{" "}
                                            <span className="font-medium">
                                                {set.reps} reps × {set.weight} lbs
                                            </span>
                                        </span>
                                    )}
                                </div>

                                {/* REMOVE SET */}
                                {mode === "edit" && !set.$id && (
                                    <button
                                        type="button"
                                        className="text-xs text-red-500 hover:text-red-700 transition"
                                        onClick={() =>
                                            removeSet(
                                                form,
                                                updateForm,
                                                exerciseIndex,
                                                setIndex
                                            )
                                        }
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ADD SET */}
                    {mode === "edit" && (
                        <button
                            type="button"
                            className="text-sm text-primary-red-one hover:opacity-80 font-medium"
                            onClick={() =>
                                addSet(form, updateForm, exerciseIndex)
                            }
                        >
                            + Add Set
                        </button>
                    )}
                </div>
            ))}

            {/* ADD EXERCISE */}
            {mode === "edit" && (
                <button
                    type="button"
                    className="text-sm text-primary-red-one hover:opacity-80 font-medium"
                    onClick={() => addExercise(form, updateForm)}
                >
                    + Add Exercise
                </button>
            )}
        </div>
    );
}

export default Weightlifting;