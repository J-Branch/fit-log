import WeightliftingGraph from '../components/WeightliftingGraph';
import DistanceTimeGraph from '../components/DistanceTimeGraph';
import { useFetchWorkoutData } from '../hooks/workouts/useFetchWorkoutData';
import { useMemo } from 'react';

function Analytics() {
    const { userWorkouts, userExercises, userSets } = useFetchWorkoutData();

    const weightliftingWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Weightlifting'),
    [userWorkouts]);

    const distanceTimeWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Distance/Time'),
    [userWorkouts]);

    return (
        <div className="w-full min-h-screen bg-primary-white-two p-4">
            <div className="bg-primary-white p-4 rounded-md shadow-md mb-6">
                <WeightliftingGraph workouts={weightliftingWorkouts} exercises={userExercises} sets={userSets} />
            </div>
        

            <div className="bg-primary-white p-4 rounded-md shadow-md">
                <DistanceTimeGraph workouts={distanceTimeWorkouts} />
            </div>
        </div>
    )
}

export default Analytics;