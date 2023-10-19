import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
            console.log("[App] useEffect!!");
    
            axios.get("/api/hello"
            )
                .then(response => {
                    console.log(response.data);
                    setBackendData(response.data);

                }
                )
                .catch(error => console.log(error))
    
        }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          여기는 백엔드 데이터 : {backendData}
        </a>
      </header>
    </div>
  );
}

export default App;
