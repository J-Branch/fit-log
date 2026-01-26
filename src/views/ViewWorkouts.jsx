import { useWorkoutContext } from "../context/workout.context";
import { Link } from "react-router-dom";
import { WorkoutRow } from "../utils/workoutPageUtils/workoutPageTable"

function ViewWorkouts() {
    // just need the workouts and add a link to click
    const { userWorkouts } = useWorkoutContext();

    return (
        <div className="bg-primary-white w-full h-full pt-2 pl-4">
            <div>
                <h1 className="text-2xl font-semibold">Workouts</h1>
                <Link to="/workouts/create">Create Workout</Link>
            </div>

            
            {
                userWorkouts.length ? (
                    <div>
                        {/* Column Headers*/}
                        {/* <div className="items-start hidden lg:flex gap-x-8 lg:gap-x-16"> */}
                            {/* <ColumnHeader text="Workout Name" /> */}
                            {/* <span className="w-32 font-semibold text-red-900">name</span> */}
                            {/* <ColumnHeader text="Workout Type" /> */}
                            {/* <span className="w-32 font-semibold text-red-900">type</span> */}
                            {/* <ColumnHeader text="Date" /> */}
                            {/* <span className="w-32 font-semibold text-red-900">date</span> */}
                        {/* </div> */}
            
                        {/* Workout List*/}
                        <ul className="
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pr-3
                        ">
                            {userWorkouts.map(workout => (
                                <WorkoutRow key={workout.$id} workout={workout} />
                            ))}
                        </ul>

                    </div>
                ) : (
                    <Link to="/workouts/create">
                        You have no workouts. Create One!
                    </Link>
                )
            }
        </div>
    );
}

export default ViewWorkouts;