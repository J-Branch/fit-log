import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useUniqueWorkoutNames, useUniqueExerciseNames } from '../hooks/useAnalyticsHooks';
import { getWorkoutTotal } from '../utils/analytics'

function WeightliftingGraph({ workouts, exercises, sets }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');

    const workoutOptions = useUniqueWorkoutNames(workouts);
    const exerciseOptions = useUniqueExerciseNames(exercises);
    
    // Turns data into (chartData) which will be accepted by recharts
    const chartData = useMemo(() => {
        let filteredWorkouts = workouts;
        let filteredExercises = exercises;

        // For all workouts
        if (workoutVariety === 'all') {
            return workouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises, sets });
                return { date, value: total };
            });
        }

        // Filters and loops through specified workout
        if (workoutVariety === 'specificWorkout' && selectedWorkout) {
            filteredWorkouts = workouts.filter(w => w.workoutName === selectedWorkout);

            return filteredWorkouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises, sets });
                return { date, value: total };
            });
        }

        // Filters and loops through specified exercise
        if (workoutVariety === 'specificExercise' && selectedExercise) {
            filteredExercises = exercises.filter(e => e.exerciseName === selectedExercise);

            return workouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises: filteredExercises, sets});
                return { date, value: total };
            });
        }
        return [];
    }, [workouts, exercises, sets, workoutVariety, selectedWorkout, selectedExercise]);

    return (
        <>
            <label>Workout Variety:</label>
            <select value={workoutVariety} onChange={(e) => setWorkoutVariety(e.target.value)}>
                <option value="all">All Workouts</option>
                <option value="specificWorkout">Specific Workouts</option>
                <option value="specificExercise">Specific Exercises</option>
            </select>

            {workoutVariety === 'specificWorkout' && (
                <>
                    <label>Specific Workout:</label>
                    <select value={selectedWorkout} onChange={(e) => setSelectedWorkout(e.target.value)}>
                        <option value="" disabled>-- Select Specific Workout --</option>
                        {workoutOptions.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </>
            )}

            {workoutVariety === 'specificExercise' && (
                <>
                    <label>Specific Exercise:</label>
                    <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
                        <option value="" disabled>-- Select Specific Exercise --</option>
                        {exerciseOptions.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </>
            )}

            <br />

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r:8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default WeightliftingGraph;