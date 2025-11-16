export function FetchWorkout({ workoutId, userWorkouts, userExercises, userSets }) {
    // const { userWorkouts, userExercises, userSets } = useWorkoutContext();

    const workout = userWorkouts.find(workout => workout.$id === workoutId);

    const exercises = userExercises.filter(exercise => exercise.wid === workoutId);

    const fullExercises = exercises.map(exercise => {
        const setsOfExercise = userSets
        .filter(set => set.eid === exercise.$id)
        .map((set, i) => ({
            $id: set.$id,
            toDelete: false,
            isDirty: false,
            setCounter: i + 1,
            reps: set.reps,
            weight: set.weight,
        }));

        return {
            $id: exercise.$id,
            toDelete: false,
            isDirty: false,
            name: exercise.exerciseName,
            sets: setsOfExercise,
        };
    });

    return {
        $id: workout.$id,
        toDelete: false,
        isDirty: false,
        workoutName: workout.workoutName,
        workoutType: workout.workoutType,
        date: workout.date,
        time: workout.time,
        distance: workout.distance,
        exercises: fullExercises,
    };

}