import NetInfo from "@react-native-community/netinfo";
import { AppDataSource } from "../../../database/database";
import { MasterSurvey } from "../../../database/entities/MasterSurvey";
import { Alert } from "react-native";

/**
 * @param {string} key - The master name (e.g., 'gender')
 * @param {number} localId - The index/ID stored in local DB
 * @param {function} apiCall - The function to call if online
 * @param {string} token - Auth token
 */
export const getMasterData = async (key, localId, apiCall, token) => {
    const state = await NetInfo.fetch();

    if (state.isConnected && state.isInternetReachable) {
        try {
            console.log(`🌐 Fetching ${key} from API...`);
            const response = await apiCall(token);
            const data = response?.data || response;
            
            // Optional: Update local DB in background so it's fresh for next offline use
            //saveLocally(key, data, localId - 1);
           

            // Alert.alert('Success', `${JSON.stringify(data)} data fetched successfully!`); // Optional success alert
            
            return data;
        } catch (error) {
            console.warn(`API failed for ${key}, falling back to Local DB`, error);
        }
    }

    // OFFLINE or API FAILED: Fetch from TypeORM
    console.log(`📂 Fetching ${key} from Local DB...`);
    const repo = AppDataSource.getRepository(MasterSurvey);
    const localData = await repo.findOneBy({ localId: localId });

    return localData ? JSON.parse(localData.masterJson) : [];
};
    