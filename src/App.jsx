import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from './context/AuthContextProvider';


function App() {

  return (
    <AuthContextProvider>
      <Outlet />
      <Toaster />
    </AuthContextProvider>
  )
}

export default App
