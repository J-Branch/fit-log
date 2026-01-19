import { Outlet, useLoaderData } from "react-router-dom";
import { useAuthActionsContext } from "../../context/auth.context";
import { useEffect } from "react";

export function ProtectedLayout() {
    const user = useLoaderData();
    const { setUser } = useAuthActionsContext();

    useEffect(() => {
        setUser(user);
    }, [user]);

    return <Outlet />;
}