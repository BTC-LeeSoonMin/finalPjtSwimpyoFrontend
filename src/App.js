import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './commons/header/user/Header';
import Nav from './commons/nav/user/Nav';
import Footer from './commons/footer/user/Footer';
import SignUp from './pages/member/user/SignUp';
import SignIn from './pages/member/user/SignIn';

function App() {
    const [backData, setBackData] = useState("");

    useEffect(() => {
        console.log("[App] useEffect!!");

        axios.get("/api/home",
        )
            .then(response => {
                console.log(response.data)
                setBackData(response.data);
            }
            )
            .catch(error => console.log(error))

    }, []);



    return (
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             백엔드에서 온 데이터~ : {backData}
        //         </a>
        //     </header>
        // </div>
        <div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}>
            <BrowserRouter>
                <Header />
                <Nav />
                <Routes>
                    <Route
                        path="/user/member/signIn"
                        element={<SignIn />}
                    ></Route>
                    <Route
                        path="/user/member/signUp"
                        element={<SignUp />}
                    ></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
