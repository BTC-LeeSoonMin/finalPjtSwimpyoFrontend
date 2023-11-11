import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeParams: {
    cid: '', // 가맹점 코드
    partner_order_id: '', // 가맹점 주문번호
    partner_user_id: '', // 가맹점 회원 ID
    item_name: '', // 상품명
    quantity: 0, // 상품 수량
    total_amount: 0, // 총 금액
    vat_amount: 0, // 부가세 금액
    tax_free_amount: 0, // 비과세 금액
    approval_url: '', // 결제 성공 시 리디렉션 URL
    fail_url: '', // 결제 실패 시 리디렉션 URL
    cancel_url: '', // 결제 취소 시 리디렉션 URL
  },
}; // 리덕스 슬라이스의 초기상태

const ForKakaoPaySlice = createSlice({
  name: 'forkakaoPay',
  initialState,
  reducers: {
    setParams: (state, action) => {
      console.log("action.payload", action.payload);
      state.storeParams = action.payload;
    },
  },
});

export const ForKakaoPayAction = ForKakaoPaySlice.actions;
export default ForKakaoPaySlice;
