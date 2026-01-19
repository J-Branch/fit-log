// import { useWorkoutContext } from "../context/workout.context";
import { Link } from "react-router-dom";

function ViewWorkouts() {
    // just need the workouts and add a link to click
    const { userWorkouts } = useWorkoutContext();

    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold">Workouts</h1>
                <Link to="/workouts/create">Create Workout</Link>
            </div>

            {/* // first bracket */}
            {
                userWorkouts.length ? (
                    <div>
                        <div className="items-start hidden lg:flex gap-x-8 lg:gap-x-16">
                            <span className="w-16 font-semibold text-red-900">Workout Name</span>
                            {/* <span className="w-32 font-semibold text-red-900">name</span> */}
                            <span className="w-16 font-semibold text-red-900">Workout Type</span>
                            {/* <span className="w-32 font-semibold text-red-900">type</span> */}
                            <span className="w-16 font-semibold text-red-900">Date</span>
                            {/* <span className="w-32 font-semibold text-red-900">date</span> */}
                        </div>

                        <ul className="mt-2">
                            {userWorkouts.map(workout => {
                                const {
                                    $id,
                                    workoutName,
                                    workoutType,
                                    date,
                                } =  workout;
                                return (
                                    <li key={$id} className="px-4 py=2 lg:p-0 max-lg:my-4 max-lg:bg-indigo-50/50">
                                        <Link
                                            to={`/workout/${$id}`}
                                            className="p-2 -mx-2 rounded-md grid grid-cols-2 gap-y-4 lg:gap-y-0  lg:flex lg:flex-nowrap gap-x-8 lg:gap-x-16 lg:hover:bg-indigo-50 min-w-[15rem] sm:min-w-[20rem]"
                                        >
                                            <div className="flex flex-col lg:w-16">
                                                <span className="text-sm text-indigo-600 lg:hidden">Workout</span>
                                                <span>{workoutName}</span>
                                            </div>

                                            <div className="flex flex-col lg:w-32">
                                                <span className="text-sm text-indigo-600 lg:hidden">Type</span>
                                                <span>{workoutType}</span>
                                            </div>

                                            <div className="flex flex-col lg:w-16">
                                                <span className="text-sm text-indigo-600 lg:hidden">Date</span>
                                                <span>{date}</span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <Link to="/workout/create">
                        You have no workouts. Create One!
                    </Link>
                )
            }
        </div>
    );
}

export default ViewWorkouts;