import { useUserContext } from '../context/user.context';
import WeightliftingGraph from '../components/WeightliftingGraph';
import DistanceTimeGraph from '../components/DistanceTimeGraph';
import { useUserData } from '../hooks/useUserData';
import { useMemo } from 'react';

function Analytics() {
    const { userId } = useUserContext();
    const { userWorkouts } = useUserData(userId);
    const { userExercises } = useUserData(userId);
    const { userSets } = useUserData(userId);

    const weightliftingWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Weightlifting'),
    [userWorkouts]);

    const distanceTimeWorkouts = useMemo(() =>
        userWorkouts.filter(w => w.workoutType === 'Distance/Time'),
    [userWorkouts]);

    return (
        <>
            <div>
                <WeightliftingGraph workouts={weightliftingWorkouts} exercises={userExercises} sets={userSets} />
            </div>
        
            <div>
                <DistanceTimeGraph workouts={distanceTimeWorkouts} />
            </div>
        </>
    )
}

export default Analytics;