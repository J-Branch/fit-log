import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";
import { Form } from "react-router-dom";
import { useState } from "react";
import { produce } from "immer";

function Weightlifting({form, updateForm, mode}) {

    // tracking what in the ui the user has selected, only deletes
    const [uiSelection, setUiSelection] = useState({
        exercises: {},
        sets: {}
    });

    // if exercise checkbox is toggled add to exrcises set. will be set to true or false
    function toggleExerciseUI(exercise) {
        setUiSelection(prev => {
            const newValue = !prev.exercises[exercise.$id];

            const updated = {
                ...prev,
                exercises: {
                    ...prev.exercises,
                    [exercise.$id]: newValue
                },
                sets: {...prev.sets}
            };

            exercise.sets.forEach(set => {
                updated.sets[set.$id] = newValue;
            });

            return updated;
        });
    }

    // if set checkbox is toggles add to sets set. will be set true or false
    function toggleSetUI(set) {
        setUiSelection(prev => ({
            ...prev,
            sets: {
                ...prev.sets,
                [set.$id]: !prev.sets[set.$id]
            }
        }));
    }

    // go through and compare ui deletes to the form and mark them for deletion
    function prepareFormDeletes(form, uiSelection) {
        return produce(form, draft => {
            for (const exercise of draft.exercises) {
                const exerciseSelected = !!uiSelection.exercises[exercise.$id];
                
                // exercise is marked for delete
                if (exerciseSelected) {
                    exercise.toDelete = true;

                    // make sure every set in the exercise is not marked for delete
                    for ( const set of exercise.sets) {
                        set.toDelete = false;
                    }
                } else {
                    // this means the exercise of the set is not marked for deletion
                    for ( const set of exercise.sets) {
                        set.toDelete = !!uiSelection.sets[set.$id];
                    }
                }
            }
        });
    }

    const finalForm = prepareFormDeletes(form, uiSelection);

    return (
        <>
            <Form method="post">
                <div className="space-y-4">
                    {form.exercises.map((exercise, exerciseIndex) => (
                        <div key={exercise.$id ?? `new-ex-${exerciseIndex}`} className="border p-4 rounded space-y-3">
                            <div className="flex justify-between">
                                {mode === "edit" ? (
                                    <div className="flex items-center space-x-4">
                                        {exercise.$id && (
                                            <input
                                                type="checkbox"
                                                checked={!!uiSelection.exercises[exercise.$id]}
                                                onChange={() => toggleExerciseUI(exercise)}
                                            />
                                        )}
                                        
                                        <input
                                            className="border p=2 font-semibold"
                                            value={exercise.exerciseName}
                                            onChange={(e) => {
                                                updateForm(["exercises", exerciseIndex, "exerciseName"], e.target.value);
                                            }} 
                                            onBlur={(e) => {
                                                console.log("I am setting the update flag");
                                                updateForm(["exercises", exerciseIndex, "isDirty"], true);
                                            }}
                                        />

                                    </div>
                                ) : (
                                    <h2 className="text-lg font-semibold">{exercise.exerciseName}</h2>
                                )}

                                {mode === "edit" && !exercise.$id && (
                                    <button 
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => removeExercise(form, updateForm, exerciseIndex)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2">
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={set.$id ?? `new-set-${setIndex}`} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                        {mode === "edit" ? (
                                            <div className="flex gap-3">
                                                {set.$id && (
                                                    <input
                                                        type="checkbox"
                                                        checked={!!uiSelection.sets[set.$id]}
                                                        onChange={() => toggleSetUI(set)}
                                                    />
                                                )}
                                            
                                                <input
                                                    type="number"
                                                    className="border p-1 w-20"
                                                    value={set.reps}
                                                    onChange={(e) =>
                                                        updateForm(
                                                            [
                                                                "exercises",
                                                                exerciseIndex,
                                                                "sets",
                                                                setIndex,
                                                                "reps",
                                                            ],
                                                            e.target.value
                                                        )
                                                    }

                                                    onBlur={(e) => {
                                                        console.log("i am setting the flag for reps");
                                                        updateForm(
                                                            [
                                                                "exercises",
                                                                exerciseIndex,
                                                                "sets",
                                                                setIndex,
                                                                "isDirty",
                                                            ],
                                                            true
                                                        )
                                                    }}
                                                />
                                                <input
                                                    type="number"
                                                    className="border p-1 w-20"
                                                    value={set.weight}
                                                    onChange={(e) =>
                                                        updateForm(
                                                            [
                                                                "exercises",
                                                                exerciseIndex,
                                                                "sets",
                                                                setIndex,
                                                                "weight",
                                                            ],
                                                            e.target.value
                                                        )
                                                    }

                                                    onBlur={(e) => {
                                                        console.log("i am setting the flag for weight");
                                                        updateForm(
                                                            [
                                                                "exercises",
                                                                exerciseIndex,
                                                                "sets",
                                                                setIndex,
                                                                "isDirty",
                                                            ],
                                                            true
                                                        )
                                                    }}
                                                />
                                                
                                            </div>
                                        ): (
                                            <span>
                                                Set {setIndex + 1}: {set.reps} reps ×{" "}
                                                {set.weight} lbs
                                            </span>
                                        )}

                                        {mode === "edit" && !set.$id && (
                                            <button 
                                                type="button"
                                                className="text-red-500"
                                                onClick={() => removeSet(form, updateForm, exerciseIndex, setIndex)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {mode === "edit" && (
                                <button
                                    type="button"
                                    className="text-blue-500"
                                    onClick={() => addSet(form, updateForm, exerciseIndex)}
                                >
                                    + Add Set
                                </button>
                            )}
                        </div> 
                    ))}

                    {mode === "edit" && (
                        <>
                            <button
                                type="button"
                                className="text-green-600"
                                onClick={() => addExercise(form, updateForm)}
                            >
                                + Add Exercise  
                            </button>
                        </>
                    )}
                </div>

                <input
                    type="hidden"
                    name="payload"
                    value={JSON.stringify(finalForm)}
                />
            </Form>
        </>
    );
}

export default Weightlifting