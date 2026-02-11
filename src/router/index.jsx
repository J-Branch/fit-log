import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";

// Pages
import MainPage from "../views/MainPage";
import Auth from "../views/Auth";
import Dashboard from "../views/Dashboard";
import ViewWorkouts from "../views/ViewWorkouts";
import CreateWorkout from "../views/CreateWorkout";
import EditWorkout from "../views/EditWorkout";
import Analytics from "../views/Analytics";
import NotFoundPage from "../views/NotFoundPage";

// Layouts 
import AuthLayout from "../views/layouts/AuthLayout";
import AppLayout from "../views/layouts/AppLayout";

// Loaders 
import { protectedLoader } from "../loaders/protected.loader";
import { authLoader } from "../loaders/auth.loader";

// Actions 
import { authAction } from "../actions/auth.action";
import { logoutAction } from "../actions/logout.action";
import { workoutSubmit } from "../actions/workoutSubmit.action";
import { editSubmit } from "../actions/editSubmit.action"; 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element: <AuthLayout />,
                loader: authLoader,
                children: [
                    { path: "login", element: <Auth />, action: authAction },
                    { path: "register", element: <Auth />, action: authAction },
                    { index: true, element: <Navigate to="login" /> },
                ],
            },
            {
                id: "AppLayout",
                element: <AppLayout />,
                loader: protectedLoader,
                children: [
                    { path: "logout", action: logoutAction },
                    {
                        id: "MainPage",
                        path: "home",
                        element: <MainPage />,
                        children: [
                            { index: true, element: <Dashboard /> },
                            { path: "dashboard", element: <Dashboard /> },
                            { path: "workouts", element: <ViewWorkouts /> },
                            { path: "workouts/create", element: <CreateWorkout />, action: workoutSubmit },
                            { path: "workout/:id", element: <EditWorkout />, action: editSubmit },
                            { path: "analytics", element: <Analytics /> },
                        ],
                    },
                ],
            },
        ],
    },
]);