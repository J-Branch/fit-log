import {Outlet, Link} from "react-router-dom"
import Dashboard from "./Dashboard";


function MainPage() {
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
                    <li><Link to="/groups">Groups</Link></li>
                </ul>
            </nav>

            <main style={{ flexGrow: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;