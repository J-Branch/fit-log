// Returns - One Workouts Date & Weight Total
export function getWorkoutTotal({workout, exercises, sets }) {
    let total = 0;

    // Loop through Exercises
    for (const exercise of exercises) {
        if (exercise.wid === workout.$id) {
            // Loop through sets
            for (const set of sets) {
                if (set.eid === exercise.$id) {
                    total += (set.reps * set.weight);
                }
            }
        }
    }
    return {
        date: new Date(workout.date).toLocaleDateString(),
        total
    }
}