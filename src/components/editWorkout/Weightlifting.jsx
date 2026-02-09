import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";
import { Form } from "react-router-dom";

function Weightlifting({form, updateForm, mode}) {
    return (
        <>
            <Form method="post">
                <div className="space-y-4">
                    {form.exercises.map((exercise, exerciseIndex) => (
                        <div key={exercise.$id ?? `new-ex-${exerciseIndex}`} className="border p-4 rounded space-y-3">
                            <div className="flex justify-between">
                                {mode === "edit" ? (
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="checkbox"
                                            onClick={(e) => {
                                                toggleDelete();
                                            }} 
                                        />
                                        <input
                                            className="border p=2 font-semibold"
                                            value={exercise.exerciseName}
                                            onChange={(e) => {
                                                updateForm(["exercises", exerciseIndex, "exerciseName"], e.target.value);
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
                    value={JSON.stringify(form)}
                />
            </Form>
        </>
    );
}

export default Weightlifting