import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants.js";
import axios from "axios";

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    }); //체크. 이부분이 좀 기가 막히다.
    //err를 그냥 페이로드로 보내버리면? 왜 화면이 깨지지?
    //반면에 이렇게 err.message로 보내면 왜 안 깨질까?
    // 깨지는 이유는?
    // 우선 homescreen에서 useSelect로 error를 가져왔는데?
    // 거기서 렌더를 할 때 <h2>{error}<h2> 이런식으로 렌더를 한다
    // 근데 error가 객체면? 저게 들어가지가 않는다.
    // 그래서 에러가 나는거다.
    // 깨지지 않으려면?
    //저기 안에 문자열이 들어가야하는데, 위와같이 err.message를 보내면
    // 안 깨진다.
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
