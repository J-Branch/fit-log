import { useState, useMemo } from 'react';

export function useUniqueWorkoutNames( workouts ) {
    const [uniqueWorkouts, setUniqueWorkouts] = useState([]);

    useMemo(() => {
            const names = workouts.map(w => w.workoutName);
            setUniqueWorkouts([...new Set(names)]);
    }, [workouts]);

    return uniqueWorkouts;
}

export function useUniqueExerciseNames( exercises ) {
    const [uniqueExercises, setUniqueExercises] = useState([]);

    useMemo(() => {
            const names = exercises.map(w => w.exerciseName);
            setUniqueExercises([...new Set(names)]);
    }, [exercises]);

    return uniqueExercises;
}

