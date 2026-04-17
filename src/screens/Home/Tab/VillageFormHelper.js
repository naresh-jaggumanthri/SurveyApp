import * as Yup from 'yup';
export const VillageFormInitialValues = (props,loginData) => ({

 district: null,
 block:null,
 gramPanchayat:null,
 revenueVillage:null,
 totalHouseholds:null,
 malePopulation:null,
 femalePopulation:null,
//  InternalVillageRoads:null,
//  InternalVillageRoadsRequirement:null,
//  InternalDrainsAvailable:null,
//  DrainsProperlyFunctional:null,
 isElectrified:null,
 streetLightingAvailable:null,
 streetLightingType:null,
 villageConnectedToGP:null,
 lengthAllWeatherRoadToGP:null,
 gpConnectedToPWDOrHighway:null,
 lengthAllWeatherRoadToHighway:100,
 menInMigration:null,
 womenInMigration:null,
 minorChildrenInMigration:null,
 drinkingWaterSource:null,
 allHouseholdsWithToilets:null,
 anganwadiCentre:null,
 primarySchoolAvailable:null,
 secondarySchoolWithin3km:null,
 subHealthCentre:null,
 communityCentreAvailable:null,
 commonShedForWSHG:null,
 playgroundAvailable:null,
 communityTanks:0,
//  MobileNetworkCoverage:null,
 digitalConnectivity:null,
//  DryingYard:null,
 pdsAvailable:null,
//  DistanceOfPDS:null,
 bankingPostOfficeNearby:null,
 waterFromIrrigationProject:null,
//  RepairOrNewDistributionCanalRequired:null,
//  LengthOfDistributionCanal:null,
//  FunctionalLiftIrrigation:null,
//  ScopeOfNewLiftIrrigation:null,
 functionalCheckDams:null,
//  ScopeOfNewCheckDams:null,
//  FunctionalDistributionCanal:null,
//  ScopeOfNewDistributionCanal:null,
 respondentName:null,
 identityRole:null,
//  SurveyProcess:null,
 respondentMobile:null,
//  MeetingPhotoPath:null,
 geoLocation:null,
 enumeratorName:loginData?.username+'('+loginData?.roleName+')',
 surveyDate:"2025-12-10T15:30:00",
 TotalPopulation:0,
 TotalPersonsInMigration:0
});

export const VillageFormValidationSchema = (props)=>{
    return Yup.object().shape({
  district: Yup.string().required('District is required'),
  block: Yup.string().required('Block is required'),
  gramPanchayat: Yup.string().required('Gram Panchayat is required'),
  revenueVillage: Yup.string().required('Revenue Village is required'),
  totalHouseholds: Yup.number().typeError('Total Households must be a number').required('Total Households is required'),
  malePopulation: Yup.number().typeError('Male Population must be a number').required('Male Population is required'),
  femalePopulation: Yup.number().typeError('Female Population must be a number').required('Female Population is required'),
  // InternalVillageRoadsRequirement: Yup.string().when('InternalVillageRoads', {
  //   is: false,
  //   then: schema => schema.required('Internal Village Roads Requirement is required'),
  //   otherwise: schema => schema.notRequired()
  // }),
//   LengthAllWeatherRoadToGP: Yup.number().typeError('Length to GP must be a number').required('Length to GP is required'),
  lengthAllWeatherRoadToHighway: Yup.number().typeError('Length to Highway must be a number').required('Length to Highway is required'),
  // DrinkingWaterSource: Yup.string().required('Drinking Water Source is required'),
//   DistanceOfPDS: Yup.number().typeError('Distance of PDS must be a number').required('Distance of PDS is required'),
//   LengthOfDistributionCanal: Yup.number().typeError('Length of Distribution Canal must be a number').required('Length of Distribution Canal is required'),
//   ScopeOfNewDistributionCanal: Yup.number().typeError('Scope of New Distribution Canal must be a number').required('Scope of New Distribution Canal is required'),
  respondentName: Yup.string().required('Respondent Name is required'),
  identityRole: Yup.string().required('Identity / Role is required'),
  // SurveyProcess: Yup.string().required('Survey Process is required'),
  respondentMobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile Number must be 10 digits')
    .required('Respondent Mobile is required'),
//   SurveyDate: Yup.date().required('Survey Date is required'),
})};

export const isEligibleForNextTab = (currentQuestion,values,involvedWaterSource) => {
  switch (currentQuestion) {
    case 1:
      const result =  values?.district!==null && values?.block!==null && values?.gramPanchayat!==null && values?.revenueVillage!==null && values?.totalHouseholds!==null && values?.malePopulation!== null && values?.femalePopulation !== null;
      console.log('eligibility result for question 1:', result);
     
      return result; // Block is required
    case 2:const result2 =  values?.isElectrified!==null && values?.streetLightingAvailable!==null && values?.villageConnectedToGP!==null && values?.lengthAllWeatherRoadToHighway!==null;
      console.log('eligibility result for question 2:', result2); 
       

      return result2; // Gram Panchayat is required
    case 3:
      const result3 = values?.menInMigration!==null && values?.womenInMigration!==null && values?.minorChildrenInMigration!==null;
      console.log('eligibility result for question 3:', result3);
     
      return result3; // Revenue Village is required
    case 4:
      const result4 = involvedWaterSource!=null && values?.allHouseholdsWithToilets!=null;
      console.log('eligibility result for question 4:', result4);
      return result4; // Total Households is required
    case 5:const result5 = values?.anganwadiCentre!==null && values?.primarySchoolAvailable!==null && values?.secondarySchoolWithin3km!==null && values?.subHealthCentre!==null;
      console.log('eligibility result for question 5:', result5);
      return result5; // Male Population is required
    case 6:const result6 = values?.communityCentreAvailable!==null && values?.commonShedForWSHG!==null && values?.playgroundAvailable!==null && values?.communityTanks!==null;
      

      return result6; // Female          Population is required
    case 7:const result7 = values?.digitalConnectivity!==null && values?.pdsAvailable!==null && values?.bankingPostOfficeNearby!==null;  
     
      return result7; // Internal Village Roads is required
    case 8:const result8 = values?.waterFromIrrigationProject!==null && values?.functionalCheckDams!==null;
      console.log('eligibility result for question 8:', result8);
      return result8; // Length of All Weather Road to Highway is required
    case 9:const result9 = values?.respondentName!=null && values?.identityRole!=null && values?.respondentMobile!=null && values?.enumeratorName!=null;
      console.log('eligibility result for question 9:', result9);
      return result9; // Respondent Name, Identity Role, Respondent Mobile is required
    default:
      return false;
  }
}