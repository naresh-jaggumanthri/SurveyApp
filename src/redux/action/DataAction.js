import { Alert } from "react-native";
import { DATA_DETAILES_TYPE, FAMILY_DATA, HOUSE_DATA, LOGIN_DATA_TYPE,LOGOUT_DATA_TYPE,VILLAGE_DATA } from "../actiontypes/DataTypes";

export const get_data_action = (data) => dispatch => {
      dispatch({ type: DATA_DETAILES_TYPE, data: data });
}

export const login_data_action = (data) => dispatch => {
      dispatch({ type: LOGIN_DATA_TYPE, data: data });
}
export const logout_data_action = (data) => dispatch => {
      dispatch({ type: LOGOUT_DATA_TYPE, data: data });
}

export const save_family_data=(data)=>dispatch=>{
       dispatch({ type:FAMILY_DATA, data: data });
}

export const save_house_data=(data)=>dispatch=>{
       dispatch({ type:HOUSE_DATA, data: data });
}
export const save_village_data=(data)=>dispatch=>{
       dispatch({ type:VILLAGE_DATA, data: data });
}
