import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import MainPage from "../views/MainPage";
import Auth from "../views/Auth";
import Dashboard from "../views/Dashboard";
import ViewWorkouts from "../views/ViewWorkouts";
import CreateWorkout from "../views/CreateWorkout";
import EditWorkout from "../views/EditWorkout";
import Analytics from "../views/Analytics";
import NotFoundPage from "../views/NotFoundPage";


import { rootLoader } from "../loaders/root.loader";
import { protectedLoader } from "../loaders/protected.loader";
import { authLoader } from "../loaders/auth.loader";
import { authAction } from "../actions/auth.action";
import { logoutAction } from "../actions/logout.action";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "auth",
                element: <Outlet />,
                loader: authLoader,
                children: [
                    { path: "login", element: <Auth />, action: authAction },
                    { path: "register", element: <Auth />, action: authAction },
                ],
            },
            {
                path: "/",
                element: <MainPage />,
                loader: protectedLoader,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "dashboard", element: <Dashboard /> },
                    {
                        path: "workouts",
                        //loader: workoutsLoader,
                        element: <Outlet />,
                        children: [
                            { index: true, element: <ViewWorkouts /> },
                            { path: "create", element: <CreateWorkout /> },
                            { path: ":id", element: <EditWorkout /> },
                        ]
                    },
                    { path: "analytics", element: <Analytics /> },
                    { path: "logout", action: logoutAction },
                ]
            }
        ]
    }
]);