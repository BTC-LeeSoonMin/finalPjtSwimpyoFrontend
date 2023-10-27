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

function App() {

    return (

        <div style={{ backgroundColor: '#C0E2FF', height: '100vh', overflow: 'auto' }}>
            <BrowserRouter>
                {/* <AdminHeader />
                <AdminNav />
                <AdminMain/> */}
                <Header />
                <Nav />
                <Routes>
                    <Route
                        path="/"
                        element={<Main />}
                    ></Route>
                    <Route
                        path="/admin"
                        element={<AdminMain />}
                    ></Route>
                    <Route
                        path="/member/user/signIn"
                        element={<SignIn />}
                    ></Route>
                    <Route
                        path="/member/user/signUp"
                        element={<SignUp />}
                    ></Route>
                    <Route
                        path="/admin/accommodation/registAccm"
                        element={<RegistAccm />}
                    ></Route>
                    <Route
                        path="/admin/accommodation/detailAccm"
                        element={<AdminDetailAccm />}
                    ></Route>
                    <Route
                        path="/admin/accommodation/modifyAccm/:no"
                        element={<ModifyAccm />}
                    ></Route>
                    <Route
                        path="/member/admin/signIn"
                        element={<AdminSignIn />}
                    ></Route>
                    <Route
                        path="/member/admin/signUp"
                        element={<AdminSignUp />}
                    ></Route>
                    <Route
                        path="/member/admin/modify"
                        element={<AdminModify />}
                    ></Route>
                    <Route
                        path="/member/admin/changePassword"
                        element={<AdminChangePw />}
                    ></Route>
                </Routes>
                <Footer />
                {/* <AdminFooter /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
