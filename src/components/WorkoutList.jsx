function WorkoutList({ workouts }) {
    // Should return a display of all the users workouts
    return (
        <>
            <h2>--Previous Workouts--</h2><br />

            <ul>
                {workouts.map((workout, index) => (
                    <li key={index}>
                        <div>
                            {workout.name}<br />
                            {workout.type}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default WorkoutList;