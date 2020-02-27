import axios from "axios";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(
      "http://fastorder.pythonanywhere.com/Products/"
    );
    try {
      const { data } = response;
      dispatch(getProductsLast(data));
      console.log(data);
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
    console.log(getState());
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
  return async dispatch => {
    const response = await axios.post(
      "http://fastorder.pythonanywhere.com/auth/token/login",
      {
        username: user,
        password: pass
      }
    );
    try {
      const data = response.data.auth_token;
      localStorage.setItem("token", data);
      dispatch(setToken(data));
      window.location.href = "/";
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
  return dispatch => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
};
