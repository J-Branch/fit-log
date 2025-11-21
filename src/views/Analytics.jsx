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
        <div className="bg-primary-black ">
        
            <>
                <WeightliftingGraph workouts={weightliftingWorkouts} exercises={userExercises} sets={userSets} />
            </>
        

            <>
                <DistanceTimeGraph workouts={distanceTimeWorkouts} />
            </>
        
        </div>
    )
}

export default Analytics;