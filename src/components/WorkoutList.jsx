import { useState } from 'react';
import { useWorkoutContext } from "../context/workout.context";

function WorkoutList() {
    const{ userWorkouts, userExercises, userSets } = useWorkoutContext();
    const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);

    const [expandedExercises, setExpandedExercises] = useState({});

    // Toggle workout visibility
    function showExercises(wid) {
        setExpandedWorkoutId(prev => (prev === wid ? null : wid));
    }

    function showSets(workoutId, exerciseId) {
        setExpandedExercises(prev => ({
            ...prev,
            [workoutId]: prev[workoutId] === exerciseId ? null : exerciseId
        }));
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
                {userWorkouts.map(workout => (
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
                                    <button onClick={() => showExercises(workout.$id)}>
                                        {expandedWorkoutId === workout.$id ? 'Hide' : 'Show'} Exercises
                                    </button>

                                    {expandedWorkoutId === workout.$id && (
                                        <ul>
                                            {userExercises
                                                .filter(exercise => exercise.wid === workout.$id) 
                                                .map(exercise => (
                                                    <li key={exercise.$id}><br />
                                                        <div>
                                                            {exercise.exerciseName} <br />
                                                            <button onClick={() => showSets(workout.$id, exercise.$id)}>
                                                                {expandedExercises[workout.$id] === exercise.$id ? 'Hide' : 'Show'} Sets
                                                            </button>

                                                            {expandedExercises[workout.$id] === exercise.$id && (
                                                                <ul>
                                                                    {userSets
                                                                        .filter(set => set.eid === exercise.$id)
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
