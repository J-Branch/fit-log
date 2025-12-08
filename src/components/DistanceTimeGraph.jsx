import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo, useEffect } from 'react';
import { useUniqueWorkoutNames } from '../hooks/useAnalyticsHooks';
import { filterWorkoutsByDateRange, getPercentageGrowth } from '../utils/analytics';

function DistanceTimeGraph({ workouts }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [distOrTime, setDistOrTime] = useState('');
    const [selectedRange, setSelectedRange] = useState('all');
    const [graphName, setGraphName] = useState('Total Distance');

    const workoutOptions = useUniqueWorkoutNames(workouts);

    useEffect(() => {
        if (distOrTime === 'distTotal') {
            setGraphName('Total Distance');
        }
        if (distOrTime === 'mileTime') {
            setGraphName('Average Mile Time');
        }
    }, [distOrTime]);

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

    const percentageGrowth = useMemo(() => {
        return getPercentageGrowth(chartData);
    }, [chartData]);

    return (
        <div className="bg-primary-black">
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

            {percentageGrowth !== null && (
            <div style={{ margin: '0.5rem 0', fontWeight: 'bold', color: percentageGrowth > 0 ? 'green' : '#800020' }}>
                Growth: {percentageGrowth > 0 ? '+' : ''}{percentageGrowth}% {percentageGrowth > 0 ? '📈' : '📉'}
            </div>
            )}

            <br />
            <div className="h-96">
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
                            name={graphName}
                            stroke="#972D43"
                            activeDot={{ r:8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DistanceTimeGraph;