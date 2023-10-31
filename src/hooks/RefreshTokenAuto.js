import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import store from "../commons/rtk/Store";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { Cookies } from "react-cookie";
// import cookie from 'react-cookies';


// url 호출 시 기본 값 셋팅
const api = axios.create({
  headers: { "Content-type": "application/json" }, // data type
});

// Axios 요청 인터셉터를 추가(요청이 보내기 전에 실행) 
api.interceptors.request.use(
  function (config) {
    // const token = useSelector((store)=> store.accessToken.value);
    const token = store.getState().accessToken.value;

    console.log('token : ', token);

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      console.log("tp1");
      config.headers.accessToken = null;
      return config;
    }
    
    //요청 헤더가 존재하고 토큰이 있는 경우
    if (config.headers && token) {
      console.log("tp2");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }
    // 요청 시작 
    console.log("request start", config);
  },
  function (error) {
    // 요청 중 오류 발생. 오류를 처리하고 오류를 반환
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
    //응답 인터셉터의 첫 번째 매개변수인 response는 서버로부터 받은 응답 데이터 
  function (response) {
    // 받은 응답 
    console.log("get response", response);
    return response;
  },
  //응답 중 오류가 발생한 경우 실행되는 비동기 함수. 오류를 처리하고 처리된 오류를 반환. 
  async (error) => {
    //에러 객체에서 요청 구성 정보와 응답 상태 코드 추출
    const {
      config,
      response: { status },
    } = error;
    //응답 상태 코드가 401(인증 오류)인 경우 처리를 수행
    if (status === 401) {
        //오류 응답 데이터의 메시지가 "expired"인 경우 처리를 수행
      if (error.response.data === "만료된 토큰 정보입니다.") {
        console.log('pt');

        //원래 요청을 복사하여 originalRequest 변수에 저장
        const originalRequest = config;
        // 쿠키값이 안나옴 당연함 순미녕이 막아놓음 HTTP ONLY 옵션 때문에 js로 접근 불가
        // const refreshToken = Cookies.get('authorization');
        // console.log("refreshToken : ", refreshToken);

        // 새로운 액세스토큰을 전역 변수로 저장하기 위해 선언
        let newToken ="";

        const navigate = useNavigate();

        await axios.post("/api/member/admin/refreshToken", config,)
        .then((response) => {
          console.log('response--', response.data);

          if(response.data === "RefTokenNullInCookie") {
            alert("로그인해주세요.");
            navigate('/member/admin/signIn'); 
            
          } else if(response.data === "RefTokenNullInDB") {
            alert("정보가 없습니다. 로그인해주세요.");
            navigate('/member/admin/signIn'); 
            
          } else if(response.data === "RefTokenExpired") {
            alert("로그인 시간 만료. 다시 로그인해주세요.");
            navigate('/member/admin/signIn'); 

          } else {
            // 새로운 토큰 저장 
            newToken = store.dispatch({type: "accessToken", payload : response.data});
            console.log('새로 저장된 토큰', newToken);

          }

        })
        .catch();

        console.log('새로 저장된 토큰 확인', newToken);
        // newToken은 객체로 받아오기 때문에 payload로 입력 
        originalRequest.headers.authorization = `Bearer ${newToken.payload}`;
        
        //401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }

    // 응답 오류
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;