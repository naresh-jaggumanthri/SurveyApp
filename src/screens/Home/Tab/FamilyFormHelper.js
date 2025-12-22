import * as Yup from 'yup';
export const HouseHoldFormInitialValues = () => ({
  householdBasicProfile: {
   district: null,
   block: null,
   gramPanchayat: null,
   revenueVillage: null,
   hamlet: null,
   headOfTheHouseholdNameAsPerAadhar: null,
   headOfTheHouseholdGender:null,
   aadharNo: null,
   socialCategory: null,
   bankAccountNumber: null,
   bankName:null,
   ifscCodeOrBranch:null,
   womenMemberName: null,
   womenMemberAge: null,
   womenMemberMaritalStatus: null,
   womenMemberRelationshipWithHead: null,
   isWomenCoveredUnderSHG: null,
   isWomenCoveredUnderSubhadraYojana: null,
   totalFamilyMembers:null,
   hasRationCard:null,
   rationCardNumber:null,
   drinkingWaterSource:null,
   hasUjjwalaLPGConnection:null,
   hasLabourCard:null,
   isCoveredUnderNSKY:null,
   geoLocation:null,
   entryBy:null,
   surveyDate:null
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
 },


 householdMigrationStatus: {
   hasFamilyMemberMigratedLast3Years:null,
   takenAdvanceForMigrationFromMiddleman:null,
   minorChildrenAccompaniedMigration:null,
   womenMembersMigrated:null,
   familyContactMobileNo:null,
   respondentIdentity:null,
   respondentPhotoPathOrUrl: "https://example.com/photos/respondent.jpg"
 },


 householdOccupationAndLand: {
   primaryOccupationOfTheFamily:null,
   otherPrimaryOccupationDetails: null,
   isFamilyInvolvedInWeavingOrHandloom:null,
   isFamilyCoveredUnderPOHI_LoomsScheme:null,
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
    return Yup.object().shape({

    householdBasicProfile: Yup.object().shape({
      district: Yup.string().required('District is required'),
      block: Yup.string().required('Block is required'),
      gramPanchayat: Yup.string().required('Gram Panchayat is required'),
      revenueVillage: Yup.string().required('Revenue Village is required'),
      hamlet: Yup.string().required('Hamlet is required'),

      headOfTheHouseholdNameAsPerAadhar: Yup.string().required('Head of the Household Name is required'),
      headOfTheHouseholdGender: Yup.string().required('Head of the Household Gender is required'),

      aadharNo: Yup.string()
        .matches(/^\d{12}$/, 'Aadhaar must be 12 digits')
        .required('Aadhaar Number is required'),

      socialCategory: Yup.string().required('Social Category is required'),

      bankAccountNumber: Yup.string().required('Bank Account Number is required'),
      bankName: Yup.string().required('Bank Name is required'),
      ifscCodeOrBranch: Yup.string().required('IFSC Code / Branch is required'),

      womenMemberName: Yup.string().required('Women Member Name is required'),
      womenMemberAge: Yup.number().typeError('Age must be a number').required('Women Member Age is required'),
      womenMemberMaritalStatus: Yup.string().required('Women Member Marital Status is required'),
      womenMemberRelationshipWithHead: Yup.string().required('Relationship with Head is required'),

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
      }).matches(/^[A-Za-z0-9]+$/, 'Only letters and numbers allowed'),

      drinkingWaterSource: Yup.string().required('Drinking Water Source is required'),
      hasUjjwalaLPGConnection: requiredBoolean,
      hasLabourCard: requiredBoolean,
      isCoveredUnderNSKY: requiredBoolean,

    //   geoLocation: Yup.string().required('Geo Location is required'),
    //   entryBy: Yup.string().required('Entry By is required')
    }),

    // householdEntitlement: Yup.object().shape({
    //   kishanSchemeCoverage: Yup.string().required('Kishan Scheme Coverage is required'),
    //   hasRuralHousingSchemeHouse: requiredBoolean,
    //   hasIndividualHouseholdLatrine: requiredBoolean,
    //   hasElectricityConnection: requiredBoolean,
    //   hasMGNREGSJobCard: requiredBoolean,

    //   fullJobCardNumber: Yup.string().when('hasMGNREGSJobCard', {
    //     is: true,
    //     then: schema => schema.required('Job Card Number is required'),
    //     otherwise: schema => schema.notRequired()
    //   }),

    //   hasJanDhanYojanaAccount: requiredBoolean,
    //   isCoveredUnderAyushmanBharat: requiredBoolean,
    //   isEnrolledUnderShramYogiMaandhan: requiredBoolean,
    //   isCoveredUnderPMJJBY: requiredBoolean,
    //   isCoveredUnderPMSBY: requiredBoolean
    // }),

    // householdMigrationStatus: Yup.object().shape({
    //   hasFamilyMemberMigratedLast3Years: requiredBoolean,
    //   takenAdvanceForMigrationFromMiddleman: requiredBoolean,
    //   minorChildrenAccompaniedMigration: requiredBoolean,
    //   womenMembersMigrated: requiredBoolean,

      familyContactMobileNo: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10 digit mobile number')
        .required('Family Contact Mobile No. is required'),

    //   respondentIdentity: Yup.string().required('Respondent Identity is required'),
    //   respondentPhotoPathOrUrl: Yup.string().required('Respondent Photo is required')
    // }),

    // householdOccupationAndLand: Yup.object().shape({
    //   primaryOccupationOfTheFamily: Yup.string().required('Primary Occupation is required'),
    // //   otherPrimaryOccupationDetails: Yup.string(),

    //   isFamilyInvolvedInWeavingOrHandloom: requiredBoolean,
    //   isFamilyCoveredUnderPOHI_LoomsScheme: requiredBoolean,

    //   fraClaimantStatus: Yup.string().required('FRA Claimant Status is required'),
    //   fra_LandAmountInAcres: Yup.number()
    //     .typeError('Land amount must be a number')
    //     .required('FRA Land Amount is required'),

    //   ownsHomesteadPattaLand: requiredBoolean,
    //   approximatePrivateLandHolding: Yup.string().required('Private Land Holding is required'),
    //   isIrrigationFacilityAvailable: requiredBoolean,
    //   sourcesOfIrrigation: Yup.string().required('Sources of Irrigation is required'),
    //   involvedInLivestockActivity: Yup.string().required('Livestock Activity is required')
    // }),

    // householdFamilyMember: Yup.array()
    //   .min(1, 'At least one family member is required')
    //   .of(
    //     Yup.object().shape({
    //       name: Yup.string().required('Family Member Name is required'),
    //       age: Yup.number().typeError('Age must be a number').required('Age is required'),
    //       gender: Yup.string().required('Gender is required'),
    //       educationalQualification: Yup.string().required('Education Qualification is required'),

    //       migratedInLast3Years: requiredBoolean,

        //   destinationState: Yup.string().when('migratedInLast3Years', {
        //     is: true,
        //     then: schema => schema.required('Destination State is required'),
        //     otherwise: schema => schema.notRequired()
        //   }),

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
