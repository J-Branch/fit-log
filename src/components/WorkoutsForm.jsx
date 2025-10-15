import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import { useSubmitWorkout } from "../hooks/workouts/useSubmitWorkout";

export function WorkoutsForm({ onWorkoutSubmit, user }) {
    const { form, updateForm } = useWorkoutForm();
    const { submitStatus, handleSubmit } = useSubmitWorkout({ form, onSuccess: onWorkoutSubmit });

    function handleAddExercise() {
        updateForm(["exercises"], [
            ...form.exercises,
            { name: "", sets: [{ setCounter: "", reps: "", weight:"" }] },
        ]);
    }

    function handleAddSet(exerciseIndex) {
        const currentSets = form.exercises[exerciseIndex].sets;
        updateForm(["exercises", exerciseIndex, "sets"], [
            ...currentSets,
            { setCounter: currentSets.length + 1, reps: "", weight: ""},
        ]);
    }

    function handleRemoveExercise(exerciseIndex) {
        updateForm(
            ["exercises"],
            form.exercises.filter((_, i) => i !== exerciseIndex)
        );
    }

    function handleRemoveSet(exerciseIndex, setIndex) {
        const newSets = form.exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
        updateForm(["exercises", exerciseIndex, "sets"], newSets);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Workout Name</label><br/>
            <input
                type="text"
                value={form.workoutName}
                onChange={(e) => updateForm(["workoutName"], e.target.value)}
            ></input><br/>

            <label>Workout Type</label><br/>
            <select 
                value={form.workoutType}
                onChange={(e) => updateForm(["workoutType"], e.target.value)}
            >
                <option value="">--- Select ---</option>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Distance/Time">Distance/Time</option>
            </select><br/>

            <label>Date</label><br />
            <input 
                type="number"
                placeholder="Month"
                value={form.date.month}
                onChange={(e) => updateForm(["date", "month"], e.target.value)}
            />
            <input 
                type="number"
                placeholder="Day"
                value={form.date.day}
                onChange={(e) => updateForm(["date", "day"], e.target.value)}
            />
            <input 
                type="number"
                placeholder="Year"
                value={form.date.year}
                onChange={(e) => updateForm(["date", "year"], e.target.value)}
            /><br /><br />

            {form.workoutType === "Distance/Time" && (
                <>
                    <label>Distance (miles)</label><br />
                    <input 
                        type="number"
                        step=".01"
                        value={form.distance}
                        onChange={(e) => updateForm(["distance"], e.target.value)}
                    /><br /><br />

                    <label>Duration</label><br />
                    <input 
                        type="number"
                        placeholder="Minutes"
                        value={form.time.minutes}
                        onChange={(e) => updateForm(["time", "minutes"], e.target.value)}
                    />
                    <input 
                        type="number"
                        placeholder="Seconds"
                        value={form.time.seconds}
                        onChange={(e) => updateForm(["time", "seconds"], e.target.value)}
                    /><br /><br />
                </>
            )}

            {form.workoutType === "Weightlifting" && (
                <>
                    <h3>Exercises</h3>
                    {form.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                            <label>Exercise Name</label><br />
                            <input 
                                type="text"
                                value={exercise.name}
                                onChange={(e) =>
                                    updateForm(["exercises", exerciseIndex, "name"], e.target.value)
                                }
                            /><br /><br />

                            {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex} style={{ marginLeft: "20px"}}>
                                    <label>Set {setIndex + 1}</label><br />
                                    <input 
                                        type="number"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChange={(e) =>
                                            updateForm(["exercises", exerciseIndex, "sets", setIndex, "reps"], e.target.value)
                                        }
                                    />
                                    <input 
                                        type="number"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChange={(e) =>
                                            updateForm(["exercises", exerciseIndex, "sets", setIndex, "weight"], e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                                    >
                                        Remove Set
                                    </button>
                                    <br /><br />
                                </div>
                            ))} 

                            <button type="button" onClick={() => handleAddSet(exerciseIndex)}>
                                ➕ Add Set
                            </button><br />
                            <button type="button" onClick={() => handleRemoveExercise(exerciseIndex)}>
                                ❌ Remove Exercise
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={handleAddExercise}>
                        ➕ Add Exercise
                    </button><br /><br />
                </>
            )}


            <button type="submit" disabled={submitStatus === "PENDING"}>
                {submitStatus === "PENDING" ? "Saving..." : "Complete Workout"}
            </button>
        </form>
    );
}

export default WorkoutsForm;