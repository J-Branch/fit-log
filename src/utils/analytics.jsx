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
        date: new Date(workout.date + 'T12:00:00').toLocaleDateString(),
        total
    }
}

// Filters Workouts Based On The Date Range Provided
export function filterWorkoutsByDateRange(workouts, range) {
    if (range === 'all') return workouts;

    const now = new Date();
    let startDate = new Date();

    if (range === '1m') {
        startDate.setMonth(now.getMonth() - 1);
    } else if (range === '6m') {
        startDate.setMonth(now.getMonth() - 6);
    } else if (range === '1y') {
        startDate.setFullYear(now.getFullYear() - 1);
    }
    
    return workouts.filter(workout => new Date(workout.date) >= startDate);
}