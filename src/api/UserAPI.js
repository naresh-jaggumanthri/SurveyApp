import Base from "./BaseApi";

export default class UserAPI extends Base {
  captchaImg() {
    return this.apiClient.get(null, "sahiya-login/captcha/captchaImg");
  }
  signIn(intl, params, data, token) {
    return this.apiClient.postParamsPayload(
      intl,
      "api/auth/login",
      params,
      data,
      token
    );
  }

  saveResetPassword(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-login/login/resetpwd",
      params,
      data
    );
  }
  //logout api
  //https://japitdev.dhanushinfotech.com/sahiya-login/login/logout?userId=1
  logout(intl, params, data) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-login/login/logout`,
      params,
      data
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/user/getbyusercode/1047655
  //sahiya-de/user/getbyid
  getProfileById(id) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/user/getbyusercode/${id}`
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-masters/api/anganwadi/getbyusercode/36262603
  getAnganwadisMastersByCode(userCode) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/anganwadi/getbyusercode/${userCode}`
    );
  }
  createsahiyaprofile(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/user/save",
      params,
      data
    );
  }

  //sahiya-de/api/user/getall
  //return this.apiClient.post(null,`sahiya-sangi/api/list/getsahiyalist`,payload);

  getSahiyaList(intl, params, payload) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-utility/api/user/getall`,
      params,
      payload
    );
    console.log("getall>>", JSON.stringify(payload));
  }

  //based on location get sahiya list
  getSahiyaListByLocation(intl, params, payload) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-utility/api/stats/getallservicesdata`,
      params,
      payload
    );
    console.log("getallservicesdata>>", JSON.stringify(payload));
  }

  saveDeliveryDetailsReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/delivery/save",
      params,
      data
    );
  }

  savePregnantWomenReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/pw/save",
      params,
      data
    );
  }
  //based on location get services status
  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/approval/servicesstatus
  getAllServicesListStatus({ }, payload) {
    return this.apiClient.post(
      {},
      `sahiya-utility/api/approval/servicesstatus`,
      payload
    );
  }

  getAllServicesListStatusParams({ }, params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/approval/servicesstatus`,
      params,
      payload
    );
  }

  saveFamilyReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/family/save",
      params,
      data
    );
  }
  saveHomeSurveyReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/homesurvey/save",
      params,
      data
    );
  }
  // sendNotification(data) {
  //   return this.apiClient.postParamsPayload(
  //     "sahiya-notification/api/fcm-notification/send/notification",
  //     data
  //   );
  // }

  // sendNotification(intl, params, data) {
  //   return this.apiClient.postParamsPayload(
  //     intl,
  //     "sahiya-notification/api/fcm-notification/send/notification",
  //     params,
  //     data
  //   );
  // }
  saveAssessmentReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/assessment/save",
      params,
      data
    );
  }

  savePregnantWomenReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/pw/save",
      params,
      data
    );
  }
  getAssessmentPro(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/assessment/assessment-projection",
      params,
      data
    );
  }
  saveAncReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/anc/save",
      params,
      data
    );
  }

  saveEligibleCoupleReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/ec/save",
      params,
      data
    );
  }

  saveEligibleCoupleTrackingReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/ec-tracking/save",
      params,
      data
    );
  }

  saveOtherMeetingReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/sahiya/other/meeting/save",
      params,
      data
    );
  }

  saveChildBirthReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/child-reg/save",
      params,
      data
    );
  }

  saveMTCReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/mtc/save",
      params,
      data
    );
  }

  saveMAAReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/maa/save",
      params,
      data
    );
  }
  saveAMBReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/ifa/save",
      params,
      data
    );
  }

  saveChildVaccinationReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/child-vaccination/save",
      params,
      data
    );
  }

  saveChildDeathReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/death-reg/save",
      params,
      data
    );
  }

  saveHbycReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/hbyc/save",
      params,
      data
    );
  }

  saveHbncReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/hbnc/save",
      params,
      data
    );
  }

  saveAprReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/apr/save",
      params,
      data
    );
  }
  saveAprRegNew(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/apr-new/save",
      params,
      data
    );
  }

  saveMprReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/mpr/save",
      params,
      data
    );
  }
  saveMprRegNew(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/mpr/save",
      params,
      data
    );
  }

  savePlaReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/plameeting/save",
      params,
      data
    );
  }

  saveVhsncReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/vhsnc/save",
      params,
      data
    );
  }

  saveIncentivesReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/incentive/save",
      params,
      data
    );
  }

  //save home visit
  saveHomeVisit(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/homevisit/save",
      params,
      data
    );
  }

  getFamilyListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/family/getallbyusercode`,
      params
    );
  }
  getFamilyListByIdNew(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/family/getallbyusercode`,
      params,
      payload
    );
  }

  getHomeSurveyListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homesurvey/getallbyusercode`,
      params
    );
  }
  getAssessMentListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/assessment/getallbyusercode`,
      params
    );
  }
  getHbycListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/hbyc/getallbyusercode`,
      params
    );
  }
  getIncentivesListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/incentive/getallbyusercode`,
      params
    );
  }

  getEcListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/ec/getallbyusercode`,
      params
    );
  }
  getEcListByIdNew(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/ec/getallbyusercode`,
      params,
      payload
    );
  }
  getEcTrackingListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/ect/getallbyusercode`,
      params
    );
  }
  getEcTrackingListByIdNew(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/ect/getallbyusercode`,
      params,
      payload
    );
  }

  getOtherMeetingListByUserCode(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/sahiyaothermeeting/getallbyusercode`,
      params
    );
  }
  getBirthListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/child/getallbyusercode`,
      params
    );
  }
  getDeathListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/death/getallbyusercode`,
      params
    );
  }
  getChildVaccListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/childvaccination/getallbyusercode`,
      params
    );
  }
  getHbycListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/hbyc/getallbyusercode`,
      params
    );
  }
  getHbncListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/hbnc/getallbyusercode`,
      params
    );
  }
  getHomeVisitListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homevisit/getallbyusercode`,
      params
    );
  }
  getMprListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mpr/getallbyusercode`,
      params
    );
  }

  getAprListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/apr/getallbyusercode`,
      params
    );
  }

  getVhsncListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-de/api/vhsnc/getallbyusercode`,
      params
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/apr-new/getby-usercodeandmonth?userCode=13896
  getAprListByIdMonth(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-utility/api/apr/getby-usercodeandmonth`,
      params,
      data
    );
  }

  getPlaListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/plameeting/getallbyusercode`,
      params
    );
  }

  //sahiya-utility/api/plameeting/getscheduleddates
  getBacklogPlaListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/plameeting/getscheduleddates`,
      params
    );
  }

  getPwListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/pw/getallbyusercode`,
      params
    );
  }

  getAncListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/anc/getallbyusercode`,
      params
    );
  }

  getDeliveryListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/delivery/getallbyusercode`,
      params
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-de/api/approve/user?userCode=206701
  sendProfileApproval(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-de/api/approve/profile`,
      params,
      data
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-de/api/approve/service?userCode=206701
  sendFormApproval(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-de/api/approve/service`,
      params,
      data
    );
  }

  // saveFcmNotificationToken(intl, params, data) {
  //   return this.apiClient.postParamsPayload(
  //     intl,
  //     "sahiya-de/api/assessment/save",
  //     params,
  //     data
  //   );
  // }
  saveFcmNotificationToken(payload) {
    return this.apiClient.post(
      null,
      `sahiya-notification/api/fcm-notification/token/save`,
      payload
    );
  }

  doResetPassword(payload) {
    return this.apiClient.post(null, `sahiya-login/login/resetpwd`, payload);
  }

  getNewPassword(params) {
    return this.apiClient.get(null, `sahiya-login/login/getpwd`, params);
  }

  saveProfilePic(params, body) {
    //return this.apiClient.upload(`sahiya-files/api/file/upload`,params, body, callback);
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/upload`,
      body,
      params,
      true
    );
  }

  saveOtherMeetingUpload(params, body) {
    //return this.apiClient.upload(`sahiya-files/api/file/upload`,params, body, callback);
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/sahiyameeting/upload`,
      body,
      true
    );
  }

  saveWellnessActivityUpload(params, body) {
    //return this.apiClient.upload(`sahiya-files/api/file/upload`,params, body, callback);
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/sahiyameeting/upload`,
      body,
      true
    );
  }

  saveMprCaseStudy(params, body) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/upload`,
      body,
      params,
      true
    );
  }

  //for ekyc
  saveEkycProfilePic(params, body) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/upload/image`,
      body,
      params,
      true
    );
  }

  //for ekyc
  // https://japitdev.dhanushinfotech.com/sahiya-aadharauth/uidai/v1/otp
  fetchOTPByAadharId(payload) {
    return this.apiClient.post(null, `sahiya-aadharauth/uidai/v1/otp`, payload);
  }

  //sahiya-aadharauth/uidai/v1/ekyc
  getEkycData(payload) {
    return this.apiClient.post(
      null,
      `sahiya-aadharauth/uidai/v1/ekyc`,
      payload
    );
  }

  getAllAssessment() {
    return this.apiClient.get(null, `sahiya-masters/api/assessment/getall`);
  }
  getAllAssessmentGroup() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/assessmentgroup/getall`
    );
  }
  // saveFcmNotificationToken(payload) {
  //   //https://japitdev.dhanushinfotech.com/sahiya-notification/api/fcm-notification/token/save
  //   return this.apiClient.post(null, `sahiya-notification/api/fcm-notification/token/save`, payload);
  // }
  sendNotification(payload) {
    //https://japitdev.dhanushinfotech.com/sahiya-notification/api/fcm-notification/send/notification
    return this.apiClient.post(
      null,
      `sahiya-notification/api/fcm-notification/send/notification`,
      payload
    );
  }
  getRationcardByID(payload) {
    return this.apiClient.post(null, `MSBY/pds/pds/PDSABUA`, payload);
  }

  // getFcmToken(userID) {
  //   return this.apiClient.get(null, `sahiya-notification/api/fcm-notification/gettoken?userId=${userID}`);
  // }
  getFcmToken(intl, params) {
    return this.apiClient.get(
      null,
      `sahiya-notification/api/fcm-notification/gettoken`,
      params
    );
  }

  //https://japitqa.dhanushinfotech.com/sahiya-masters/api/anganwadi/getbyvillageids?userCode=10005
  getAnganwadisByVillageIds(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-masters/api/anganwadi/getbyvillageids`,
      params,
      data
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-de/api/ec-reg/getbyid/92

  getEcDetailsById(ecId) {
    return this.apiClient.get(null, `sahiya-utility/api/ec/getbyid/${ecId}`);
  }

  getEventListByUsercode(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/event/getallbyusercode`,
      params
    );
  }

  getNewEventListByUsercode(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-utility/api/event/getallbyroleid`,
      params,
      data
    );
  }

  //save event click count
  saveEventClickCount(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/event/click/save`,
      params,
      data
    );
  }

  getAssessmentPro(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/assessment/assessment-projection",
      params,
      data
    );
  }

  getAnganwadisMastersByCode(userCode) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/anganwadi/getbyusercode/${userCode}`
    );
  }

  getAdhaarExists(aadhar, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/user/checkaadhar/${aadhar}`,
      params
    );
  }

  getAbhaExists(abha, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/user/checkabha/${abha}`,
      params
    );
  }

  getEprnExists(eprn, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/user/checkeprn/${eprn}`,
      params
    );
  }

  getGoldenCardExists(goldencard, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/user/checkgoldencard/${goldencard}`,
      params
    );
  }

  getClusterWardTagged(params, blockId) {
    return this.apiClient.get(
      null,
      `sahiya-de/api/wardtag/ward-cluster/taggedwards/${blockId}`,
      params
    );
  }
  getuchcuphcbyblockid(params, blockId) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/uchc/getuchcuphcbyblockid/${blockId}`,
      params
    );
  }
  getUrbanClustersByBlockId(params, blockId) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cluster/getbyblockId/${blockId}`,
      params
    );
  }
  getUrbanWardsByBlockId(params, blockId) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/ward/getbyblockid/${blockId}`,
      params
    );
  }
  getMonthsByUserCode(year, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mpr/getmonthsbyusercode/${year}`,
      params
    );
  }
  saveClusterWardTagging(params, payload) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-de/api/wardtag/ward-cluster/save`,
      params,
      payload
    );
  }
  releaseClusterWardTagging(params, payload) {
    return this.apiClient.postParamsPayload(
      null,
      `sahiya-de/api/wardtag/ward-cluster/release`,
      params,
      payload
    );
  }
  sendBulkApproval(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      `sahiya-de/api/approve/data`,
      params,
      data
    );
  }

  getValidMonths(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/hbnc/get-hbnc-not-filled-months`,
      params,
      payload
    );
  }

  getHbycmonths(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/hbyc/get-hbyc-not-filled-months`,
      params,
      data
    );
  }

  getAprReportData(aprId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/apr/report/${aprId}`,
      {}
    );
  }

  getMprReportData(mprId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mpr/report/${mprId}`,
      {}
    );
  }

  //to verify mpr already submitted or not
  getMprDataBymonthyear(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/mpr/getallbyusercodemonthyear`,
      params,
      data
    );
  }

  getAprReportPdf(data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-jasper/v1/generate`,
      {},
      data
    );
  }
  getUserListApr(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/apr/getapruserslist`,
      params,
      data
    );
  }
  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/apr/getsupport-team-aprdata?userCode=100101
  getSupportTeamAprData(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/apr/getsupport-team-aprdata`,
      params,
      data
    );
  }

  //sahiya-de/api/apkversion/save
  sendDeviceInfoData(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/apkversion/save`,
      params,
      data
    );
  }

  saveMprAdditionalWork(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/approve/mpradvancetask`,
      params,
      data
    );
  }

  //child list

  getChildListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homevisit/getchildbyusercode`,
      params
    );
  }

  //child details
  getChildDetailById(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/homevisit/gethvdetails`,
      params,
      data
    );
  }

  //save FamilyMember
  //sahiya-de/api/memberreg/save
  saveFamilyMemberReg(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/memberreg/save`,
      params,
      data
    );
  }

  //Family member details data
  getFamilyMembersById(familyId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homesurvey/getallfamilydetailsbyfamilymemberid/${familyId}`,
      {}
    );
  }

  //home survey details by id
  //sahiya-utility/api/homesurvey/gebyid/40
  getHomeSurveyById(memberId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homesurvey/gebyid/${memberId}`,
      {}
    );
  }

  //sahiya-utility/api/homesurvey/gebymemberid/19
  getHomeSurveyByMemberId(memberId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homesurvey/gebymemberid/${memberId}`,
      {}
    );
  }

  //incentive --siraj
  getMonthsByYear(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/incentive/getmonths",
      param,
      data
    );
  }

  getIncentivaData(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/incentive/getincentivedata",
      param,
      data
    );
  }

  getIncentiveProjection(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/incentive/getincentiveprojection",
      // "sahiya-utility/api/incentive/getIncentivadata",
      param,
      data
    );
  }

  getAllIncentiveList(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      // "sahiya-utility/api/stats/v2/getallservicesdata",
      "sahiya-utility/api/incentive/getallincentives",
      param,
      data
    );
  }
  getMtcListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mtc/getallbyusercode`,
      params
    );
  }
  getMaaListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/maaprgrm/getallbyusercode`,
      params
    );
  }

  getIncentiveById(memberId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/incentive/getbyid/${memberId}`,
      {}
    );
  }

  getMtcById(memberId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mtc/getbyid/${memberId}`,
      {}
    );
  }

  //sahiya-utility/api/memberreg/gebyid/20
  getMemberDetailsById(memberId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/memberreg/gebyid/${memberId}`,
      {}
    );
  }

  //home visit list by child id
  //sahiya-utility/api/homevisit/getbyid/431
  getHomeVisitListByChildId(params, childId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homevisit/getbychildid/${childId}`,
      params
    );
  }

  // sahiya-utility/api/homevisit/getbyid/2208

  getHomeVisitById(id, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homevisit/getbyid/${id}`,
      params
    );

  }

  //Apr month data
  getAprMonthData(params) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/master-month/getaprmothdata`,
      params
    );
  }

  //EncrtpedAadha
  getEncrptedAadharCode(params) {
    return this.apiClient.get(
      null,
      `sahiya-aadharauth/api/uidai/encrypt`,
      params
    );
  }

  //DecryptedAadhar
  sendDecryptedAadharCode(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-aadharauth/api/uidai/decryptData`,
      params,
      data
    );
  }

  fetchRationCardDetails(payload) {
    return this.apiClient.post(
      null,
      `sahiya-aadharauth/pds/v1/pdsabua`,
      payload
    );
  }

  //sahiya-de/api/aadhhardetails/save
  saveAadharDetails(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/aadhhardetails/save`,
      params,
      data
    );
  }

  //sahiya-de/api/pds/save
  savePDSDetails(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/pds/save`,
      params,
      data
    );
  }
  //sahiya siary
  saveSahiyaDiaryMeeting(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/sahiya/diary/meeting/save`,
      params,
      data
    );
  }
  saveNDDForms(params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/ndd/save`,
      params,
      data
    );
  }

  getSahiyaDiaryMeetingByid(data) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/sahiyadiarymeeting/getbyid/${data}`,
      {}
    );
  }

  //wellness activity save
  //sahiya-de/api/wellnessactivity/save
  saveWellnessActivity({ }, params, data) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-de/api/wellnessactivity/save`,
      params,
      data
    );
  }

  getWellnessListById(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/wellnessactivity/getallbyusercode`,
      params
    );
  }

  //sahiya-utility/api/childvaccination/getbychildid/
  getVaacinationListByChildId(childId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/childvaccination/getbychildid/${childId}`,
      {}
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-masters/quater/getmonthsbyquarterId/1
  getMonthsByQuarterId(quarterId) {
    return this.apiClient.get(
      null,
      `sahiya-masters/quater/getmonthsbyquarterId/${quarterId}`,
      {}
    );
  }

  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/childvaccination/getvaccinecount?userCode=34774001
  getVaccinesDueListCount(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/childvaccination/getvaccinecount`,
      params,
      payload
    );
  }
  //https://japitdev.dhanushinfotech.com/sahiya-utility/api/childvaccination/getvaccinedata?userCode=34774001
  getVaccinesDueListDetails(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/childvaccination/getvaccinedata`,
      params,
      payload
    );
  }

  // getVaccinesOverviewDetails(params){
  //   return this.apiClient.get(
  //     null,
  //     `sahiya-utility/api/childvaccination/getvaccinedashboard`,
  //     params
  //   );
  // }

  // getVaccinesOverviewDetails(params){
  //   return this.apiClient.get(
  //     null,
  //     `sahiya-utility/api/childvaccination/v2/getvaccinedashboard`,
  //     params
  //   );
  // }
  getVaccinesOverviewDetails(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/childvaccination/v2/getvaccinedashboard`,
      params,
      payload
    );
  }

  getVaccinesGrpByrange() {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/vaccination/getvaccinegroupbyrangeid`,
      {}
    );
  }

  getAllMTCList(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/stats/v2/getallservicesdata",
      //"sahiya-utility/api/incentive/getallincentives",
      param,
      data
    );
  }

  getMtcListByChildId(params, childId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/mtc/getbychildid/${childId}`,
      params
    );
  }
  getMaaItemById(maaId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/maaprgrm/getbyid/${maaId}`,
      null
    );
  }

  postNDDFilesUpload(body, params) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/ndd/upload`,
      body,
      true
    );
  }

  getCbacFamilyDetailsList(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/family/getallbyusercode`,
      params
    );
  }

  getCbacHeadMemberList(id) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/homesurvey/getallfamilydetailsbyfamilymemberid/${id}`
    );
  }

  getCbacAllQuestionList(id) {
    return this.apiClient.get(
      null,

      `sahiya-masters/api/cbacquestions/getbypartid/${id}`
      // `sahiya-masters/api/cbacsbgrpques/getbygrpid/${id}`
    );
  }

  getCbacGroupQuestnsubQuests(id) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cbacquestions/getbypartidandsubprtid/2/${id}`
      // `sahiya-masters/api/cbacsbgrpques/getbygrpidandsbgrpid/2/${id}`
    );
  }

  getCbacCounsellingQuests(id) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cbaccounselling/getall`
    );
  }

  getCbacCookingFuelQuests(id) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cbaccookingfuel/getall`
    );
  }
  getCbacOcupationExpQuests(id) {
    return this.apiClient.get(null, `sahiya-masters/api/cbac-occup-exp/getall`);
  }

  getCbacMeasureMentofWaist(id) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cbacmeasofwaist/getall`
    );
  }

  getCbacgutkaorKhaini(id) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/cbacconsumesmoke/getall`
    );
  }

  saveCbacFamilyReg(intl, params, data) {
    return this.apiClient.postParamsPayload(
      intl,
      "sahiya-de/api/cbac/save",
      params,
      data
    );
  }

  getFollowUpByCBACId(id, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/cbac/followup/getbycbacid/${id}`,
      params
    );
  }

  getNDDDataByFnYearAndMonth(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/ndd/getbyfnyearidandmonthid",
      param,
      data
    );
  }

  //sahiya-utility/api/maaprgrm/getbyfnyearidandqrtrid
  getMaaDataByFnYearAndQuarter(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/maaprgrm/getbyfnyearidandqrtrid",
      param,
      data
    );
  }

  //sahiya-utility/api/pw/getpwcount

  getPregWomanCount(params) {
    return this.apiClient.get(null, `sahiya-utility/api/pw/getpwcount`, params);
  }

  getNDDJasperReport(id, params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/ndd/jasperreport/${id}`,
      params
    );
  }
  getReSendOtp(params) {
    return this.apiClient.get(null, `sahiya-login/login/resendotp`, params);
  }
  getAMBItemById(ambId) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/ifa/getbyid/${ambId}`,
      null
    );
  }
  postUpdateUsersByUserCode(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/user/updateusersbyusercode",
      param,
      data
    );
  }

  //sahiya-utility/api/family/getbyabha

  getVerifyAbha(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/family/getbyabha`,
      params
    );
  }

  //sahiya-utility/api/abha/creation/getbynameandenv
  createNewAbha(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/abha/creation/getbynameandenv`,
      params
    );
  }

  //sahiya-utility/api/trnrvenue/getall
  getTrainingVenues(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/trnrvenue/getall`,
      params
    );
  }

  //sahiya-de/api/trnrvenue/save
  postTrainingSave(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/trnrvenue/save",
      param,
      data
    );
  }

  //sahiya-utility/api/trainingbatch/getall
  getTrainingBatches(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/trainingbatch/getall`,
      params
    );
  }

  //sahiya-de/api/trainingbatch/save
  postTrainingBatchSave(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/trainingbatch/save",
      param,
      data
    );
  }

  //sahiya-utility/api/training/getall
  getTrainings(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/training/getall`,
      params
    );
  }

  //sahiya-utility/api/trainer/getall?
  getTrainers(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/trainer/getall`,
      params
    );
  }

  //sahiya-utility/api/training/getuserlist
  postGetTrainingUsersList(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/training/getuserlist",
      param,
      data
    );
  }

  //sahiya-utility/api/trngtpc/getall
  getTrainingTopics(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/trngtpc/getall`,
      params
    );
  }

  //sahiya-de/api/trainingmode/getall
  getTrainingModes(params) {
    return this.apiClient.get(
      null,
      `sahiya-de/api/trainingmode/getall`,
      params
    );
  }

  //sahiya-masters/api/dre/module/getall
  getDreModules(params) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/dre/module/getall`,
      params
    );
  }

  //sahiya-masters/api/dre/slno/getall
  getAllSlno(params) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/dre/slno/getall`,
      params
    );
  }

  //sahiya-masters/api/dre/scheme/getbyslnoid/1

  getSchemeBySlno(slno) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/dre/scheme/getbyslnoid/${slno}`,
      null
    );
  }

  //sahiya-masters/api/dre/goi/getbyslnoid/1
  getGoiBySlno(slno) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/dre/goi/getbyslnoid/${slno}`,
      null
    );
  }

  //sahiya-masters/api/dre/goi/getsubgoibygoinoandslno
  getSubGoiBySlno(params) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/dre/goi/getsubgoibygoinoandslno`,
      params
    );
  }

  //sahiya-de/api/trnrvenue/save
  saveTraining(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/training/save",
      param,
      data
    );
  }

  //sahiya-de/api/trainingbatch/save

  postTrainingFilesUpload(body, params) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/training/upload`,
      body,
      true
    );
  }
  postMaaFilesUpload(body, params) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/maa/upload`,
      body,
      true
    );
  }
  //sahiya-de/api/trainingbatch/save
  postGetRopbyDetails(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-masters/api/dre/rop/getropbydetails",
      param,
      data
    );
  }
  getTrainingById(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/training/getbyid/${data.id}`,
      param
    );
  }
  saveTrainingAttendance(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/trngattendance/save",
      param,
      data
    );
  }

  getByContTypeId(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/iec/getbyconttypeid/${data.id}`,
      param
    );
  }

  // Grievance

  postGrievanceFilesUpload(body, params) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/grievance/upload`,
      body,
      true
    );
  }

  postSaveGrievanceData(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/grievance/save",
      param,
      data
    );
  }
  postForwardToState(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/grievance/resolutionupdate",
      param,
      data
    );
  }

  //check PLA backlog flag
  //sahiya-utility/api/plameeting/checkisbacklog

  getPLABacklogFlag(params) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/plameeting/checkisbacklog`,
      params
    );
  }

  // online Training

  postSaveParticipantAssessment(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/prtcpntassmnt/save",
      param,
      data
    );
  }

  postAssessmentQuations(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-masters/api/trngques/getfilters",
      param,
      data
    );
  }

  getAllAssessmentRecords(data, param) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/trngassmnt/getbyfilter",
      param,
      data
    );
  }

  postSaveAssessmentDetails(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-masters/api/trgquesansmap/save",
      param,
      data
    );
  }

  getByAssmentId(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/trgquesansmap/getbyassmentid/${data.id}`,
      param
    );
  }

  downloadIncentiveReport(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/incentive/jasperreport",
      param,
      data
    );
  }

  //sahiya-utility/api/mtc/getmlntrncategory
  getMtcCategoryByChildData(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/mtc/getmlntrncategory",
      params,
      payload
    );
  }
  //addition by siraj
  getCurrentFinancialYear(param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/incentive/getcurfnyear`,
      param
    );
  }
  getFinancialMonths(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/incentive/getincentivemonths",
      params,
      payload
    );
  }

  getAllottedTrainingCount(param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/training/trainingcount`,
      param
    );
  }

  // meeting
  saveMonthlyMeeting(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/sahiya/monthly/meeting/save",
      params,
      payload
    );
  }

  getAllMeetingDates(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/sahiya/monthly/meeting/getallmeetingdates",
      params,
      payload
    );
  }
  getCBACCountList(id, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/cbac/getcount`,
      param
    );
  }

 // inventery
  saveItemAllocation(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/itemallocation/save",
      params,
      payload
    );
  };
  getInventoryItemByItemTypeID(id, param) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/invitem/getbyitemtypeid/${id}`,
      param
    );
  }
  getInventoryBatches(data, param) {
    console.log("data---------------------------------------------------------------------", data);

    return this.apiClient.get(
      null,
      `sahiya-utility/api/invadditem/getbatches/${data?.fnYearId}/${data?.itemtypeid}/${data?.itemid}`,
      param
    );
  };
  getInventeryMembersByFamilyId(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/memberreg/getmemberbyfamilyid/${data?.familyMbrId}`,
      param
    );
  };
  getAllInventoryUsersList(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/user/getalluserslist",
      params,
      payload
    );
  }
  getAllInventoryProcurementList(params) {
    return this.apiClient.get(
      {},
      "sahiya-utility/api/itempr/getbyusercode",
      params,
    );
  }
  getAllInventoryItemAllocationList(params) {
    return this.apiClient.get(
      {},
      "sahiya-utility/api/itemallocation/getbyusercode",
      params,
    );
  }
  getAllInventoryAddProcurementList(params) {
    return this.apiClient.get(
      {},
      "sahiya-utility/api/itemallocation/getallocationlist",
      params,
    );
  }
  getInventeryProcurementGetByID(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/itempr/getbyid/${data?.procurementId}`,
      param
    );
  };
  getInventeryItemAllocationGetByID(data, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/itemallocation/getbyid/${data?.allocationId}`,
      param
    );
  };
  saveInventeryAddProcurement(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/itempr/save",
      params,
      payload
    );
  };
  getInventeryStockView(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/itempr/getviewinv",
      params,
      payload
    );
  };


  // getSahiyaWeeklyActivityDataByMonthAndYear(params, payload) {
  //   return this.apiClient.postParamsPayload(
  //     {},
  //     `sahiya-utility/api/sahiya/weekly/activity/getbymonthandyear`,
  //     params,
  //     payload
  //   );
  // };

   // SAHIYA WEEKLY ACTIVITY CALENDAR
 
   getSahiyaWeeklyActivityCalendarList(param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/sahiya/weekly/activity/getbyusercode/${param.userCode}`,
      param
    );
  };
  getSahiyaWeeklyActivityWeekList(param) {
    return this.apiClient.get(
      null,
      `sahiya-masters/api/weeks/getall`,
      param
    );
  };
  getSahiyaWeeklyActivityDataByMonthAndYear(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      `sahiya-utility/api/sahiya/weekly/activity/getbymonthandyear`,
      params,
      payload
    );
  };
  saveSahiyaWeeklyActivity(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/sahiya/weekly/activity/save",
      params,
      payload
    );
  };


  // Aadhaar verification
  getAadhaarVerificationOtp(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-aadharauth/uidai/v1/otp",
      params,
      payload
    );
  };
  saveAadhaarVerificationOtp(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-aadharauth/uidai/v1/ekyc",
      params,
      payload
    );
  };

  // SAHIYA WEEKLY ACTIVITY Report

  // getSahiyaWeeklyActivityReportList(param) {
  //   return this.apiClient.get(
  //     null,
  //     `sahiya-utility/api/weeklyreport/getallbyusercode`,
  //     param
  //   );
  // };
  saveSahiyaWeeklyActivityReport(params, payload) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/weeklyreport/save",
      params,
      payload
    );
  };
  postSahiyaWeeklyReportFilesUpload(body, params) {
    return this.apiClient.postImage(
      null,
      `sahiya-files/api/files/weeklyreport/upload`,
      body,
      true
    );
  };
  getSahiyaWeeklyReportByID(id, param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/weeklyreport/getbyid/${id}`,
      param
    );
  };

  getAllMonthlyMeetingsList(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/stats/v2/getallservicesdata",
      //"sahiya-utility/api/incentive/getallincentives",
      param,
      data
    );
  }

  getAllMonthlyMeetingsListByUperLavel(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-utility/api/sahiya/monthly/meeting/getmothlydetails",
      param,
      data
    );
  }

  getSahiyaWeeklyActivityReportList(param) {
    return this.apiClient.get(
      null,
      `sahiya-utility/api/weeklyreport/getallbyusercode/${param.userCode}`,
      param
    );
  };
  saveAlertHistory(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-de/api/alert/history/save",
      param,
      data
    );
  }
  verifyAadhaarByNumber(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-aadharauth/api/uidai/auth",
      param,
      data
    );
  }
  getEncrptedAadharToTokenVault(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-aadharauth/api/vault/tokenrequest",
      param,
      data
    );
  }
  getEncrptedTokenToAadharVault(param, data) {
    return this.apiClient.postParamsPayload(
      {},
      "sahiya-aadharauth/api/vault/getaadhar",
      param,
      data
    );
  }

  saveHouseholdSurveyData(params, payload,token,isFormData) {
    return this.apiClient.postParamsPayload(
      {},
      "api/Household",
      params,
      payload,
      token,
      isFormData
    );
  }

  saveMigrationSurveyData(params, payload,token,isFormData) {
    return this.apiClient.postParamsPayload(
      {},
      "api/MigrationSurvey",
      params,
      payload,
      token,
      isFormData
    );
  }

  getHouseHoldListSurveyData(token){
    return this.apiClient.get(null, "api/Household", {}, token);
  }

  getMigrationListSurveyData(token){
     return this.apiClient.get(null, "api/MigrationSurvey", {}, token);
  }

   postHouseholdSurveyDataFilesUpload(body, params,token) {
    return this.apiClient.postImageUpdate(
      null,
      `api/Household`,
      body,
      null,
      true,
      token
    );
  };

  /* BANK IFSC code 

  GET BANK IFSC CODE BY BANK NAME : 
URL : https://demo2.itmaniacs.co.in/api/BankifsCode/name/ALLAHABAD BANK
Method : GET
Authorization : Barrier Token
Response : 
[
   {
       "id": 2,
       "bankName": "ALLAHABAD BANK",
       "branchName": "AGARPADA",
       "ifsCode": "ALLA0210790",
       "entryDate": "2026-01-10T17:38:53.07"
   },
….
]
*/

  getBankIfscCodeByBankName(bankName, token) {
    return this.apiClient.get(
      null,
      `api/BankifsCode/name/${bankName}`,
      {},
      token
    );
  };
  
  
  /*GET BANK DETAILS BY IFSC CODE :
URL : https://demo2.itmaniacs.co.in/api/BankifsCode/ifsc/ALLA0210790
Method : GET
Authorization : Barrier Token
Response : 
[
   {
       "id": 2,
       "bankName": "ALLAHABAD BANK",
       "branchName": "AGARPADA",
       "ifsCode": "ALLA0210790",
       "entryDate": "2026-01-10T17:38:53.07"
   }
]
   */

  getBankDetailsByIfscCode(ifscCode, token) {
    return this.apiClient.get(
      null,
      `api/BankifsCode/ifsc/${ifscCode}`,
      {},
      token
    );
   };
   
// https://demo2.itmaniacs.co.in/api/household/222cd5ea-34de-4881-9045-8de68fae77f2

// https://demo2.itmaniacs.co.in/api/household/{uniqueId}

saveEditedHouseHold(body,uniqueId,token) {
    return this.apiClient.postImageUpdate(
      null,
      `api/Household/${uniqueId}`,
      body,
      null,
      true,
      token
    );
  };

  saveEditedVillageSurvey(body,uniqueId,token) {
    return this.apiClient.postImageUpdate(
      null,
      `api/MigrationSurvey/${uniqueId}`,
      body,
      null,
      true,
      token
    );
  };

}


   

 



