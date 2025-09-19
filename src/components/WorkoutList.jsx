import { useState } from 'react';
import { getUserWorkouts, getUserExercises, getUserSets } from '../api/appwrite.workout.js'
import { useEffect } from 'react';

// COULD POTENTIALLY ADD EDIT/DELETE FOR THE WORKOUTS, EXERCISES, AND SETS

function WorkoutList({ userId }) {
    const [workoutList, setWorkoutList] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [setList, setSetList] = useState([]);
    const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
    const [expandedExerciseId, setExpandedExerciseId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const userWorkouts = await getUserWorkouts(userId);
            setWorkoutList(userWorkouts);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const userExercises = await getUserExercises(userId);
            setExerciseList(userExercises);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const userSets = await getUserSets(userId);
            setSetList(userSets);
        }

        fetchData();
    }, []);

    function showExercises(workoutId) {
        if (expandedWorkoutId === workoutId) {
            setExpandedWorkoutId(null);
        } else {
            setExpandedWorkoutId(workoutId);
        }
    }

    function showSets(exerciseId) {
        if (expandedExerciseId === exerciseId) {
            setExpandedExerciseId(null);
        } else {
            setExpandedExerciseId(exerciseId);
        }
    }

    function formatSeconds(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    // Should return a display of all the users workouts
    return (
        <>
            <h2>--Previous Workouts--</h2> <br />
            
            <ul>
                {/* Displays each workout */}
                {workoutList.map(workout => (
                    <li key={workout.$id}> <br />
                        <div>
                            <strong>{workout.workoutName}</strong> <br />

                            {workout.workoutType === "Distance/Time" ? (
                                <div>
                                    Distance: {workout.distance} meters <br />
                                    Time: {formatSeconds(workout.time)} <br />
                                </div>
                            ) : (
                                <>
                                    <button onClick={() => showExercises(workout.$id)}>
                                        {expandedWorkoutId === workout.$id ? 'Hide' : 'Show'} Exercises
                                    </button>

                                    {expandedWorkoutId === workout.$id && (
                                        <ul>
                                            {exerciseList
                                                .filter(exercise => exercise.workoutId === workout.$id)
                                                .map(exercise => (
                                                    <li key={exercise.$id}> <br />
                                                        <div>
                                                            {exercise.exerciseName}

                                                            <button onClick={() => showSets(exercise.$id)}>
                                                                {expandedExerciseId === exercise.$id ? 'Hide' : 'Show'} Sets
                                                            </button>

                                                            {expandedExerciseId === exercise.$id && (
                                                                <ul>
                                                                    {setList
                                                                        .filter(set => set.exerciseId === exercise.$id)
                                                                        .map(set => (
                                                                            <li key={set.$id}> <br />
                                                                                <div>
                                                                                    Set: {set.setCounter} <br />
                                                                                    Reps: {set.reps} <br />
                                                                                    Weight: {set.weight}
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default WorkoutList;