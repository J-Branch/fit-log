import {Outlet, Link, useNavigate, replace} from "react-router-dom"
import { useUserActionsContext } from "../context/user.context";
import { SidebarLink, NavWrapper } from "../utils/mainPageUtils/sidebar";
import DashboardIcon from "../assets/icons/dashboardIcon.svg";
import WorkoutsIcon from "../assets/icons/workoutsIcon.svg";
import AnalyticsIcon from "../assets/icons/analyticsIcon.svg";


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
            <NavWrapper>
                <h2 className="text-center text-2xl pt-16 pb-16">Fit-Log</h2>
                <ul className="flex flex-col text-center">
                    <SidebarLink to="/dashboard" text="Dashboard" icon={<img src={DashboardIcon} className="w-10 h-7"></img>} />
                    <SidebarLink to="/workouts" text="Workouts" icon={<img src={WorkoutsIcon} className="w-10 h-7"></img>} />
                    <SidebarLink to="/analytics" text="Analytics" icon={<img src={AnalyticsIcon} className="w-10 h-7"></img>} />
                </ul>
                <button
                    onClick={handleLogout}
                    className="w-full text-center mt-auto pb-16 pt-16"
                >Logout</button>
            </NavWrapper>

            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;