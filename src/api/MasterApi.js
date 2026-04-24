import { Alert } from "react-native";
import Base from "./BaseApi";
export default class MasterAPI extends Base {

  getStates(token) {
    return this.apiClient.get(null, "api/stateList", {}, token);
  }

  //Religions
  getReligions() {
    return this.apiClient.get(null, "sahiya-masters/api/religion/getall");
  }

  //2.get all districts
  getDistricts(token) {
    
    return this.apiClient.get(null, "api/districtList/24", {}, token);
  }

  //3.get all blocks
  getBlocksByDistrictId(districtId, token) {
    return this.apiClient.get(null, `api/blockList/${districtId}/`, {}, token);
  }

  //3.a get all clusters
  getClusters() {
    return this.apiClient.get(null, "sahiya-masters/api/cluster/getall");
  }

  //3.b get all hsw/hwc
  getHsw() {
    return this.apiClient.get(null, "sahiya-masters/api/hschwc/getall");
  }

  //3.c get all gram-panchayats
  getGramPanchayats(blockId, token) {
    return this.apiClient.get(null, `api/panchayatList/${blockId}/`, {}, token);
  }

  //4. get all villages
  getVillagesByPanchayatId(panchayatId, token) {
    return this.apiClient.get(null, `api/villageList/${panchayatId}/`, {}, token);
  }

  //banks list
  getBanks(token) {
    return this.apiClient.get(null, "api/bankList", {}, token);
  }

  
// GET /api/master/relationship
getRelationship = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/relationship`,{},token);
    // Alert.alert('Success', 'Relationship data fetched successfully!'+JSON.stringify(response));
    return response;
  } catch (error) {
    console.error('Error fetching relationship data:', error);
    Alert.alert('Error', 'Failed to fetch relationship data. Please try again later.');
    throw error;
  }
}
// GET /api/master/gender
getGender = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/gender`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching gender data:', error);
    Alert.alert('Error', 'Failed to fetch gender data. Please try again later.');
    throw error;
  }
}

// GET /api/master/education
getEducation = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/education`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching education data:', error);
    Alert.alert('Error', 'Failed to fetch education data. Please try again later.');
    throw error;
  }
}
// GET /api/master/social-category
getSocialCategory = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/social-category`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching social category data:', error);
    Alert.alert('Error', 'Failed to fetch social category data. Please try again later.');
    throw error;
  }
}
// GET /api/master/drinking-water-source
getDrinkingWaterSource = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/drinking-water-source`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching drinking water source data:', error);
    Alert.alert('Error', 'Failed to fetch drinking water source data. Please try again later.');
    throw error;
  }
} 
// GET /api/master/respondent-identity
getRespondentIdentity = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/respondent-identity`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching respondent identity data:', error);
    Alert.alert('Error', 'Failed to fetch respondent identity data. Please try again later.');
    throw error;
  }
} 
// GET /api/master/migration-sector
getMigrationSector = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/migration-sector`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching migration sector data:', error);
    Alert.alert('Error', 'Failed to fetch migration sector data. Please try again later.');
    throw error;
  }
} 
// GET /api/master/migration-period
getMigrationPeriod = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/migration-period`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching migration period data:', error);
    Alert.alert('Error', 'Failed to fetch migration period data. Please try again later.');
    throw error;
  }
}
// GET /api/master/irrigation-source
getIrrigationSource = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/irrigation-source`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching irrigation source data:', error);
    Alert.alert('Error', 'Failed to fetch irrigation source data. Please try again later.');
    throw error;
  }
}
// GET /api/master/primary-occupation
getPrimaryOccupation = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/primary-occupation`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching primary occupation data:', error);
    Alert.alert('Error', 'Failed to fetch primary occupation data. Please try again later.');
    throw error;
  }
}
// GET /api/master/land-holding
getLandHolding = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/land-holding`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching land holding data:', error);
    Alert.alert('Error', 'Failed to fetch land holding data. Please try again later.');
    throw error;
  }
}
// GET /api/master/livestock-activity
getLivestockActivity = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/livestock-activity`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching livestock activity data:', error);
    Alert.alert('Error', 'Failed to fetch livestock activity data. Please try again later.');
    throw error;
  }
}
// GET /api/master/kishan-scheme
getKishanScheme = async (token) => {
  try {
    const response = await this.apiClient.get(null,`api/master/kishan-scheme`,{},token);
    return response;
  } catch (error) {
    console.error('Error fetching kishan scheme data:', error);
    Alert.alert('Error', 'Failed to fetch kishan scheme data. Please try again later.');
    throw error;
  } 
} 
 

}
