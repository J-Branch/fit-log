import {Outlet, Link, useNavigate, replace} from "react-router-dom"
import { useUserActionsContext } from "../context/user.context";


function MainPage() {
    const { logout } = useUserActionsContext();

    async function handleLogout() {
        try{
            await logout();
        } catch (err){
            console.error("logout failed:", err);
        } 
    };

    return (
        <div style={{display: "flex", height: "100vh" }}>
            <nav style={{
                flexShrink: 0,
                width: "20%",             
                maxWidth: "250px",        
                minWidth: "150px",        
                background: "#eee",
                padding: "1rem",
                boxSizing: "border-box"
            }}>
                <h2>Fit Tracker</h2>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/workouts">Workouts</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <main style={{ flexGrow: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;