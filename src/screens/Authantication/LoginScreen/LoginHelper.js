import { Alert } from 'react-native';
import * as Yup from 'yup';
import { decode as atob } from 'base-64';
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

export async function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Now atob will work!
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Decoding failed:", error);
    return null;
  }
}