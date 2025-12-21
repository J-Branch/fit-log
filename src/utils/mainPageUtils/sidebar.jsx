import { Link } from "react-router-dom";

export function SidebarLink({ to, icon, text }) {
    return (
        <li className="h-full">
            <Link
                to={to} 
                className="flex items-center gap-2 block pt-10 pb-10 w-[100%] h-[100%] rounded-md hover:bg-primary-gray-three"
            >
                {icon}
                {text}
            </Link>
        </li>
    );
}

export function NavWrapper({ children }) {
    return (
        <nav className="w-[20%] max-w-[250px] bg-primary-gray-two shadow-lg sticky top-0 h-screen flex flex-col">
            {children}
        </nav>
    );
}