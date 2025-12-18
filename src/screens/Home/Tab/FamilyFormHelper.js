export const HouseHoldFormInitialValues = () => ({
  householdBasicProfile: {
   district: "Cuttack",
   block: "Banki",
   gramPanchayat: "Kalapathar",
   revenueVillage: "Nuagaon",
   hamlet: "Ward-3",
   headOfTheHouseholdNameAsPerAadhar: "Ramesh Chandra Sahu",
   headOfTheHouseholdGender:null,
   aadharNo: "123456789012",
   socialCategory: "OBC",
   bankAccountNumber: "12345678901",
   bankName: "State Bank of India",
   ifscCodeOrBranch: "SBIN0001234",
   womenMemberName: "Sita Sahu",
   womenMemberAge: 32,
   womenMemberMaritalStatus: "Married",
   womenMemberRelationshipWithHead: "Wife",
   isWomenCoveredUnderSHG: true,
   isWomenCoveredUnderSubhadraYojana: false,
   totalFamilyMembers: 4,
   hasRationCard: true,
   rationCardNumber: "RC123456789",
   drinkingWaterSource: "Hand Pump",
   hasUjjwalaLPGConnection: true,
   hasLabourCard: true,
   isCoveredUnderNSKY: false,
   geoLocation: "20.4625,85.8828",
   entryBy: "Surveyor01"
 },


 householdEntitlement: {
   kishanSchemeCoverage: "PM-KISAN",
   hasRuralHousingSchemeHouse: true,
   hasIndividualHouseholdLatrine: true,
   hasElectricityConnection: true,
   hasMGNREGSJobCard: true,
   fullJobCardNumber: "OD-12-345-678",
   hasJanDhanYojanaAccount: true,
   isCoveredUnderAyushmanBharat: true,
   isEnrolledUnderShramYogiMaandhan: false,
   isCoveredUnderPMJJBY: true,
   isCoveredUnderPMSBY: true
 },


 householdMigrationStatus: {
   hasFamilyMemberMigratedLast3Years: true,
   takenAdvanceForMigrationFromMiddleman: false,
   minorChildrenAccompaniedMigration: false,
   womenMembersMigrated: false,
   familyContactMobileNo: "9876543210",
   respondentIdentity: "Head of Household",
   respondentPhotoPathOrUrl: "https://example.com/photos/respondent.jpg"
 },


 householdOccupationAndLand: {
   primaryOccupationOfTheFamily: "Agriculture",
   otherPrimaryOccupationDetails: null,
   isFamilyInvolvedInWeavingOrHandloom: false,
   isFamilyCoveredUnderPOHI_LoomsScheme: false,
   fraClaimantStatus: "FRA Claimant",
   fra_LandAmountInAcres: 1.75,
   ownsHomesteadPattaLand: true,
   approximatePrivateLandHolding: "2-3 Acres",
   isIrrigationFacilityAvailable: true,
   sourcesOfIrrigation: "Canal, Borewell",
   involvedInLivestockActivity: "Cow, Goat"
 },


 householdFamilyMember: []

});
export const HouseHoldFormValidationSchema = () => ({
  // Add validation schema as needed using Yup
  householdBasicProfile: Yup.object().shape({
    district: Yup.string().required('District is required'),
    block: Yup.string().required('Block is required'),
    gramPanchayat: Yup.string().required('Gram Panchayat is required'),
    revenueVillage: Yup.string().required('Revenue Village is required'),
    hamlet: Yup.string().required('Hamlet is required'),
    headOfTheHouseholdNameAsPerAadhar: Yup.string().required('Head of the Household Name is required'),
    headOfTheHouseholdGender: Yup.string().required('Head of the Household Gender is required'),
    aadharNo: Yup.string().required('Aadhar Number is required'),
    socialCategory: Yup.string().required('Social Category is required'),
    bankAccountNumber: Yup.string().required('Bank Account Number is required'),
    bankName: Yup.string().required('Bank Name is required'),
    ifscCodeOrBranch: Yup.string().required('IFSC Code/Branch is required'),
    womenMemberName: Yup.string().required('Women Member Name is required'),
    womenMemberAge: Yup.number().required('Women Member Age is required'),
    womenMemberMaritalStatus: Yup.string().required('Women Member Marital Status is required'),
    womenMemberRelationshipWithHead: Yup.string().required('Women Member Relationship with Head is required'),
    isWomenCoveredUnderSHG: Yup.boolean().required('Is Women Covered Under SHG is required'),
    isWomenCoveredUnderSubhadraYojana: Yup.boolean().required('Is Women Covered Under Subhadra Yojana is required'),
    totalFamilyMembers: Yup.number().required('Total Family Members is required'),
    hasRationCard: Yup.boolean().required('Has Ration Card is required'),
    rationCardNumber: Yup.string().required('Ration Card Number is required'),
    drinkingWaterSource: Yup.string().required('Drinking Water Source is required'),
    hasUjjwalaLPGConnection: Yup.boolean().required('Has Ujjwala LPG Connection is required'),
    hasLabourCard: Yup.boolean().required('Has Labour Card is required'),
    isCoveredUnderNSKY: Yup.boolean().required('Is Covered Under NSKY is required'),
    geoLocation: Yup.string().required('Geo Location is required'),
    entryBy: Yup.string().required('Entry By is required')
  }),
  householdEntitlement: Yup.object().shape({
    kishanSchemeCoverage: Yup.string().required('Kishan Scheme Coverage is required'),
    hasRuralHousingSchemeHouse: Yup.boolean().required('Has Rural Housing Scheme House is required'),
    hasIndividualHouseholdLatrine: Yup.boolean().required('Has Individual Household Latrine is required'),
    hasElectricityConnection: Yup.boolean().required('Has Electricity Connection is required'),
    hasMGNREGSJobCard: Yup.boolean().required('Has MGNREGS Job Card is required'),
    fullJobCardNumber: Yup.string().required('Full Job Card Number is required'),
    hasJanDhanYojanaAccount: Yup.boolean().required('Has Jan Dhan Yojana Account is required'),
    isCoveredUnderAyushmanBharat: Yup.boolean().required('Is Covered Under Ayushman Bharat is required'),
    isEnrolledUnderShramYogiMaandhan: Yup.boolean().required('Is Enrolled Under Shram Yogi Maandhan is required'),
    isCoveredUnderPMJJBY: Yup.boolean().required('Is Covered Under PMJJBY is required'),
    isCoveredUnderPMSBY: Yup.boolean().required('Is Covered Under PMSBY is required')
  }),
  householdMigrationStatus: Yup.object().shape({
    hasFamilyMemberMigratedLast3Years: Yup.boolean().required('Has Family Member Migrated in Last 3 Years is required'),
    takenAdvanceForMigrationFromMiddleman: Yup.boolean().required('Taken Advance for Migration from Middleman is required'),
    minorChildrenAccompaniedMigration: Yup.boolean().required('Minor Children Accompanied Migration is required'),
    womenMembersMigrated: Yup.boolean().required('Women Members Migrated is required'),
    familyContactMobileNo: Yup.string().required('Family Contact Mobile No. is required'),
    respondentIdentity: Yup.string().required('Respondent Identity is required'),
    respondentPhotoPathOrUrl: Yup.string().required('Respondent Photo is required')
  }),
  householdOccupationAndLand: Yup.object().shape({
    primaryOccupationOfTheFamily: Yup.string().required('Primary Occupation of the Family is required'),
    otherPrimaryOccupationDetails: Yup.string(),
    isFamilyInvolvedInWeavingOrHandloom: Yup.boolean().required('Is Family Involved in Weaving or Handloom is required'),
    isFamilyCoveredUnderPOHI_LoomsScheme: Yup.boolean().required('Is Family Covered Under POHI/Looms Scheme is required'),
    fraClaimantStatus: Yup.string().required('FRA Claimant Status is required'),
    fra_LandAmountInAcres: Yup.number().required('FRA Land Amount in Acres is required'),
    ownsHomesteadPattaLand: Yup.boolean().required('Owns Homestead Patta Land is required'),
    approximatePrivateLandHolding: Yup.string().required('Approximate Private Land Holding is required'),
    isIrrigationFacilityAvailable: Yup.boolean().required('Is Irrigation Facility Available is required'),
    sourcesOfIrrigation: Yup.string().required('Sources of Irrigation is required'),
    involvedInLivestockActivity: Yup.string().required('Involved in Livestock Activity is required')
  }),
  householdFamilyMember: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Family Member Name is required'),
      age: Yup.number().required('Family Member Age is required'),
      gender: Yup.string().required('Family Member Gender is required'),
      educationalQualification: Yup.string().required('Education Level is required'),
      migratedInLast3Years: Yup.boolean().required('Migrated in Last 3 Years is required'),
      destinationState: Yup.string().required('Destination State is required'),
      sectorOfEngagementDuringMigration: Yup.string().required('Sector of Engagement During Migration is required'),
        periodOfMigration: Yup.string().required('Period of Migration is required'),
        monthlyRemittanceDuringMigration: Yup.number().required('Monthly Remittance During Migration is required'),
        interestInSkillDevelopment: Yup.string().required('Interest in Skill Development is required'),
    })
)
})
