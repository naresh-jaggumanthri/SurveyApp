import { DATA_DETAILES_TYPE, FAMILY_DATA, HOUSE_DATA, LOGIN_DATA_TYPE, VILLAGE_DATA } from "../actiontypes/DataTypes";
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
      case HOUSE_DATA:
        return {
        ...state,
        houseData: action.data,
      };
      
      case FAMILY_DATA:
        return {
        ...state,
        familyData: action.data,
      };
      case VILLAGE_DATA:
        return {
        ...state,
        villageData: action.data,
      };

    default: {
      return state;
    }
  }
}