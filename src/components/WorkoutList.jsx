import { useState, useEffect } from 'react';
import { getUserWorkouts, getUserExercises, getUserSets } from '../api/appwrite.workout.js';

function WorkoutList({ userId }) {
    const [workoutList, setWorkoutList] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [setList, setSetList] = useState([]);
    const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
    const [expandedExerciseId, setExpandedExerciseId] = useState(null); 

    // Load workouts
    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const userWorkouts = (await getUserWorkouts(userId)).rows;
                setWorkoutList(userWorkouts);
            } catch (err) {
                console.error("Failed to fetch workouts:", err.message);
                setWorkoutList([]);
            }
        }
        fetchWorkouts();
    }, [userId]);

    // Load exercises
    useEffect(() => {
        async function fetchExercises() {
            try {
                const userExercises = await getUserExercises(userId);
                setExerciseList(userExercises);
            } catch (err) {
                console.error("Failed to fetch exercises:", err.message);
                setExerciseList([]);
            }
        }
        fetchExercises();
    }, [userId]);

    // Load sets
    useEffect(() => {
        async function fetchSets() {
            try {
                const userSets = await getUserSets(userId);
                setSetList(userSets);
            } catch (err) {
                console.error("Failed to fetch sets:", err.message);
                setSetList([]);
            }
        }
        fetchSets();
    }, [userId]);

    // Toggle workout visibility
    function showExercises(wid) {
        setExpandedWorkoutId(prev => (prev === wid ? null : wid));
    }

    // Toggle exercise visibility
    function showSets(eid) {
        setExpandedExerciseId(prev => (prev === eid ? null : eid));
    }

    // Utility to format seconds into MM:SS
    function formatSeconds(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <>
            <h2>--Previous Workouts--</h2>

            <ul>
                {workoutList.map(workout => (
                    <li key={workout.$id}><br />
                        <div>
                            <strong>{workout.workoutName}</strong><br />

                            {workout.workoutType === "Distance/Time" ? (
                                <div>
                                    Distance: {workout.distance} Miles <br />
                                    Time: {formatSeconds(workout.time)} <br />
                                </div>
                            ) : (
                                <>
                                    <button onClick={() => showExercises(workout.wid)}>
                                        {expandedWorkoutId === workout.wid ? 'Hide' : 'Show'} Exercises
                                    </button>

                                    {expandedWorkoutId === workout.wid && (
                                        <ul>
                                            {exerciseList
                                                .filter(exercise => exercise.wid === workout.wid) 
                                                .map(exercise => (
                                                    <li key={exercise.$id}><br />
                                                        <div>
                                                            {exercise.exerciseName} <br />
                                                            <button onClick={() => showSets(exercise.eid)}>
                                                                {expandedExerciseId === exercise.eid ? 'Hide' : 'Show'} Sets
                                                            </button>

                                                            {expandedExerciseId === exercise.eid && (
                                                                <ul>
                                                                    {setList
                                                                        .filter(set => set.eid === exercise.eid)
                                                                        .map(set => (
                                                                            <li key={set.$id}><br />
                                                                                <div>
                                                                                    Set: {set.setCounter} <br />
                                                                                    Reps: {set.reps} <br />
                                                                                    Weight: {set.weight}
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default WorkoutList;
