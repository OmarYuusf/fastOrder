import axios from "axios";
import { BASE_URL } from "../Constant/Constant";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${BASE_URL}Products/`);
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
    const data = getState().carts;
    localStorage.setItem("cartsData", JSON.stringify(data));
  };
};

export const setToItem = item => {
  return {
    type: "SET_TO_LIST",
    payload: item
  };
};

export const getCarts = carts => {
  return {
    type: "SAVE_CARTS",
    payload: carts
  };
};

export const deleteItem = newData => {
  return (dispatch, getState) => {
    dispatch(setDeleteItem(newData));
    const data = getState().carts;
    localStorage.setItem("cartsData", JSON.stringify(data));
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
    const response = await axios.post(`${BASE_URL}auth/jwt/create/`, {
      username: user,
      password: pass
    });
    try {
      const data = response.data.access;
      localStorage.setItem("token", data);
      dispatch(setToken(data, user, pass));
      console.log(getState());
      if (user === "admin1") {
        window.location.href = "/";
      } else {
        window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setToken = (data, name, password) => {
  return {
    type: "SAVE_TOKEN",
    payload: data,
    emailData: { name: name, password: password }
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartsData");
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

      if (data.username === "admin1") {
        dispatch(changeState());
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

export const sendOrder = (carts, userName) => {
  return async (dispatch, getState) => {
    const timeNow = new Date().toLocaleString();
    const carts = getState().carts;
    carts.forEach(element => {
      delete element.id;
    });
    const response = await axios.post(`${BASE_URL}poll/poll/`, {
      title: userName,
      choices: carts,
      time: timeNow
    });
    try {
      alert("تم توصيل الأوردر بنجاح");
      localStorage.removeItem("cartsData");
      dispatch(deleteAllCart())
    } catch (err) {
      alert("حدث خطأ");
    }
  };
};

export const deleteAllCart = () => {
  return {
    type: "DELETE_ORDER"
  };
}

export const getOrders = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${BASE_URL}poll/poll/`);
    try {
      const { data } = response;
      dispatch(setOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setOrders = data => {
  return {
    type: "SET_ORDERS",
    payload: data
  };
};

export const deleteOrder = id => {
  return async (dispatch, getState) => {
    const response = await axios.delete(`${BASE_URL}poll/poll/${id}`);
    try {
      dispatch(getOrders());
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = state => {
  return async dispatch => {
    const response = await axios.post(`${BASE_URL}Products/`, {
      item: state.item,
      price: state.price,
      count: 1
    });
    try {
      dispatch(getProducts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = id => {
  return async dispatch => {
    const response = await axios.delete(`${BASE_URL}Products/${id}`);
    try {
      dispatch(getProducts());
    } catch (err) {
      console.log(err);
    }
  };
};
