import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './views/Auth.jsx'
import Dashboard from './views/Dashboard.jsx'
import MainPage from './views/MainPage.jsx'
import WorkoutPage from './views/WorkoutPage.jsx'
import NotFoundPage from './views/NotFoundPage.jsx'
import Analytics from './views/Analytics.jsx'
import GroupPage from './views/GroupPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// defines all routes in the app
const routes = createBrowserRouter([ 
  {
    path: "/",
    element: <MainPage />,
    children: [
      {path:"/auth", element: <Auth />},
      {path:"/mainpage", element: <MainPage />},
      {path:"/dashboard", element: <Dashboard />},
      {path:"/workouts", element: <WorkoutPage />},
      {path:"/analytics", element: <Analytics />},
      {path:"/groups", element: <GroupPage />},
      {path:"/", element: <Dashboard />}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
