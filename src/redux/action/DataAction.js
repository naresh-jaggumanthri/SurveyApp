import { DATA_DETAILES_TYPE, LOGIN_DATA_TYPE } from "../actiontypes/DataTypes";

export const get_data_action = (data) => dispatch => {
      dispatch({ type: DATA_DETAILES_TYPE, data: data });
}

export const login_data_action = (data) => dispatch => {
      dispatch({ type: LOGIN_DATA_TYPE, data: data });
}
