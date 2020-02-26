const initState = {
  allProducts: [],
  carts: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DATA":
      action.payload.map(counter => {
        counter.count = 1;
      });
      return {
        ...state,
        allProducts: action.payload
      };
    case "SET_TO_LIST":
      const res = state.carts.filter(elements => elements == action.payload);
      if (res.length > 0) {
        alert("مضاف بالفعل");
        return {
          ...state
        };
      } else {
        return {
          ...state,
          carts: state.carts.concat(action.payload)
        };
      }

    case "DELETE_ITEMS":
      return {
        ...state,
        carts: state.carts.filter(items => items != action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
