import {Outlet, Link, Form} from "react-router-dom"
import DashboardIcon from "../assets/icons/dashboardIcon.svg";
import WorkoutsIcon from "../assets/icons/workoutsIcon.svg";
import AnalyticsIcon from "../assets/icons/analyticsIcon.svg";
import { SidebarLink, NavWrapper } from "../utils/mainPageUtils/sidebar";


function MainPage() {

    return (
        <div style={{display: "flex", minHeight: "100vh" }}>
            <NavWrapper>
                <div className="flex flex-col">
                    <h2 className="text-center text-2xl pt-16 pb-16">Fit-Log</h2>
                    <ul className="flex flex-col text-center">
                        <SidebarLink to="dashboard" text="Dashboard" icon={<img src={DashboardIcon} className="w-10 h-7"></img>} />
                        <SidebarLink to="workouts" text="Workouts" icon={<img src={WorkoutsIcon} className="w-10 h-7"></img>} />
                        <SidebarLink to="analytics" text="Analytics" icon={<img src={AnalyticsIcon} className="w-10 h-7"></img>} />
                    </ul>
                </div>

                <div className="mt-auto">
                    <Form method="post" action="/logout">
                        <button type="submit" className="w-full text-center mt-auto py-16">
                            Logout
                        </button>
                    </Form>
                </div>
            </NavWrapper>

            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage;