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
                    <li>Dashboard</li>
                    <li>Workouts</li>
                    <li>Analysis</li>
                    <li>Groups</li>
                </ul>
            </nav>

            <main style={{ flexGrow: 1, padding: "1rem" }}>
                <h1>page content will go here</h1>
            </main>
        </div>
    );
}

export default MainPage;