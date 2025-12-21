import { Link } from "react-router-dom";
{/* 
export function ColumnHeader({ text }) {
    return (
        <span className="w-28 font-semibold text-primary-red-one">
            { text }
        </span>
    );
}
*/}

export function WorkoutRow({ workout }) {
    const { $id, workoutName, workoutType, date } = workout;

    return (
        <li className="px-4 py-2 lg:p-0 max-lg:my-4 max-lg:bg-primary-white-two/60">
            <Link
                to={`/workout/${$id}`}
                className="block h-full rounded-xl
                    border border-primary-white-two
                    bg-primary-gray-one
                    p-6
                    shadow-sm
                    hover:shadow-md
                    hover:-translate-y-0.5
                    transition
                "
            >
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-primary-black">
                        {workoutName}
                    </h2>

                    <p className="text-sm text-primary-red-one">
                        {workoutType}
                    </p>

                    <p className="text-sm text-primary-gray">
                        {date}
                    </p>
                </div>
                
            </Link>
        </li>
    );
}

