import { Link } from "react-router-dom";

export function SidebarLink({ to, text }) {
    const linkStyles = `
        relative
        text-[0.78rem]
        font-semibold
        tracking-[0.1em]
        uppercase
        text-slate-600
        hover:text-light-default
        transition-colors

        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-light-disabled
        after:transition-all
        after:duration-300

        hover:after:w-full
    `;
    return (
        <li>
            <Link to={to} className={linkStyles}>
                {text}
            </Link>
        </li>
    );
}

export function NavWrapper({ children }) {
    return (
        <nav className="flex items-center justify-between px-10 py-5 top-0 left-0 z-50 w-full border-b border-slate-600 backdrop-blur-md">
            {children}
        </nav>
    );
}