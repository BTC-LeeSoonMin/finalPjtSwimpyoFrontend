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
import MyPage from './pages/mypage/user/MyPage';
import ResLogDetail from './pages/mypage/user/ResLogDetail';
import AdminDetailRoom from './pages/accommodation/admin/AdminDetailRoom';
import ModifyRoom from './pages/accommodation/admin/ModifyRoom';
import SearchAccm from './pages/accommodation/user/searchAccm/SearchAccm';
import UserDetailAccm from './pages/accommodation/user/userAccmAndRoom/UserDetailAccm';
import UserDetailRoom from './pages/accommodation/user/userAccmAndRoom/UserDetailRoom';
import UserReservation from './pages/accommodation/user/userAccmAndRoom/UserReservation';
import UserPaymentRoomReady from './pages/accommodation/user/userAccmAndRoom/UserPaymentRoomReady';
import PayResult from './pages/accommodation/user/userAccmAndRoom/PayResult';
import CategoryAccm from './pages/accommodation/user/categoryAccmList/CategoryAccm';
import AccmReviewList from './pages/review/user/reviewList/AccmReviewList';
import AccmReview from './pages/review/user/reviewList/AccmReview';
import RoomReview from './pages/review/user/reviewList/RoomReview';
import ResReview from './pages/review/user/ResReview';


function App() {

    return (

        <div style={{ backgroundColor: '#C0E2FF', height: '100vh', overflow: 'auto' }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={<AdminHeader />} />
                    <Route
                        path="/user/*"
                        element={<Header />} />
                    <Route
                        path="/"
                        element={<Header />} />
                </Routes>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={<AdminNav />} />
                    <Route
                        path="/user/*"
                        element={<Nav />} />
                    <Route
                        path="/"
                        element={<Nav />} />
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
                        path="/user/member/changePw"
                        element={<ChangePw />}
                    ></Route>
                    <Route
                        path="/user/myPage"
                        element={<MyPage />}
                    ></Route>
                    <Route
                        path="/user/myPage/resLogDetail"
                        element={<ResLogDetail />}
                    ></Route>
                    <Route
                        path="/user/searchAccm"
                        element={<SearchAccm />}
                    ></Route>
                    <Route
                        path="/user/categoryAccm"
                        element={<CategoryAccm />}
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
                        path="/admin/accommodation/detailAccm/:a_m_no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminDetailAccm /> </div>}
                    ></Route>
                    <Route
                        path="/admin/accommodation/modifyAccm/:a_m_no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <ModifyAccm /> </div>}
                    ></Route>

                    <Route
                        path="/admin/accommodation/registRoom/:a_m_no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <RegistRoom /></div>}>
                    </Route>

                    <Route
                        path="/admin/accommodation/detailRoom/:a_r_no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <AdminDetailRoom /></div>}>
                    </Route>

                    <Route
                        path="/admin/accommodation/modifyRoom/:a_r_no/:a_m_no"
                        element={<div style={{ backgroundColor: 'lightgray', height: '100vh', overflow: 'auto' }}> <ModifyRoom /></div>}>
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

                    <Route
                        path="/user/accommodation/detailAccm/:a_acc_no"
                        element={<UserDetailAccm />}>
                    </Route>
                    <Route
                        path="/user/accommodation/detailAccm/reviewList"
                        element={<AccmReview />}>
                    </Route>
                    <Route
                        path="/user/accommodation/detailRoom/:a_acc_no/:a_r_no"
                        element={<UserDetailRoom />}>
                    </Route>
                    <Route
                        path="/user/accommodation/detailRoom/reviewList"
                        element={<RoomReview />}>
                    </Route>
                    <Route
                        path="/user/accommodation/reservation/:a_acc_no/:a_r_no"
                        element={<UserReservation />}>
                    </Route>
                    <Route
                        path="/payment/success"
                        element={<UserPaymentRoomReady />}>
                    </Route>
                    {/* <Route
                        path="/payment/success"
                        element={<div > <PayResult /></div>}>
                    </Route> */}
                    <Route
                        path="/user/review/regist/:a_acc_no/:a_r_no"
                        element={<div > <ResReview /></div>}>
                    </Route>

                </Routes>
                <Routes>
                    <Route
                        path="/"
                        element={<Footer />} />
                    <Route
                        path="/user/*"
                        element={<Footer />} />
                    <Route
                        path="/admin/*"
                        element={<AdminFooter />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
