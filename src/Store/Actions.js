import axios from "axios";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(
      "http://fastorder.pythonanywhere.com/Products/"
    );
    try {
      const { data } = response;
      dispatch(getProductsLast(data));
      console.log(getState());
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
        dispatch(setDeleteItem(newData))
    }
}

export const setDeleteItem = newData => {
    return{
        type:'DELETE_ITEMS',
        payload:newData
    }
}