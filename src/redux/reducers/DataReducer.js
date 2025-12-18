import { DATA_DETAILES_TYPE, LOGIN_DATA_TYPE } from "../actiontypes/DataTypes";
const initialState = {
  detailsStore: []
};
export default function DataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_DETAILES_TYPE:
      return {
        ...state,
        detailsStore: action.data,
      };
      case LOGIN_DATA_TYPE:
      return {
        ...state,
        loginData: action.data,
      };

    default: {
      return state;
    }
  }
}