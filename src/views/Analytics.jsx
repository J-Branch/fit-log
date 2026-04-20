import WeightliftingGraph from '../components/WeightliftingGraph';
import DistanceTimeGraph from '../components/DistanceTimeGraph';
import { useLoaderData } from 'react-router-dom';
import { useMemo } from 'react';

// NEED -
// Workouts 
// Exercises 

// ON LOAD - 
// Load ALL Workouts 

function Analytics() {
    const { userWorkouts, userExercises } = useLoaderData();

    const weightliftingWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Weightlifting'),
    [userWorkouts]);

    const distanceTimeWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Distance/Time'),
    [userWorkouts]);

    return (
        <div className="w-full min-h-screen bg-primary-white-two p-4">
            <div className="bg-primary-white p-4 rounded-md shadow-md mb-6">
                <WeightliftingGraph workouts={weightliftingWorkouts} exercises={userExercises} />
            </div>
        

            <div className="bg-primary-white p-4 rounded-md shadow-md">
                <DistanceTimeGraph workouts={distanceTimeWorkouts} />
            </div>
        </div>
    )
}

export default Analytics;