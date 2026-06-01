import {Outlet, useFetcher} from "react-router-dom"
import DashboardIcon from "../assets/icons/dashboardIcon.svg";
import WorkoutsIcon from "../assets/icons/workoutsIcon.svg";
import AnalyticsIcon from "../assets/icons/analyticsIcon.svg";
import { SidebarLink, NavWrapper } from "../components/Sidebar";


function MainPage() {
    const fetcher = useFetcher();

    function handleLogout() {
        fetcher.submit(null, {
            method: "post",
            action: "/logout"
        });
    }

    return (
        <div>
            <NavWrapper>
                    <h2 className="text-center text-3xl font-bold italic tracking-tighter uppercase">Fit-
                        <span className="text-light-default">Log</span>
                    </h2>

                    <ul className="flex gap-6">
                        <SidebarLink to="dashboard" text="Dashboard" />
                        <SidebarLink to="workouts" text="Workouts" />
                        <SidebarLink to="analytics" text="Analytics" />
                    </ul>

                    <div className="[border-radius:100vw_100vw_100vw_100vw] px-5 py-2 bg-black hover:bg-light-default">
                        <button onClick={handleLogout} className="w-full text-center text-white cursor-pointer">
                            {fetcher.state === "submitting" ? "Logging out..." : "Logout"}
                        </button>
                    </div>
            </NavWrapper>

            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;