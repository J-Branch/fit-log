import { addExercise, addSet, removeExercise, removeSet } from "../../utils/workoutHandlers";
import { Form } from "react-router-dom";

function Weightlifting({form, updateForm, isEditing, toUpArr, toDelArr}) {
    return (
        <>
            <Form method="post">
                <div className="space-y-4">
                    {form.exercises.map((exercise, exerciseIndex) => (
                        <div key={exercise.$id ?? `new-ex-${exerciseIndex}`} className="border p-4 rounded space-y-3">
                            <div className="flex justify-between">
                                {isEditing ? (
                                    <input
                                        className="border p=2 font-semibold"
                                        value={exercise.name}
                                        onChange={(e) => {
                                            updateForm(["exercises", exerciseIndex, "name"], e.target.value);
                                            toUpArr({...exercise, name: e.target.value})
                                        }} 
                                    />
                                ) : (
                                    <h2 className="text-lg font-semibold">{exercise.name}</h2>
                                )}

                                {isEditing && (
                                    <button className="text-red-500" onClick={() => removeExercise(form, updateForm, exerciseIndex)}>
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2">
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={set.$id ?? `new-set-${setIndex}`} className="flex items-center justify-between bg-gray-100 p-2 rounded">
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
                                                <button
                                                    className="text-red-500"
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
                                            </div>
                                        ): (
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
                                    onClick={() => addSet(form, updateForm, exerciseIndex)}
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
                                onClick={() => addExercise(form, updateForm)}
                            >
                                + Add Exercise  
                            </button>
                        </>
                    )}
                </div>
            </Form>
        </>
    );
}

export default Weightlifting