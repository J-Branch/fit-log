import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useUniqueWorkoutNames } from '../hooks/useAnalyticsHooks';
import { filterWorkoutsByDateRange } from '../utils/analytics';

function DistanceTimeGraph({ workouts }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [distOrTime, setDistOrTime] = useState('');
    const [selectedRange, setSelectedRange] = useState('all');

    const workoutOptions = useUniqueWorkoutNames(workouts);

    // Turns data into (chartData) which will be accepted by recharts
    const chartData = useMemo(() => {
        let filteredWorkouts = filterWorkoutsByDateRange(workouts, selectedRange);

        // Filter by specified workout
        if (workoutVariety === 'specific' && selectedWorkout) {
            filteredWorkouts = filteredWorkouts.filter(w => w.workoutName === selectedWorkout);
        }

        // Transforms for chart into {date, value}
        const chartDataArray = filteredWorkouts.map(w => {
            const paceInMinutes = (w.time / 60) / w.distance;
            return {
                date: new Date(w.date + 'T12:00:00').toLocaleDateString(),
                value: distOrTime === 'distTotal'
                    ? w.distance
                    : Number(paceInMinutes.toFixed(2)),
            };
        });

        return chartDataArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [workouts, workoutVariety, selectedWorkout, distOrTime, selectedRange]);

    return (
        <>
            <label>Workout Variety:</label>
            <select value={workoutVariety} onChange={(e) => setWorkoutVariety(e.target.value)}>
                <option value="all">All Workouts</option>
                <option value="specific">Specific Workouts</option>
            </select>

            {workoutVariety === 'specific' && (
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

            <label>Select Y Value:</label>
            <select value={distOrTime} onChange={(e) => setDistOrTime(e.target.value)}>
                <option value="distTotal">Total Distance</option>
                <option value="mileTime">Average Mile Time</option>
            </select>
            
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

export default DistanceTimeGraph;