import { Link } from "react-router-dom";

export function AchievementPageLink({ to, icon, state }) {
    return (
        <Link 
        to={to} 
        state={state} // Passing totalWeight & totalDistance data
        className="flex items-center justify-center w-full h-full rounded-xl 
            bg-secondary-gray-two border border-transparent
            hover:-translate-y-3 hover:shadow-lg 
            transition-all duration-300 ease-in-out"
        >
            {icon}
        </Link>
    );
}