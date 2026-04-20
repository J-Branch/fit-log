import { Outlet } from "react-router-dom";
import TopLoader from "../../components/hydration/TopLoader";

export default function AppLayout() {
    return (
        <>
            <TopLoader />
            <Outlet />
        </>
    );
}