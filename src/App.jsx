import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
// import { AuthContextProvider } from './context/UserContextProvider';


function App() {

  // return (
  //   <AuthContextProvider>
  //     <Outlet />
  //     <Toaster />
  //   </AuthContextProvider>
  // )

  return (
    <Outlet />
  )
}

export default App
