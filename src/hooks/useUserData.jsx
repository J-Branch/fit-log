import { useState, useEffect } from 'react';
import { getUserWorkouts, getUserExercises, getUserSets } from '../api/appwrite.workout';

export function useUserData(userId) {
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [userSets, setUserSets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const [workouts, exercises, sets] = await Promise.all([
                getUserWorkouts(userId),
                getUserExercises(userId),
                getUserSets(userId),
            ]);

            setUserWorkouts(workouts);
            setUserExercises(exercises);
            setUserSets(sets);
        }
        if (userId) fetchData();
    }, []);

    return {
        userWorkouts,
        userExercises,
        userSets
    };
}