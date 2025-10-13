import { useState, useEffect } from 'react';
import { listRows } from '../api/appwrite.workout';

export function useFetchWorkoutData() {
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [userSets, setUserSets] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const [workouts, exercises, sets] = await Promise.all([
                listRows("workouts"),
                listRows("exercises"),
                listRows("sets"),
            ]);

            setUserWorkouts(workouts.rows);
            setUserExercises(exercises.rows);
            setUserSets(sets.rows);
        }
        fetchData();
        setRefreshData(false);
    }, [refreshData]);

    return {
        userWorkouts,
        userExercises,
        userSets,
        setRefreshData
    };
}