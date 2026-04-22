import { Link } from "react-router-dom";
import dumbellIcon from "../../assets/icons/dumbell.png";
import runIcon from "../../assets/icons/run.png";

export function WorkoutRow({ workout }) {
    const { $id, workoutName, workoutType, date } = workout;

    const iconMap = {
        "Weightlifting": dumbellIcon,
        "Distance/Time": runIcon
    }

    const icon = iconMap[workoutType]

    return (
        <li className="list-none border-b border-gray-100 last:border-b-0 even:bg-gray-50/40">
            <Link
                to={`../workout/${$id}`}
                className="grid grid-cols-3 items-center px-4 py-3 hover:bg-gray-50 active:scale-[0.99] transition relative group"
            >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 w-1 h-0 bg-primary-red-one group-hover:h-full transition-all" />

                {/* Left: Name */}
                <div className="text-sm font-semibold text-gray-900">
                    {workoutName}
                </div>

                {/* Middle: Date */}
                <div className="text-xs text-gray-400 font-mono text-center">
                    {new Date(date).toLocaleDateString()}
                </div>

                {/* Right: Type + Icon */}
                <div className="flex items-center justify-end gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {workoutType}
                    </span>

                    <img
                        src={icon}
                        alt={workoutType}
                        className="w-5 h-5 object-contain opacity-80"
                    />
                </div>
            </Link>
        </li>
    );
}