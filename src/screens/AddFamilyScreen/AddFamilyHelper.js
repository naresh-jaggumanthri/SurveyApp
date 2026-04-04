import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  familyMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(3, 'Min 3 chars').required('Required'),
      age: Yup.number().typeError('Enter valid age').required('Required'),
      gender: Yup.string().required('Required'),
    })
  ),
});