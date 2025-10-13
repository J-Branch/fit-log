import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useUniqueWorkoutNames, useUniqueExerciseNames } from '../hooks/useAnalyticsHooks';
import { getWorkoutTotal, filterWorkoutsByDateRange } from '../utils/analytics'

function WeightliftingGraph({ workouts, exercises, sets }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedRange, setSelectedRange] = useState('all');

    const workoutOptions = useUniqueWorkoutNames(workouts);
    const exerciseOptions = useUniqueExerciseNames(exercises);

    
    // Turns data into (chartData) which will be accepted by recharts
    const chartData = useMemo(() => {
        let filteredWorkouts = filterWorkoutsByDateRange(workouts, selectedRange);
        let filteredExercises = exercises;
        let chartDataArray = [];

        // For all workouts
        if (workoutVariety === 'all') {
            chartDataArray = filteredWorkouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises, sets });
                return { date, value: total };
            });
        }

        // Filters and loops through specified workout
        if (workoutVariety === 'specificWorkout' && selectedWorkout) {
            const specificWorkout = filteredWorkouts.filter(w => w.workoutName === selectedWorkout);

            chartDataArray = specificWorkout.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises, sets });
                return { date, value: total };
            });
        }

        // Filters and loops through specified exercise
        if (workoutVariety === 'specificExercise' && selectedExercise) {
            filteredExercises = exercises.filter(e => e.exerciseName === selectedExercise);

            chartDataArray = filteredWorkouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout, exercises: filteredExercises, sets});
                return { date, value: total };
            });
        }

        return chartDataArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [workouts, exercises, sets, workoutVariety, selectedWorkout, selectedExercise, selectedRange]);

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

            <label>Time Range:</label>
            <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
                <option value="all">All Time</option>
                <option value="1m">1 Month</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
            </select>

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