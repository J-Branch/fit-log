import logo from './logo.svg';
import './App.css';
import React, { useEffect} from 'react'; //testing purposes
import client from "./appwrite"


function App() {
  useEffect(() => {
    client.call('get', '/health')
      .then((res) => console.log("Ping success ✅", res))
      .catch((err) => console.error("Ping failed ❌", err));
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>Welcome to our workout app!</p>
    </div>
  );
}

export default App;
