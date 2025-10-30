import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './views/Auth.jsx'
import Dashboard from './views/Dashboard.jsx'
import MainPage from './views/MainPage.jsx'
import WorkoutPage from './views/WorkoutPage.jsx'
import NotFoundPage from './views/NotFoundPage.jsx'
import Analytics from './views/Analytics.jsx'
import GroupPage from './views/GroupPage.jsx'


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
          {path:"workouts", element: <WorkoutPage />},
          {path:"analytics", element: <Analytics />},
          {path:"groups", element: <GroupPage />},
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
