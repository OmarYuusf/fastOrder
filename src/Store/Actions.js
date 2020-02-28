import axios from "axios";
import { BASE_URL } from "../Constant/Constant";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(
      "http://fastorder.pythonanywhere.com/Products/"
    );
    try {
      const { data } = response;
      dispatch(getProductsLast(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductsLast = data => {
  return {
    type: "GET_DATA",
    payload: data
  };
};

//  END OF GET DATA

export const newChange = (item, value) => {
  return (dispatch, getState) => {
    item.count = parseInt(value.target.value);
  };
};

export const addToList = item => {
  return (dispatch, getState) => {
    dispatch(setToItem(item));
  };
};

export const setToItem = item => {
  return {
    type: "SET_TO_LIST",
    payload: item
  };
};

export const deleteItem = newData => {
  return dispatch => {
    dispatch(setDeleteItem(newData));
  };
};

export const setDeleteItem = newData => {
  return {
    type: "DELETE_ITEMS",
    payload: newData
  };
};

export const login = (user, pass) => {
  return async (dispatch, getState) => {
    const response = await axios.post(
      `${BASE_URL}auth/jwt/create/`,
      {
        username: user,
        password: pass
      }
    );
    try {
      const data = response.data.access;
      localStorage.setItem("token", data);
      dispatch(setToken(data));
      console.log(getState());
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
    }
  };
};

export const setToken = data => {
  return {
    type: "SAVE_TOKEN",
    payload: data
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.removeItem("token");
    dispatch(removeLogged());
    window.location.href = "/";
  };
};

export const removeLogged = () => {
  return {
    type: "REMOVE_LOGGED"
  };
};

export const getUserData = token => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${BASE_URL}auth/users/me/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    try {
      const { data } = response;
      dispatch(setDataUser(data));

      if (data.username == "admin1") {
        dispatch(changeState());
        console.log(getState());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setDataUser = data => {
  return {
    type: "USER_DATA",
    payload: data
  };
};

export const changeState = () => {
  return {
    type: "CHANGE_STATE"
  };
};

export const checkUser = token => {
  return (dispatch, getState) => {
    dispatch(setCheckToken(token));
  };
};

export const setCheckToken = token => {
  return {
    type: "CHECK",
    payload: token
  };
};
