import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from './context/UserContextProvider';
import { WorkoutContextProvider } from './context/WorkoutContextProvider';


function App() {

  return(
    <UserContextProvider>
      <WorkoutContextProvider>
        <Outlet />
        <Toaster />
      </WorkoutContextProvider>
    </UserContextProvider>
  )
}

export default App
