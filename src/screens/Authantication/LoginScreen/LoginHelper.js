import * as Yup from 'yup';
export const LoginFormInitialValues = (username, password) => {
    return{
        username: username || '',
        password: password || '',
    }
}

export const LoginValidationSchema = (username, password) => {
    return Yup.object().shape({
        username: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Password is Required'),
    });
}