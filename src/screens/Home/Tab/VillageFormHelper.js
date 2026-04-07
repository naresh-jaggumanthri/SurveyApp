import * as Yup from 'yup';
export const VillageFormInitialValues = () => ({
  
 District: null,
 Block:null,
 GramPanchayat:null,
 RevenueVillage:null,
 TotalHouseholds:null,
 MalePopulation:null,
 FemalePopulation:null,
 InternalVillageRoads:null,
 InternalVillageRoadsRequirement:null,
 InternalDrainsAvailable:null,
 DrainsProperlyFunctional:null,
 IsElectrified:null,
 StreetLightingAvailable:null,
 StreetLightingType:null,
 VillageConnectedToGP:null,
 LengthAllWeatherRoadToGP:null,
 GPConnectedToPWDOrHighway:null,
 LengthAllWeatherRoadToHighway:null,
 MenInMigration:null,
 WomenInMigration:null,
 MinorChildrenInMigration:null,
 DrinkingWaterSource:null,
 AllHouseholdsWithToilets:null,
 AnganwadiCentre:null,
 PrimarySchoolAvailable:null,
 SecondarySchoolWithin3km:null,
 SubHealthCentre:null,
 CommunityCentreAvailable:null,
 CommonShedForWSHG:null,
 PlaygroundAvailable:null,
 CommunityTanks:null,
 MobileNetworkCoverage:null,
 DigitalConnectivity:null,
 DryingYard:null,
 PDSAvailable:null,
 DistanceOfPDS:null,
 BankingPostOfficeNearby:null,
 WaterFromIrrigationProject:null,
 RepairOrNewDistributionCanalRequired:null,
 LengthOfDistributionCanal:null,
 FunctionalLiftIrrigation:null,
 ScopeOfNewLiftIrrigation:null,
 FunctionalCheckDams:null,
 ScopeOfNewCheckDams:null,
 FunctionalDistributionCanal:null,
 ScopeOfNewDistributionCanal:null,
 RespondentName:null,
 IdentityRole:null,
 SurveyProcess:null,
 RespondentMobile:null,
 MeetingPhotoPath:null,
 GeoLocation:null,
 EnumeratorName:null,
 SurveyDate:"2025-12-10T15:30:00",
 TotalPopulation:0,
 TotalPersonsInMigration:0
});

export const VillageFormValidationSchema = (props)=>{
    return Yup.object().shape({
  District: Yup.string().required('District is required'),
  Block: Yup.string().required('Block is required'),
  GramPanchayat: Yup.string().required('Gram Panchayat is required'),
  RevenueVillage: Yup.string().required('Revenue Village is required'),
  TotalHouseholds: Yup.number().typeError('Total Households must be a number').required('Total Households is required'),
  MalePopulation: Yup.number().typeError('Male Population must be a number').required('Male Population is required'),
  FemalePopulation: Yup.number().typeError('Female Population must be a number').required('Female Population is required'),
  // InternalVillageRoadsRequirement: Yup.string().when('InternalVillageRoads', {
  //   is: false,
  //   then: schema => schema.required('Internal Village Roads Requirement is required'),
  //   otherwise: schema => schema.notRequired()
  // }),
//   LengthAllWeatherRoadToGP: Yup.number().typeError('Length to GP must be a number').required('Length to GP is required'),
  LengthAllWeatherRoadToHighway: Yup.number().typeError('Length to Highway must be a number').required('Length to Highway is required'),
  // DrinkingWaterSource: Yup.string().required('Drinking Water Source is required'),
//   DistanceOfPDS: Yup.number().typeError('Distance of PDS must be a number').required('Distance of PDS is required'),
//   LengthOfDistributionCanal: Yup.number().typeError('Length of Distribution Canal must be a number').required('Length of Distribution Canal is required'),
//   ScopeOfNewDistributionCanal: Yup.number().typeError('Scope of New Distribution Canal must be a number').required('Scope of New Distribution Canal is required'),
  RespondentName: Yup.string().required('Respondent Name is required'),
  IdentityRole: Yup.string().required('Identity / Role is required'),
  // SurveyProcess: Yup.string().required('Survey Process is required'),
  RespondentMobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile Number must be 10 digits')
    .required('Respondent Mobile is required'),
//   SurveyDate: Yup.date().required('Survey Date is required'),
})};

export const isEligibleForNextTab = (currentQuestion,values,involvedWaterSource) => {
  switch (currentQuestion) {
    case 1:
      const result =  values?.District!==null && values?.Block!==null && values?.GramPanchayat!==null && values?.RevenueVillage!==null && values?.TotalHouseholds!==null && values?.MalePopulation!== null && values?.FemalePopulation !== null;
      console.log('eligibility result for question 1:', result);
     
      return result; // Block is required
    case 2:const result2 =  values?.IsElectrified!==null && values?.StreetLightingAvailable!==null && values?.VillageConnectedToGP!==null && values?.LengthAllWeatherRoadToHighway!==null;
      console.log('eligibility result for question 2:', result2); 
       

      return result2; // Gram Panchayat is required
    case 3:
      const result3 = values?.MenInMigration!==null && values?.WomenInMigration!==null && values?.MinorChildrenInMigration!==null;
      console.log('eligibility result for question 3:', result3);
     
      return result3; // Revenue Village is required
    case 4:
      const result4 = involvedWaterSource!=null && values?.AllHouseholdsWithToilets!=null;
      console.log('eligibility result for question 4:', result4);
      return result4; // Total Households is required
    case 5:const result5 = values?.AnganwadiCentre!==null && values?.PrimarySchoolAvailable!==null && values?.SecondarySchoolWithin3km!==null && values?.SubHealthCentre!==null;
      console.log('eligibility result for question 5:', result5);
      return result5; // Male Population is required
    case 6:const result6 = values?.CommunityCentreAvailable!==null && values?.CommonShedForWSHG!==null && values?.PlaygroundAvailable!==null && values?.CommunityTanks!==null;
      

      return result6; // Female          Population is required
    case 7:const result7 = values?.DigitalConnectivity!==null && values?.PDSAvailable!==null && values?.BankingPostOfficeNearby!==null;  
     
      return result7; // Internal Village Roads is required
    case 8:const result8 = values?.WaterFromIrrigationProject!==null && values?.FunctionalCheckDams!==null;
      console.log('eligibility result for question 8:', result8);
      return result8; // Length of All Weather Road to Highway is required
    case 9:const result9 = values?.RespondentName!=null && values?.IdentityRole!=null && values?.RespondentMobile!=null && values?.EnumeratorName!=null;
      console.log('eligibility result for question 9:', result9);
      return result9; // Respondent Name, Identity Role, Respondent Mobile is required
    default:
      return false;
  }
}