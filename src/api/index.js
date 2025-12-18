import ApiClient from "./ApiClient";
import MasterAPI from "./MasterApi";
import UserAPI from "./UserAPI";

export const apiClient = new ApiClient();

const combinedAPI = {
    user: new UserAPI(apiClient),
    master: new MasterAPI(apiClient),
  
  };

export default combinedAPI;