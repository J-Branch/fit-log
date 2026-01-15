export function FetchWorkout({ workoutId, userWorkouts, userExercises, userSets }) {

    const workout = userWorkouts.find(workout => workout.$id === workoutId);

    const exercises = userExercises.filter(exercise => exercise.wid === workoutId);

    const fullExercises = exercises.map(exercise => {
        const setsOfExercise = userSets
        .filter(set => set.eid === exercise.$id)
        .map((set, i) => ({
            $id: set.$id,
            setCounter: i + 1,
            reps: set.reps,
            weight: set.weight,
        }));

        return {
            $id: exercise.$id,
            name: exercise.exerciseName,
            sets: setsOfExercise,
        };
    });

    return {
        $id: workout.$id,
        workoutName: workout.workoutName,
        workoutType: workout.workoutType,
        date: workout.date,
        time: workout.time,
        distance: workout.distance,
        exercises: fullExercises,
    };

}