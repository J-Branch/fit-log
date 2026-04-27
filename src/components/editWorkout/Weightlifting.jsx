import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";

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

    function safeNumberUpdate(updateForm, path, value) {
        updateForm(["isDirty"], true);
        updateForm(path, value === "" ? "" : Number(value));
    }

    return (
        <div className="space-y-10">

            {/* HEADER */}
            {mode !== "edit" && (
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        🏋️ Exercises
                    </h3>
                    <span className="text-sm text-gray-400">
                        {form.exercises.length} total
                    </span>
                </div>
            )}

            {/* EMPTY STATE */}
            {form.exercises.length === 0 && mode !== "edit" && (
                <div className="text-center text-gray-400 text-sm py-6">
                    No exercises added yet
                </div>
            )}

            {form.exercises.map((exercise, exerciseIndex) => {

                const totalReps = exercise.sets.reduce(
                    (acc, s) => acc + Number(s.reps || 0),
                    0
                );

                const totalVolume = exercise.sets.reduce(
                    (acc, s) =>
                        acc +
                        (Number(s.reps || 0) * Number(s.weight || 0)),
                    0
                );

                return (
                    <div
                        key={exercise.$id ?? `new-ex-${exerciseIndex}`}
                        className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
                    >

                        {/* HEADER */}
                        <div className="flex justify-between items-start gap-4">

                            <div className="flex items-start gap-3 w-full">

                                {mode === "edit" && exercise.$id && (
                                    <input
                                        type="checkbox"
                                        className="accent-primary-red-one w-4 h-4 mt-2"
                                        checked={!!uiSelection.exercises[exercise.$id]}
                                        onChange={() => toggleExerciseUI(exercise)}
                                    />
                                )}

                                <div className="w-full space-y-1">

                                    {mode === "edit" ? (
                                        <input
                                            className="w-full px-3 py-2 text-sm font-semibold border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-red-one/50 shadow-sm"
                                            value={exercise.exerciseName}
                                            onChange={(e) =>
                                                updateForm(
                                                    ["exercises", exerciseIndex, "exerciseName"],
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        <>
                                            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                                                {exercise.exerciseName}
                                            </h2>

                                            {/* SUMMARY */}
                                            <div className="flex gap-6 text-sm text-gray-600 mt-2">
                                                <span>
                                                    <span className="font-semibold text-gray-900">
                                                        {exercise.sets.length}
                                                    </span>{" "}
                                                    sets
                                                </span>

                                                <span>
                                                    <span className="font-semibold text-gray-900">
                                                        {totalReps}
                                                    </span>{" "}
                                                    reps
                                                </span>

                                                <span>
                                                    <span className="font-semibold text-primary-red-one">
                                                        {totalVolume}
                                                    </span>{" "}
                                                    lbs
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {mode === "edit" && !exercise.$id && (
                                <button
                                    className="text-xs text-red-500 hover:text-red-700"
                                    onClick={() =>
                                        removeExercise(form, updateForm, exerciseIndex)
                                    }
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        {/* SETS */}
                        <div className="bg-gray-50 rounded-xl p-3 space-y-2">

                            {exercise.sets.map((set, setIndex) => (
                                <div
                                    key={set.$id ?? `new-set-${setIndex}`}
                                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 w-full">

                                        {mode === "edit" && set.$id && (
                                            <input
                                                type="checkbox"
                                                className="accent-primary-red-one w-4 h-4"
                                                checked={!!uiSelection.sets[set.$id]}
                                                onChange={() => toggleSetUI(set)}
                                            />
                                        )}

                                        {mode === "edit" ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="Reps"
                                                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
                                                    value={set.reps}
                                                    onChange={(e) =>
                                                        safeNumberUpdate(
                                                            updateForm,
                                                            ["exercises", exerciseIndex, "sets", setIndex, "reps"],
                                                            e.target.value
                                                        )
                                                        // updateForm(
                                                        //     ["exercises", exerciseIndex, "sets", setIndex, "reps"],
                                                        //     e.target.value
                                                        // )
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Weight"
                                                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red-one/50"
                                                    value={set.weight}
                                                    onChange={(e) =>
                                                        safeNumberUpdate(
                                                            updateForm,
                                                            ["exercises", exerciseIndex, "sets", setIndex, "weight"],
                                                            e.target.value
                                                        )
                                                        // updateForm(
                                                        //     ["exercises", exerciseIndex, "sets", setIndex, "weight"],
                                                        //     e.target.value
                                                        // )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-sm text-gray-500">
                                                    Set {setIndex + 1}
                                                </span>

                                                <div className="flex items-center gap-4 text-sm font-medium text-gray-900">
                                                    <span>{set.reps} reps</span>
                                                    <span className="text-gray-300">×</span>
                                                    <span>{set.weight} lbs</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {mode === "edit" && !set.$id && (
                                        <button
                                            className="text-xs text-red-500"
                                            onClick={() =>
                                                removeSet(form, updateForm, exerciseIndex, setIndex)
                                            }
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {mode === "edit" && (
                            <button
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary-red-one hover:gap-2 transition-all"
                                onClick={() => addSet(form, updateForm, exerciseIndex)}
                            >
                                + Add Set
                            </button>
                        )}
                    </div>
                );
            })}

            {mode === "edit" && (
                <button
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-red-one hover:gap-2 transition-all"
                    onClick={() => addExercise(form, updateForm)}
                >
                    + Add Exercise
                </button>
            )}
        </div>
    );
}

export default Weightlifting;