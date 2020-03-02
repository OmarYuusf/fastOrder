const initState = {
  allProducts: [],
  carts: [],
  token: "",
  isLogged: false,
  userData: [],
  admin: false
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

    case 'SAVE_CARTS' :
      return{
        ...state,
        carts:action.payload
      }

    case "SAVE_TOKEN":
      console.log(action.payload);
      return {
        ...state,
        token: action.payload,
        isLogged: true
      };
    case "CHECK":
      return {
        ...state,
        isLogged: true,
        token: action.payload
      };

    case "REMOVE_LOGGED":
      return {
        ...state,
        isLogged: false,
        admin:false
      };
    case "USER_DATA":
      return {
        ...state,
        userData: action.payload,
        isLogged: true
      };
    case "CHANGE_STATE":
      return {
        ...state,
        admin: true
      };
    case "DELETE_ITEMS":
      return {
        ...state,
        carts: state.carts.filter(items => items !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
