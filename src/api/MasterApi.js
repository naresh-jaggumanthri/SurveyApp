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

  //Disabilities
  getDisabilities() {
    return this.apiClient.get(null, "sahiya-masters/api/disability/getall");
  }
  // ULB
  getULBByDistrictId(params, data) {
    return this.apiClient.get(null, `sahiya-masters/api/ulb/getbydistrictid/${data}`, params);
  };
  getByBlockTypeULB(params, data) {
    return this.apiClient.get(null, `sahiya-masters/api/location-hierarchy/getbyblocktype/${data}`, params);
  };
  // ULB Block 
  getBlockByULBId(params, data) {
    return this.apiClient.get(null, `sahiya-masters/api/block/getbyulbid/${data}`, params);
  };
  // Residential
  getResidential(params) {
    return this.apiClient.get(null, `sahiya-masters/api/trainingmode/getall`, params);
  };

  //Death Reasons
  getDeathReasons() {
    return this.apiClient.get(null, "sahiya-masters/api/deathreason/getall");
  }

  //Caste
  getCastes() {
    return this.apiClient.get(null, "sahiya-masters/api/caste/getall");
  }

  //Birth Status
  getBirthStatus() {
    return this.apiClient.get(null, "sahiya-masters/api/birthstatus/getall");
  }

  //Anganwadi
  getAnganwadi() {
    return this.apiClient.get(null, "sahiya-masters/api/anganwadi/getall");
  }

  getMaritalStatus() {
    return this.apiClient.get(null, "sahiya-masters/api/marital-status/getall");
  }
  //incentive masters by siraj
  getMasterIncentives() {
    return this.apiClient.get(null, "sahiya-masters/api/masterincentives/getallincentives");
  };
  getAllIncentiveMatrixRecords() {
    return this.apiClient.get(null, "sahiya-masters/api/incentivematrix/getall");
  };
  getAllApprovalStatus() {
    return this.apiClient.get(null, "sahiya-masters/api/formapprovalstatus/getall");
  };
  getAllServiceApprovalData() {
    return this.apiClient.get(null, "sahiya-masters/api/serviceapproval/getall");
  };
  getMasterIncentivesfnyear(params) {
    return this.apiClient.get(null, "sahiya-utility/api/incentive/getfnyear", params);
  };

  getNDDList(params) {
    return this.apiClient.get(null, "sahiya-utility/api/ndd/getbyusercode", params);
  };
  // sahiya diary
  getMeetingType() {
    return this.apiClient.get(null, "sahiya-masters/api/sdmeeting/getall");
  };
  getMeetingVenue() {
    return this.apiClient.get(null, "sahiya-masters/api/meetingvenue/getall");
  };
  getAllHeaderReportes() {
    return this.apiClient.get(null, "sahiya-masters/api/sdquesgrp/getall");
  };
  getAllHeaderQuestions() {
    return this.apiClient.get(null, "sahiya-masters/api/sdques/getall");
  };
  getAllMeetingList(params) {
    return this.apiClient.get(null, "sahiya-utility/api/sahiyadiarymeeting/getallmeetinglist", params);
  };

  getEducationLevel() {
    return this.apiClient.get(
      null,
      "sahiya-masters/api/education-level/getall"
    );
  }
  //Symtoms GetAll
  getAllSymtoms() {
    return this.apiClient.get(null, "sahiya-masters/api/symptom/getall");
  }

  getDeathTypes() {
    return this.apiClient.get(null, "sahiya-masters/api/deathcause/getall");
  }
  getFinancialYear() {
    return this.apiClient.get(null, "sahiya-masters/api/financial-year/getall");
  }
  getBlockTypes() {
    return this.apiClient.get(null, "sahiya-masters/api/blocktype/getall");
  }
  getBlockTypesForBoth(data) {
    console.log("getBlockTypesForBoth", data);
    return this.apiClient.get(null, `sahiya-masters/api/blocktype/getbylocationtypeid/${data}`);
  }
  getLocationTypes() {
    return this.apiClient.get(null, "sahiya-masters/api/location/getall");
  }

  getDeathPlaces() {
    return this.apiClient.get(null, "sahiya-masters/api/deathplace/getall");
  }
  getAllLocations(payload, params) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-masters/api/location/getlocations`,
      params,
      payload
    );
  }

  getAllMonths() {
    return this.apiClient.get(null, `sahiya-masters/api/master-month/getall`);
  }
  getAllVaccinations() {
    return this.apiClient.get(null, `sahiya-masters/api/vaccination/getall`);
  }
  getFamilyStatus() {
    return this.apiClient.get(null, `sahiya-masters/api/familystatus/getall`);
  }
  getAllFormApprovalStatus() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/formapprovalstatus/getall`
    );
  }
  getAllServiceApprovalStatus() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/serviceapproval/getall`
    );
  }
  getAllApprovalMatrix() {
    return this.apiClient.get(null, `sahiya-de/api/apr-matrix/getall`);
  }

  //sahiya-masters/api/anganwadi/getbyvillageid/130203
  getAnganwadiByVillageId(villageId) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/anganwadi/getbyvillageid/${villageId}`
    );
  }

  //sahiya-masters/api/gender/getall
  getAllMastergenders() {
    return this.apiClient.get(null, `sahiya-masters/api/gender/getall`);
  }
  getIllnessType(params) {
    return this.apiClient.get(
      null,
      "sahiya-masters/api/birthstatus/getbystatus",
      params
    );
  }

  getServiceProviders() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/serviceproviders/getall`
    );
  }

  getAllBloodGroups() {
    return this.apiClient.get(null, `sahiya-masters/api/blood-group/getall`);
  }

  //https://japitdev.dhanushinfotech.com/sahiya-masters/api/financial-year/getmothdata?userCode=13896
  //sahiya-masters/api/financial-year/getmothdata
  getAllMonthData() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/financial-year/getmothdata`
    );
  }

  getAllMasterMeetingNames() {
    return this.apiClient.get(null, `sahiya-masters/api/meetingtitle/getall`);
  }
  getAllMasterMeetingTypes() {
    return this.apiClient.get(null, `sahiya-masters/api/meetingtype/getall`);
  }
  getAllConMethods() {
    return this.apiClient.get(null, `sahiya-masters/api/conmethods/getall`);
  }
  getAllHscGpByVillageIds(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-masters/api/village/gethierarchylist`,
      params,
      data
    );
  }
  getAllAssessment() {
    return this.apiClient.get(null, `sahiya-masters/api/assessment/getall`);
  }

  getAllVisitPlaces() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/master-visit-place/getall`
    );
  }

  getAllAdvWorks() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/master-adv-work/getall`
    );
  }

  getAdvWorksByLocationTypeId(id) {
    // const params={
    //   userCode:278001
    // };
    return this.apiClient.get(null, `sahiya-masters/api/master-adv-work/getbylocationtypeid/${id}`);

  }

  getVisitPlaceByLocationTypeId(id) {
    return this.apiClient.get(null, `sahiya-masters/api/master-visit-place/getbylocationtypeid/${id}`);
  }


  getAllActivityStatus() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/master-activity-status/getall`
    );
  }

  getAllActivityRoles() {
    return this.apiClient.get(null, `sahiya-masters/api/role/getall`);
  }

  getAllIncentive() {
    return this.apiClient.get(
      null,
      // https://japitdev.dhanushinfotech.com/sahiya-masters/api/masterincentives/getall
      `sahiya-masters/api/masterincentives/getall`
    );
  }

  getAllFiles(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-files/api/files/getallfiles`,
      params,
      data
    );
  }

  getAllVillagesBAF(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-masters/api/village/getvillagelist`,
      params,
      data
    );
  }
  getAllHbycQuestions() {
    return this.apiClient.get(null, `sahiya-masters/api/hbycquestions/getall`);
  }

  getAllSahiyaBadges() {
    return this.apiClient.get(null, `sahiya-masters/api/sahiyabadge/getall`);
  }

  getAllPvtgsTypes() {
    return this.apiClient.get(null, `sahiya-masters/api/pvtgstype/getall`);
  }

  getAllAshaCertResult() {
    return this.apiClient.get(null, `sahiya-masters/api/ashacert/getall`);
  }

  getHofMemberData(params) {
    return this.apiClient.get(
      null,
      "sahiya-utility/api/family/getallhof",
      params
    );
  }

  //Wards  Urban Sahiya
  getWards(id) {
    return this.apiClient.get(null, `sahiya-masters/api/ward/getbyblockid/${id}`);
  }

  //Master VisitSupervised list
  getVisitSupervised() {
    return this.apiClient.get(null, `sahiya-masters/api/hvsupervised/getall`);
  }

  //ANC Master
  getAncMaster() {
    return this.apiClient.get(null, `sahiya-masters/api/gov-institute/getall`);
  }

  //MeetingType Master
  getMeetingTypeaster() {
    return this.apiClient.get(null, `sahiya-masters/api/other/meeting/getall`);
  }//OtherMeeting Service Master
  getOtherMeetingServiceMaster() {
    return this.apiClient.get(null, `sahiya-masters/api/omservice/getall`);
  }

  getAllDieseaseType() {
    return this.apiClient.get(null, `sahiya-masters/api/diseasetype/getall`);
  }

  getAllTrainingsType() {
    return this.apiClient.get(null, `sahiya-masters/api/mastertrainingtype/getall`);
  }


  //hbyc-hbnc masters financial year
  getHbycHbncFyear() {
    return this.apiClient.get(null, `sahiya-masters/api/financial-year/get-hbnc-hbyc-year`);
  }

  //get all home visit questions
  getAllHomeVisitQuestions() {
    return this.apiClient.get(null, `sahiya-masters/api/questions/getall`);
  }

  //get all home visit question group
  getAllHomeVisitQuestionsGroup() {
    return this.apiClient.get(null, `sahiya-masters/api/quesgroup/getall`);
  }

  //get all home visit status
  getAllHomeVisitStatus() {
    return this.apiClient.get(null, `sahiya-masters/api/hvstatus/getall`);

  }

  //get all home visit days
  getAllHomeVisitDays() {
    return this.apiClient.get(null, `sahiya-masters/api/hvdays/getall`);
  }


  //get all home visit mapping
  getAllHomeVisitMapping() {
    return this.apiClient.get(null, `sahiya-masters/api/quesvisitmapping/getall`);
  }


  //warm type
  getAllWarmTypes() {
    return this.apiClient.get(null, `sahiya-masters/api/warmtype/getall`);
  }

  //govt-institution
  getAllGovtInstitutes() {
    return this.apiClient.get(null, `sahiya-masters/api/gov-institute/getall`);
  }
  //APR-financial-year
  getAllAPRFinancialYear() {
    return this.apiClient.get(null, `sahiya-utility/api/apr/getapryear`);
  }
  //missed Reasons
  getAllMissedReasons() {
    return this.apiClient.get(null, `sahiya-masters/api/missedreason/getall`);
  }

  //diseases Types
  getAllDiseasesTypes() {
    return this.apiClient.get(null, `sahiya-masters/api/diseasetype/getall`);
  }
  getAllMasterDiseasesTypes() {
    return this.apiClient.get(null, `sahiya-masters/api/masterdiseasetype/getall`);
  }
  getAllMasterFollowupSurvery(params) {
    return this.apiClient.get(null, `sahiya-utility/api/homesurvey/followupsurvery`, params);
  }
  //Meeting Venues
  getAllMeetingVenues() {
    return this.apiClient.get(null, `sahiya-masters/api/meetingvenue/getall`);
  }

  //Participants masters
  getAllParticipants() {
    return this.apiClient.get(null, `sahiya-masters/api/om/participant/getall`);
  }

  //Wellness Activity list
  getAllWellnessActivity() {
    return this.apiClient.get(null, `sahiya-masters/api/wellness/activity/getall`);
  }

  //push notifications by kiran
  getPushNotificationData(params) {
    return this.apiClient.get(
      null,
      "sahiya-utility/api/pushnotificationhistory/getallnotification",
      params
    );
  }

  //push notifications by kiran
  updateReadandDelete(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/pushnotificationhistory/save`,
      params,
      data
    );
  }

  //VHsnc changes by kiran
  getAllDesignations() {
    return this.apiClient.get(null, `sahiya-masters/api/designation/getall`);
  }

  //masters anc-visit
  getAllMastersAncVisits() {
    return this.apiClient.get(null, `sahiya-masters/api/anc-visit/getall`);
  }


  //get all mtc symptoms
  getAllMastersMtcSymptoms() {
    return this.apiClient.get(null, `sahiya-masters/api/mastermtcsymptom/getall`);
  }

  // getMasterServiceAvlConfig() {
  //   return this.apiClient.get(null, `sahiya-masters/api/masterserviceavlconfig/getbymodeid/${id}`);
  // }

  getMasterServiceAvlConfig(id) {
    return this.apiClient.get(null, `sahiya-masters/api/masterserviceavlconfig/getbymodeid/${id}`);
    // return this.apiClient.get(null, `sahiya-masters/api/masterserviceavlconfig/getbystaus/${id}`);
  }

  getMasterQuarterAll() {
    return this.apiClient.get(null, `sahiya-masters/quater/getAll`);
  }

  getMasterSubjectsAll() {
    return this.apiClient.get(null, `sahiya-masters/api/subject/getall`);
  }

  getAllCbacQuestions() {
    return this.apiClient.get(null, `sahiya-masters/api/cbacquestions/getall`)
  }
  getAllCbacDepress() {
    return this.apiClient.get(null, `sahiya-masters/api/cbacdepress/getall`)
  }
  getMasterAgeGroup() {
    return this.apiClient.get(null, `sahiya-masters/api/masteragegroup/getall`);
  }

  getAllCBACByVillage(params) {
    return this.apiClient.get(null, `sahiya-utility/api/cbac/getallbyvillage`, params);
  }

  getCurrentQuarters(params) {
    // const params={
    //  type:"cur"
    // };
    return this.apiClient.get(null, `sahiya-masters/quater/getquarterbytype`, params);
  }

  getPreviousQuarters(params) {
    // const params={
    //   type:"pre"
    //  };
    return this.apiClient.get(null, `sahiya-masters/quater/getquarterbytype`, params);
  }

  getAMBCurrentQuarters(paramsUser) {
    const params = {
      userCode: paramsUser.userCode,
      type: "cur"
    };
    return this.apiClient.get(null, `sahiya-utility/api/ifa/getfnyearmonthbytype`, params);
  }

  getAMBPreviousQuarters(paramsUser) {
    const params = {
      userCode: paramsUser.userCode,
      type: "pre"
    };
    return this.apiClient.get(null, `sahiya-utility/api/ifa/getfnyearmonthbytype`, params);
  }

  getLockedUsersByUserCode(paramsUser) {
    return this.apiClient.get(null, `sahiya-utility/api/user/getlockusersbyusercode`, paramsUser);
  }
  //training apis
  getTrainingModuleByUserCode(userId, paramsUser, payload) {
    //return this.apiClient.postParamsPayload(null, `sahiya-utility/api/training/gettrainingbyuserid/${userId.id}`, paramsUser, payload);
    return this.apiClient.postParamsPayload(null, `sahiya-utility/api/training/gettrainingbyuserid`, paramsUser, payload);
  }
  getOnlineTrainingModuleByUserCode(userId, paramsUser, payload) {
    //return this.apiClient.postParamsPayload(null, `sahiya-utility/api/training/gettrainingbyuserid/${userId.id}`, paramsUser, payload);
    return this.apiClient.postParamsPayload(null, `sahiya-utility/api/training/getonlinetrnglist`, paramsUser, payload);
  }
  getAllChildCountByUserCode(paramsUser) {
    return this.apiClient.get(null, `sahiya-utility/api/ifa/gettotalchild`, paramsUser);
  }

  getAllGrievanceCategoriesByUserCode(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/grievancectgr/getall`, paramsUser);
  }
  getAllGrievanceHistoryByUserCode(paramsUser) {
    return this.apiClient.get(null, `sahiya-utility/api/grievance/getbyusercode`, paramsUser);
  }

  //Meeting Places: - sahiya-masters/api/meetingplace/getall
  getAllMaaMeetingPlaces() {
    return this.apiClient.get(null, `sahiya-masters/api/meetingplace/getall`);
  }

  //Services Received get all
  getAllServicesReceived() {
    return this.apiClient.get(null, `sahiya-masters/api/service-received/getall`);
  }

  //sahiya-masters/api/district/mtc/getcenterdetails
  //MTC center details
  getMTCCenterList(paramsUser, payload) {
    return this.apiClient.postParamsPayload(null, `sahiya-masters/api/district/mtc/getcenterdetails`, paramsUser, payload);
  }

  // monthly meeting
  getAllSahiyaMonthlyMtng() {
    return this.apiClient.get(null, `sahiya-masters/api/sahiyamtlmtng/getall`);
  };
  getAllSahiyaMonthlyMtngList(paramsUser) {
    return this.apiClient.get(null, `sahiya-utility/api/sahiya/monthly/meeting/getbyusercode`, paramsUser);
  };
  getMeetingFinacialYear(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/financial-year/getcuryear`, paramsUser);
  };
  getMeetingFinacialMonths(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/master-month/getmonths`, paramsUser);
  };

  getInventeryFamilyId(paramsUser) {
    return this.apiClient.get(null, `sahiya-utility/api/family/getallhof`, paramsUser);
  };

  //invetry
 
  getAllMasterInventoryItemType(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/itemtype/getall`, paramsUser);
  };

   // SAHIYA WEEKLY ACTIVITY REport

   getAllMasterWeeklyActivityReportQuestionType(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/weeklyactreport/getall`, paramsUser);
  };
  getAllMasterWeeklyActivityReportOtherType(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/weeklyotherreport/getall`, paramsUser);
  };

  // SAHIYA WEEKLY ACTIVITY CALENDAR
  getAllMasterWeeklyActivityQuestionType(paramsUser) {
    return this.apiClient.get(null, `sahiya-masters/api/weeklyactivity/getall`, paramsUser);
  };
 

}
