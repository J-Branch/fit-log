import { Link, useRouteLoaderData } from "react-router-dom";
import { WorkoutRow } from "../utils/workoutPageUtils/workoutPageTable";

function ViewWorkouts() {
    const { userWorkouts } = useRouteLoaderData("AppLayout");

    return (
        <div className="bg-primary-white w-full h-full pt-2 pl-4">
            <div>
                <h1 className="text-2xl font-semibold">Workouts</h1>
                <Link to="../workouts/create">Create Workout</Link>
            </div>

            {/* // first bracket */}
            {
                userWorkouts.length ? (
                    <div>
            
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
                    <Link to="../workouts/create">
                        You have no workouts. Create One!
                    </Link>
                )
            }
        </div>
    );
}

export default ViewWorkouts;