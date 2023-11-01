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
import RegistAccm from './pages/accommodation/admin/RegistAccm';
import AdminSignUp from './pages/member/admin/AdminSignUp';
import AdminSignIn from './pages/member/admin/AdminSignIn';
import Main from './pages/main/user/Main';
import AdminHeader from './commons/header/admin/AdminHeader';
import AdminNav from './commons/nav/admin/AdminNav';
import AdminMain from './pages/main/admin/AdminMain';
import AdminDetailAccm from './pages/accommodation/admin/AdminDetailAccm';
import ModifyAccm from './pages/accommodation/admin/ModifyAccm';
import AdminFooter from './commons/footer/admin/AdminFooter';
import AdminModify from './pages/member/admin/AdminModify';
import AdminChangePw from './pages/member/admin/AdminChangePw';
import Modify from './pages/member/user/Modify';
import RegistRoom from './pages/accommodation/admin/RegistRoom';
import ChangePw from './pages/member/user/ChangePw';

function App() {

    return (

        <div style={{ backgroundColor: '#C0E2FF', height: '100vh', overflow: 'auto' }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={<AdminHeader />}/>
                    <Route
                        path="/user/*"
                        element={<Header />}/>
                    <Route
                        path="/"
                        element={<Header />}/>
                </Routes>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={<AdminNav />}/>
                    <Route
                        path="/user/*"
                        element={<Nav />}/>
                    <Route
                        path="/"
                        element={<Nav />}/>
                </Routes>
                <Routes>
                    <Route
                        path="/"
                        element={<Main />}
                    ></Route>
                    <Route
                        path="/user/member/signIn"
                        element={<SignIn />}
                    ></Route>
                    <Route
                        path="/user/member/signUp"
                        element={<SignUp />}
                    ></Route>
                    <Route
                        path="/user/member/modify"
                        element={<Modify />}
                    ></Route>
                    <Route
                        path="/user/member/changePw"
                        element={<ChangePw />}
                    ></Route>
                    <Route
                        path="/admin"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminMain /> </div>}
                    ></Route>
                    <Route
                        path="/admin/accommodation/registAccm"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <RegistAccm /> </div>}
                    ></Route>
                    <Route
                        path="/admin/accommodation/detailAccm"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminDetailAccm /> </div>}
                    ></Route>
                    <Route
                        path="/admin/accommodation/modifyAccm/:no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <ModifyAccm /> </div>}
                    ></Route>

                    <Route
                        path="/admin/accommodation/registRoom"
                        element={<RegistRoom />}>
                    </Route>

                    <Route
                        path="/admin/member/signIn"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminSignIn /> </div>}
                    ></Route>
                    <Route
                        path="/admin/member/signUp"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminSignUp /> </div>}
                    ></Route>
                    <Route
                        path="/admin/member/modify"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminModify /> </div>}
                    ></Route>
                    <Route
                        path="/admin/member/changePw"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminChangePw /> </div>}
                    ></Route>
                </Routes>
                <Routes>
                    <Route 
                        path="/"
                        element={<Footer />}/>
                    <Route 
                        path="/user/*"
                        element={<Footer />}/>
                    <Route 
                        path="/admin/*"
                        element={<AdminFooter />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
