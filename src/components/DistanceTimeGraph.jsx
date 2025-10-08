import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useUniqueWorkoutNames } from '../hooks/useAnalyticsHooks';

function DistanceTimeGraph({ workouts }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [distOrTime, setDistOrTime] = useState('');

    const workoutOptions = useUniqueWorkoutNames(workouts);

    // Turns data into (chartData) which will be accepted by recharts
    const chartData = useMemo(() => {
        let filtered = workouts;

        // Filter by specified workout
        if (workoutVariety === 'specific' && selectedWorkout) {
            filtered = workouts.filter(w => w.workoutName === selectedWorkout);
        }

        // Transforms for chart into {date, value}
        return filtered.map(w => {
            const paceInMinutes = (w.time / 60) / w.distance;
            return {
                date: new Date(w.date).toLocaleDateString(),
                value: distOrTime === 'distTotal'
                    ? w.distance
                    : Number(paceInMinutes.toFixed(2)),
            };
        });

    }, [workouts, workoutVariety, selectedWorkout, distOrTime]);

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