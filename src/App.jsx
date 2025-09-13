import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from './context/UserContextProvider';


function App() {

  return(
    <UserContextProvider>
      <Outlet />
      <Toaster />
    </UserContextProvider>
  )
}

export default App
