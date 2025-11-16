import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from './context/UserContextProvider';
import { WorkoutContextProvider } from './context/WorkoutContextProvider';
import { Suspense } from 'react';


function App() {

  return(
    <UserContextProvider>
      <WorkoutContextProvider>
        <Suspense loading={<div />}>
          <Outlet />  
        </Suspense>
        <Toaster />
      </WorkoutContextProvider>
    </UserContextProvider>
  )
}

export default App
