import {Outlet, Link, Form} from "react-router-dom"
import { useAuthActionsContext } from "../context/auth.context";


function MainPage() {
    const { logout } = useAuthActionsContext();

    // async function handleLogout() {
    //     try{
    //         await logout();
    //     } catch (err){
    //         console.error("logout failed:", err);
    //     } 
    // };

    return (
        <div style={{display: "flex", minHeight: "100vh" }}>
            <nav 
                className="w-[20%] max-w-[250px] bg-gray-200 p-4 sticky top-0 h-screen flex flex-col gap-4"
            >
                <h2>Fit Tracker</h2>
                <ul className="flex flex-col gap-2">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/workouts">Workouts</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                </ul>

                <Form method="post" action="/logout">
                    <button type="submit" className="w-full text-left">
                        Logout
                    </button>
                </Form>
            </nav>

            <main style={{ flexGrow: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;