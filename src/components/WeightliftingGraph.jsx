import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';
import { useUniqueWorkoutNames, useUniqueExerciseNames } from '../hooks/useAnalyticsHooks';
import { getWorkoutTotal, getExerciseTotal, filterWorkoutsByDateRange, getPercentageGrowth } from '../utils/analytics';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-3 border border-slate-200 shadow-xl rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-red-one" />
                    <p className="text-sm font-extrabold text-slate-800">
                        {payload[0].value.toLocaleString()} 
                        <span className="ml-1 text-[10px] text-slate-500 uppercase font-medium">lbs</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

function WeightliftingGraph({ workouts, exercises }) {
    const [workoutVariety, setWorkoutVariety] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const selectedRange = '1m'; // Fixed per backend constraints

    const workoutOptions = useUniqueWorkoutNames(workouts);
    const exerciseOptions = useUniqueExerciseNames(exercises);

    const chartData = useMemo(() => {
        let chartDataArray = [];

        if (workoutVariety === 'all') {
            const filteredWorkouts = filterWorkoutsByDateRange(workouts, selectedRange);
            chartDataArray = filteredWorkouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout });
                return { date, value: total };
            });
        } 
        
        else if (workoutVariety === 'specificWorkout' && selectedWorkout) {
            const filteredWorkouts = filterWorkoutsByDateRange(workouts, selectedRange)
                .filter(w => w.workoutName === selectedWorkout);
            
            chartDataArray = filteredWorkouts.map(workout => {
                const { date, total } = getWorkoutTotal({ workout });
                return { date, value: total };
            });
        } 
        
        else if (workoutVariety === 'specificExercise' && selectedExercise) {
            const rangedWorkouts = filterWorkoutsByDateRange(workouts, selectedRange);
            const matchingExerciseLogs = exercises.filter(ex => ex.exerciseName === selectedExercise);
        
            chartDataArray = rangedWorkouts.map(workout => {
                const exercisesInThisWorkout = matchingExerciseLogs.filter(ex => ex.wid === workout.$id);
        
                const { total } = getExerciseTotal({ 
                    workout, 
                    exercises: exercisesInThisWorkout 
                });
        
                return { 
                    date: workout.date, 
                    value: total 
                };
            }).filter(point => point.value > 0);
        }

        return chartDataArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [workouts, exercises, workoutVariety, selectedWorkout, selectedExercise]);

    const percentageGrowth = useMemo(() => getPercentageGrowth(chartData), [chartData]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">View By</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'specificWorkout', label: 'Workouts' },
                            { id: 'specificExercise', label: 'Exercises' }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setWorkoutVariety(option.id)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    workoutVariety === option.id
                                        ? 'bg-white text-primary-red-one shadow-sm border border-slate-200'
                                        : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {workoutVariety === 'specificWorkout' && (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-left-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Workout</label>
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-red-one/20 outline-none"
                            value={selectedWorkout} 
                            onChange={(e) => setSelectedWorkout(e.target.value)}
                        >
                            <option value="" disabled>-- Select --</option>
                            {workoutOptions.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                )}

                {workoutVariety === 'specificExercise' && (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-left-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Exercise</label>
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-red-one/20 outline-none"
                            value={selectedExercise} 
                            onChange={(e) => setSelectedExercise(e.target.value)}
                        >
                            <option value="" disabled>-- Select --</option>
                            {exerciseOptions.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                )}

                <div className="flex flex-col gap-2 ml-auto">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Time Range</label>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-2 rounded-lg border border-slate-200 uppercase tracking-tighter">
                        Last 30 Days
                    </span>
                </div>
            </div>

            {percentageGrowth !== null && chartData.length > 0 && (
                <div className={`text-sm font-bold flex items-center gap-1 ${percentageGrowth > 0 ? 'text-emerald-600' : 'text-rose-700'}`}>
                    <span>{percentageGrowth > 0 ? '▲' : '▼'}</span>
                    {Math.abs(percentageGrowth)}% growth in this period
                </div>
            )}

            <div className="w-full h-[350px] mt-4 flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="date" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#972D43', strokeWidth: 1, strokeDasharray: '5 5' }} />
                            
                            <Line 
                                type="monotone"
                                dataKey="value"
                                stroke="#972D43"
                                strokeWidth={3}
                                dot={{ fill: '#972D43', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center p-10">
                        <p className="text-slate-400 font-bold text-sm">No data for this selection</p>
                        <p className="text-slate-300 text-xs">Try selecting a different workout or exercise.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeightliftingGraph;