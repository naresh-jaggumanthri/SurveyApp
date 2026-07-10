import * as Yup from 'yup';

// export const validationSchema = Yup.object().shape({
//   familyMembers: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().min(3, 'Min 3 chars').required('Required'),
//       age: Yup.number().typeError('Enter valid age').required('Required'),
//       gender: Yup.string().required('Required'),
//     })
//   ),
// });

// import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  familyMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(30, 'Name cannot exceed 30 characters'),
      age: Yup.number()
        .typeError('Age must be a number')
        .required('Age is required')
        .min(18, 'Age must be at least 18')
        .max(90, 'Please enter a valid age'),
      gender: Yup.string()
        .required('Gender is required'),
      educationalQualification: Yup.string()
        .required('Educational Qualification is required'),
      relationshipWithHeadOfHousehold: Yup.string()
        .required('Relationship is required'),
      memberHasLabourCard: Yup.boolean()
        .required('Please select if member has a labour card')
        .nullable(),
      memberCoveredUnderNSKY: Yup.boolean()
        .required('Please select if member is covered under NSKY')
        .nullable(),
      destinationState: Yup.string()
        .required('Destination State is required'),
      sectorOfEngagementDuringMigration: Yup.string()
        .required('Sector of engagement is required'),
      migratedInLast3Years: Yup.boolean()
        .required('Please select migration status')
        .nullable(),
      
      // Conditional Validation: Required only if migratedInLast3Years is true
      periodOfMigration: Yup.string().when('migratedInLast3Years', {
        is: true,
        then: () => Yup.string().required('Period of migration is required'),
        otherwise: () => Yup.string().nullable(),
      }),
      monthlyRemittanceDuringMigration: Yup.string().when('migratedInLast3Years', {
        is: true,
        then: () => Yup.string().required('Monthly income during migration is required'),
        otherwise: () => Yup.string().nullable(),
      }),

      interestInSkillDevelopment: Yup.boolean()
        .required('Please select interest in skill development')
        .nullable(),
    })
  )
});