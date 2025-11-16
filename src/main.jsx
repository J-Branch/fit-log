import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Auth = lazy(() => import("./views/Auth.jsx"));
const Dashboard = lazy(() => import("./views/Dashboard.jsx"));
const MainPage = lazy(() => import("./views/MainPage.jsx"));
const NotFoundPage = lazy(() => import("./views/NotFoundPage.jsx"));
const Analytics = lazy(() => import("./views/Analytics.jsx"));
const ViewWorkouts = lazy(() => import("./views/ViewWorkouts.jsx"));
const CreateWorkout = lazy(() => import("./views/CreateWorkout.jsx"));
const EditWorkout = lazy(() => import("./views/EditWorkout.jsx"));


// defines all routes in the app
const routes = createBrowserRouter([ 
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "auth/login", element: <Auth />},
      { path: "auth/register", element: <Auth />}, 
      
      {
        element: <MainPage />,
        children: [
          { index: true, element: <Dashboard />},
          {path:"dashboard", element: <Dashboard />},
          {path:"workouts", element: <ViewWorkouts />},
          {path:"workouts/create", element: <CreateWorkout />},
          {path:"workout/:id", element: <EditWorkout />},
          {path:"analytics", element: <Analytics />},
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
