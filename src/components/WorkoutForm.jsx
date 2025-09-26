import { useState } from 'react';
import { ID } from "appwrite";
import { setUserWorkouts, setUserExercises, setUserSets } from '../api/appwrite.workout.js'

// SubmitWorkout - From WorkoutPage
function WorkoutForm({ userId, onWorkoutSubmit }) {
    // For both workouts
    const [workoutName, setWorkoutName] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    // For distance/time workouts
    const [distance, setDistance] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    // For weightlifting workouts
    const [set, setSet] = useState({ setCounter: '', reps: '', weight: '' })
    const [exercise, setExercise] = useState({ name: '', sets: [] });
    const [exercises, setExercises] = useState([]);

    function handleAddSet() {
        alert("Set Added!");
        // Add set to exercise
        const updatedSets = [ ...exercise.sets, set ];
        setExercise(prev => ({
            ...prev,
            sets: updatedSets
        }));
    }

    function handleAddExercise() {
        alert("Exercise Added!");
        // Adds exercise to exercises
        setExercises([...exercises, exercise]);
        // Resets exercise
        setExercise(prev => ({
            ...prev,
            name: '',
            sets: []
        }));
        // Resets set
        setSet(prev => ({
            ...prev,
            setCounter: '',
            reps: '',
            weight: ''
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Submit button pressed");
        // Saves time in seconds
        const newTime = Number(minutes * 60) + Number(seconds);
        // Creates the date data
        const workoutDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        // Creates unique ID for wid
        const wid = ID.unique();

        await setUserWorkouts(
            userId,
            workoutName,
            workoutType,
            workoutDate,
            newTime,
            Number(distance),
            wid
        );

        if (workoutType === "Weightlifting") {
            // Looping through each exercise
            for (const exercise of exercises) {
                const eid = await setUserExercises(
                    userId,
                    wid,
                    exercise.name
                );
                
                // Looping through each set
                for (const set of exercise.sets) {
                    await setUserSets(
                        userId,
                        wid,
                        eid,
                        set.setCounter,
                        set.reps,
                        set.weight
                    );
                }
            }
        };

        // Tell parent we submitted
        onWorkoutSubmit();

        // Reset form state
        setWorkoutName('');
        setWorkoutType('');
        setDistance('');
        setMinutes('');
        setSeconds('');
        setSet({ setCounter: 0, reps: 0, weight: 0 });
        setExercise({ name: '', sets: [] });
        setExercises([])
    }

    return (
        // Connect on submit to our handleSubmit function
        <form onSubmit={handleSubmit}>
            <label>Name of Workout</label><br/>
            <input type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} placeholder="Workout Name" required></input><br />

            <label>Workout Date</label><br />
            <input type="number" min="1" max="12" step="1" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="month" required ></input>
            <input type="number" min="1" max="31" step="1" value={day} onChange={(e) => setDay(e.target.value)} placeholder="day" required ></input>
            <input type="number" min="2000" max="2025" step="1" value={year} onChange={(e) => setYear(e.target.value)} placeholder="year" required ></input><br />

            <label>Choose Workout Type</label><br />
            <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} required>
                <option value="" disabled>-- Select Workout Type --</option>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Distance/Time">Distance/Time</option>
            </select> <br />

            {workoutType === 'Distance/Time' && (
                <>
                    <label>Distance (In Miles)</label><br />
                    <input type="number" min="0" step=".01" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Distance" required></input><br />

                    <label>Time Length of Workout</label><br />
                    <input type="number" min="0" step="1" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="minutes" required></input>
                    <input type="number" min="0" step="1" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="seconds" required></input>
                </>
            )}

            {workoutType === 'Weightlifting' && (
                <>
                    <label>Exercise Name:</label><br />
                    <input type="text" value={exercise.name} onChange={(e) => setExercise({ ...exercise, name: e.target.value })} placeholder="Exercise Name" required></input><br />

                    <label>Set Number:</label><br />
                    <input type="number" min="0" step="1" value={set.setCounter} onChange={(e) => setSet({ ...set, setCounter: parseInt(e.target.value) })} placeholder="Set Number" required></input><br />

                    <label>Reps and Weight:</label><br />
                    <input type="number" min="0" step="1" value={set.reps} onChange={(e) => setSet({ ...set, reps: parseInt(e.target.value) })} placeholder="Number of Reps" required></input>
                    <input type="number" min="0" step="1" value={set.weight} onChange={(e) => setSet({ ...set, weight: parseInt(e.target.value) })} placeholder="Weight" required></input><br />

                    <button type="button" onClick={handleAddSet}>Set Complete</button><br />
                    <button type="button" onClick={handleAddExercise}>Exercise Complete</button>
                </>
            )}
                    <br />
                    <button type="submit">Complete Workout</button>
        </form>
    )
}

export default WorkoutForm;