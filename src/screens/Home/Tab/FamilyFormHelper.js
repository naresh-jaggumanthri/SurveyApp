import * as Yup from 'yup';
export const HouseHoldFormInitialValues = (props,loginData) => ({
    
  householdBasicProfile: {
   district: null,
   block: null,
   gramPanchayat: null,
   revenueVillage: null,
   hamlet: null,
   nearestLandmark: null,
   headOfTheHouseholdNameAsPerAadhar: null,
   headOfTheHouseholdGender:null,
   aadharNo: null,
   socialCategory: null,
   bankAccountNumber: null,
   bankName:null,
   ifscCodeOrBranch:null,
  //  womenMemberName: null,
  //  womenMemberAge: null,
  //  womenMemberMaritalStatus: null,
  //  womenMemberRelationshipWithHead: null,
   isWomenCoveredUnderSHG: null,
   isWomenCoveredUnderSubhadraYojana: null,
   totalFamilyMembers:null,
   hasRationCard:null,
   rationCardNumber:null,
   drinkingWaterSource:null,
   hasUjjwalaLPGConnection:null,
  //  hasLabourCard:null,
  //  isCoveredUnderNSKY:null,
   geoLocation:null,
   entryBy:loginData?.username,
//    surveyDate:null,
//    respondentPhoto:null
 },


 householdEntitlement: {
   kishanSchemeCoverage:null,
   hasRuralHousingSchemeHouse:null,
   hasIndividualHouseholdLatrine:null,
   hasElectricityConnection:null,
   hasMGNREGSJobCard:null,
   fullJobCardNumber:null,
   hasJanDhanYojanaAccount:null,
   isCoveredUnderAyushmanBharat:null,
   isEnrolledUnderShramYogiMaandhan:null,
   isCoveredUnderPMJJBY:null,
   isCoveredUnderPMSBY:null,
   isOldAgePension:null,
   isWidowPension:null,
   isAtalPensionYojana:null,
   isDisabilityPension:null
 },


 householdMigrationStatus: {
  //  hasFamilyMemberMigratedLast3Years:null,
   takenAdvanceForMigrationFromMiddleman:null,
   minorChildrenAccompaniedMigration:null,
  //  womenMembersMigrated:null,
   familyContactMobileNo:null,
   respondentIdentity:null,
  //  respondentPhotoPathOrUrl: "https://example.com/photos/respondent.jpg"
 },


 householdOccupationAndLand: {
   primaryOccupationOfTheFamily:null,
   otherPrimaryOccupationDetails: null,
   isFamilyInvolvedInWeavingOrHandloom:false,
   isFamilyCoveredUnderPOHI_LoomsScheme:false,
   fraClaimantStatus:null,
   fra_LandAmountInAcres:null,
   ownsHomesteadPattaLand:null,
   approximatePrivateLandHolding:null,
   isIrrigationFacilityAvailable:null,
   sourcesOfIrrigation:null,
   involvedInLivestockActivity:null,
 },


 householdFamilyMember: []

});
export const HouseHoldFormValidationSchema = (props) =>{
    // return true;  
    return Yup.object().shape({

    householdBasicProfile: Yup.object().shape({
      district: Yup.string().required('District is required'),
      block: Yup.string().required('Block is required'),
      gramPanchayat: Yup.string().required('Gram Panchayat is required'),
      revenueVillage: Yup.string().required('Revenue Village is required'),
      hamlet: Yup.string().required('Hamlet is required'),

      headOfTheHouseholdNameAsPerAadhar: Yup.string().min(3,'At least three characters required').required('Head of the Household Name is required'),
      headOfTheHouseholdGender: Yup.string().required('Head of the Household Gender is required'),

      aadharNo: Yup.string()
        .matches(/^\d{12}$/, 'Aadhaar must be 12 digits')
        .required('Aadhaar Number is required'),

      socialCategory: Yup.string().required('Social Category is required'),

      bankAccountNumber: Yup.string().required('Bank Account Number is required'),
      bankName: Yup.string().required('Bank Name is required'),
      ifscCodeOrBranch: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').required('IFSC Code / Branch is required'),

      // womenMemberName: Yup.string().required('Women Member Name is required'),
      // womenMemberAge: Yup.number().min(12, 'At least one character is required').typeError('Age must be a number').required('Women Member Age is required'),
      // womenMemberMaritalStatus: Yup.string().required('Women Member Marital Status is required'),
      // womenMemberRelationshipWithHead: Yup.string().required('Relationship with Head is required'),

      isWomenCoveredUnderSHG: requiredBoolean,
      isWomenCoveredUnderSubhadraYojana: requiredBoolean,

      totalFamilyMembers: Yup.number()
        .min(1, 'At least one family member is required')
        .required('Total Family Members is required'),

      hasRationCard: requiredBoolean,

      rationCardNumber: Yup.string().when('hasRationCard', {
        is: true,
        then: schema => schema.required('Ration Card Number is required'),
        otherwise: schema => schema.notRequired()
      }).matches(/^[A-Z0-9]{11,12}$/, 'Only letters and numbers allowed'),

      // drinkingWaterSource: Yup.string().required('Drinking Water Source is required'),
      hasUjjwalaLPGConnection: requiredBoolean,
      // hasLabourCard: requiredBoolean,
      // isCoveredUnderNSKY: requiredBoolean,
      // geoLocation: Yup.string().required('Geo Location is required'),
      entryBy: Yup.string().required('Entry By is required')
    }),

    householdEntitlement: Yup.object().shape({
      // kishanSchemeCoverage: Yup.string().required('Kishan Scheme Coverage is required'),
      hasRuralHousingSchemeHouse: requiredBoolean,
      hasIndividualHouseholdLatrine: requiredBoolean,
      hasElectricityConnection: requiredBoolean,
      hasMGNREGSJobCard: requiredBoolean,

      fullJobCardNumber: Yup.string().when('hasMGNREGSJobCard', {
        is: true,
        then: schema => schema.required('Job Card Number is required'),
        otherwise: schema => schema.notRequired()
      }),

      hasJanDhanYojanaAccount: requiredBoolean,
      isCoveredUnderAyushmanBharat: requiredBoolean,
      isEnrolledUnderShramYogiMaandhan: requiredBoolean,
      // isCoveredUnderPMJJBY: requiredBoolean,
      // isCoveredUnderPMSBY: requiredBoolean
    }),

    householdMigrationStatus: Yup.object().shape({
      // hasFamilyMemberMigratedLast3Years: requiredBoolean,
      takenAdvanceForMigrationFromMiddleman: requiredBoolean,
      minorChildrenAccompaniedMigration: Yup.number().required('Minor Children Accompanied Migration is required'),
      // womenMembersMigrated: requiredBoolean,

      familyContactMobileNo: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10 digit mobile number')
        .required('Family Contact Mobile No. is required'),

      respondentIdentity: Yup.string().required('Respondent Identity is required'),
    //   respondentPhotoPathOrUrl: Yup.string().required('Respondent Photo is required')
    }),

    householdOccupationAndLand: Yup.object().shape({
      primaryOccupationOfTheFamily: Yup.string().required('Primary Occupation is required'),
      otherPrimaryOccupationDetails: Yup.string().when('primaryOccupationOfTheFamily',{
        is:'Other User entry',
        then: schema => schema.required('Other occupation details are required').min(3,'Minimum three characters are required'),
        otherwise: schema => schema.notRequired()


      }),

      // isFamilyInvolvedInWeavingOrHandloom: requiredBoolean,
      isFamilyCoveredUnderPOHI_LoomsScheme: Yup.boolean().when('isFamilyInvolvedInWeavingOrHandloom', {
        is:true,
        then: schema => schema.required('This field is required'),
        otherwise: schema => schema.notRequired()
      }),

      fraClaimantStatus: Yup.string().required('FRA Claimant Status is required'),
     fra_LandAmountInAcres: Yup.number()
  .typeError('FRA Land Amount must be a number')
  .when('fraClaimantStatus', {
    is: 'FRA Claimant',
    then: schema =>
      schema
        .required('FRA Land Amount is required')
        .min(0.5, 'Minimum land should be 0.5 acres')
        .max(5, 'Maximum land should be 5 acres'),
    otherwise: schema => schema.notRequired(),
  }),
      ownsHomesteadPattaLand: requiredBoolean,
      approximatePrivateLandHolding: Yup.string().required('Private Land Holding is required'),
      isIrrigationFacilityAvailable: Yup.boolean().when('approximatePrivateLandHolding', {
        is: value => value !== 'Landless',
        then: schema => schema.required('This field is required'),
        otherwise: schema => schema.notRequired()
      }),
      //isIrrigationFacilityAvailable: requiredBoolean,
      // sourcesOfIrrigation: Yup.string().when('isIrrigationFacilityAvailable', {
      //   is:true,
      //   then: schema => schema.required('Sources of Irrigation is required'),
      //   otherwise: schema => schema.notRequired()
      // }),
      // involvedInLivestockActivity: Yup.string().required('Livestock Activity is required')
    }),

    // householdFamilyMember: Yup.array()
    //   .min(1, 'At least one family member is required')
    //   .of(
    //     Yup.object().shape({
    //       name: Yup.string().required('Family Member Name is required'),
    //       age: Yup.number().typeError('Age must be a number').required('Age is required'),
    //       gender: Yup.string().required('Gender is required'),
    //       educationalQualification: Yup.string().required('Education Qualification is required'),

    //       migratedInLast3Years: requiredBoolean,

    //       destinationState: Yup.string().when('migratedInLast3Years', {
    //         is: true,
    //         then: schema => schema.required('Destination State is required'),
    //         otherwise: schema => schema.notRequired()
    //       }),

    //       sectorOfEngagementDuringMigration: Yup.string().required('Sector is required'),
    //       periodOfMigration: Yup.string().required('Period of Migration is required'),
    //       monthlyRemittanceDuringMigration: Yup.number()
    //         .typeError('Remittance must be a number')
    //         .required('Monthly Remittance is required'),

    //       interestInSkillDevelopment: Yup.string().required('Skill Development Interest is required')
    //     })
    //   )
  });
}
const requiredBoolean = Yup.boolean().required('This field is required').oneOf([true, false], 'This field is required');
