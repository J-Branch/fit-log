import WeightliftingGraph from '../components/WeightliftingGraph';
import DistanceTimeGraph from '../components/DistanceTimeGraph';
import { useLoaderData } from 'react-router-dom';
import { useMemo } from 'react';

function Analytics() {
    const { userWorkouts, userExercises } = useLoaderData();

    const weightliftingWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Weightlifting'),
    [userWorkouts]);

    const distanceTimeWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Distance/Time'),
    [userWorkouts]);

    return (
        <div className="w-full min-h-screen p-6 bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary-red-one">Workout Analytics</h1>
                    <p className="text-primary-red-two">Track your progress and hit some new PRs</p>
                </div>
            </header>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-red-one">
                <h2 className="text-lg font-semibold mb-4 text-primary-red-one">Strength Progress</h2>
                    <WeightliftingGraph workouts={weightliftingWorkouts} exercises={userExercises} />
                </div>
            

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-red-one">
                    <h2 className="text-lg font-semibold mb-4 text-primary-red-one">Cardio Trends</h2>
                    <DistanceTimeGraph workouts={distanceTimeWorkouts} />
                </div>
            </div>
        </div>
    )
}

export default Analytics;