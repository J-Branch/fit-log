import { useWorkoutForm } from "../hooks/workouts/useWorkoutForm";
import { useSubmitWorkout } from "../hooks/workouts/useSubmitWorkout";
import { Link } from "react-router-dom";
import { addExercise, addSet, removeExercise, removeSet } from "../utils/workoutHandlers";

function CreateWorkout() {
    const { form, updateForm } = useWorkoutForm();

    const { workoutSubmitStatus, onWorkoutSubmit } = useSubmitWorkout({
        form
    });


    return (
        // <div className="min-h-screen px-8 pb-16 bg-white md:w-3/4 md:ml-auto md:pr-0 md:pl-16 md:pb-24">
            <div>
                <h1 className="my-8 text-2xl font-semibold text-red-900">
                    Workout
                </h1>
                <Link
                    className="text-sm transition-all duration-150 text-red-900/50 hover:text-red-900"
                    to="/workouts"
                    >
                        Back To Workouts
                </Link>

                <form onSubmit={onWorkoutSubmit}>
                    <div>
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
                                /><br/><br />

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
                                /><br/><br />
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
                                            <div key={setIndex} style={{ margin: "20px"}}>
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
                                                <button onClick={() => removeSet(form, updateForm, exerciseIndex, setIndex)}>
                                                    Remove Set
                                                </button>
                                                <br /><br />
                                            </div>
                                        ))}

                                        <button type="button" onClick={() => addSet(form, updateForm, exerciseIndex)}>
                                            ➕ Add Set
                                        </button><br />
                                        <button type="button" onClick={() => removeExercise(form, updateForm, exerciseIndex)}>
                                            ❌ Remove Exercise
                                        </button>
                                    </div>
                                ))}

                                <button type="button" onClick={() => addExercise(form, updateForm)}>
                                    ➕ Add Exercise
                                </button><br /><br />
                            </>
                        )}

                        <button type="submit" disabled={workoutSubmitStatus === "PENDING"}>
                            {workoutSubmitStatus === "PENDING" ? "Saving..." : "Complete Workout"}
                        </button>
                    </div>
                </form>
            </div>
        // </div>
    );
}

export default CreateWorkout;