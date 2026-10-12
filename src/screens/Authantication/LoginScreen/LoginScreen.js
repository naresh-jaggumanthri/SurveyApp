import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  Input,
  Spacing,
  PasswordInput,
} from '../../../components';
import { RouteName } from '../../../routes';
import { Style, Login } from '../../../styles';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import images from '../../../index';
import { Formik } from 'formik';
import {
  decodeJWT,
  getVillageMembersCount,
  LoginFormInitialValues,
  LoginValidationSchema,
  saveMasters,
} from './LoginHelper';
import api from '../../../api';
import { APP_NAME, AppOkAlert } from '../../../utils/AlertHelper';
import { login_data_action } from '../../../redux/action/DataAction';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/commonComponents/Loader';
import useLoginLockout from './useLoginLockout';
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginScreen = (props) => {
  const { Colors } = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   const [password, setPassword] = useState('');
    const [name, setName] = useState('');
   const onChangeText = text => {
    if (text === 'TextInputPassword')
      setPasswordVisibility(!passwordVisibility);
  };

  const { isLocked, remainingSeconds, attemptsLeft, registerFailure, lockFor, reset } = useLoginLockout();

  const onLoginPress = async (values) => {
    if (isLocked || loading) return;
    setError('');
    setLoading(true);

    try {
      const res = await api.user.signIn(
        null,
        null,
        {
          username: values?.username,
          password: values?.password,
        },
        undefined
      );

      if (res?.status === 429) {
        const retryAfter = parseInt(res.headers?.get('Retry-After') || '900', 10);
        lockFor(retryAfter * 1000);
        setError('Too many attempts. Please try again later.');
        setLoading(false);
        return;
      }

      if (res?.status === 401 || res?.status === 'CODE_ERROR') {
        registerFailure();
        setError('Invalid credentials.');
        setLoading(false);
        AppOkAlert('Login Failed', () => {}, 'OK', APP_NAME);
        return;
      }

      if (res?.status === 'OK') {
        reset();
        const token = res?.token;
        await saveMasters(token);
        const userData = await decodeJWT(token);

        const user = {
          fullname: userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
          name: userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          email: userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          role: userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          issuer: userData?.iss,
          audience: userData?.aud,
          expiryDate: userData?.exp,
        };

        const finalValues = {
          username: user.fullname,
          roleId: user.role,
          roleName: user.role == 1 ? 'Mobile User' : user.role == 2 ? 'Approver' : 'Admin',
          emailId: user.email,
          naem: user.name,
          password: values.password,
          token: res.token,
          state: res.state,
          district: res.district,
          block: res.block,
          gp: res.gp,
          village: res.village,
        };

        dispatch(login_data_action(finalValues));
        await getVillageMembersCount(finalValues);
        await EncryptedStorage.setItem('user_session', JSON.stringify(finalValues));

        setLoading(false);
        navigation.navigate(RouteName.HOME_SCREEN);
        return;
      }

      setLoading(false);
      AppOkAlert('Login Failed, Invalid credentials', () => {}, 'OK', APP_NAME);
    } catch (e) {
      setLoading(false);
      setError('An unexpected error occurred.');
    }
  };

  const mm = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const ss = String(remainingSeconds % 60).padStart(2, '0');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background || '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ flex: 1 }}>
        {/* Background Image / Top Graphic */}
        <Image
          source={images.Bottom_Shap_Top}
          style={[Style.BottomImageShapp, { resizeMode: 'cover' }]}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View style={[Logins.SetPadding, { paddingHorizontal: 20 }]}>
            
            {/* Logo Section */}
            <View style={Logins.CenterImage}>
              <Image
                source={images.new_logo}
                style={[Logins.LogoImageStyle, { resizeMode: 'contain' }]}
              />
            </View>

            <Spacing space={SH(20)} />

            {/* Formik Setup */}
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginValidationSchema()}
              onSubmit={(values) => onLoginPress(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View style={{ width: '100%' }}>
                  
                  {/* Mobile Number Input */}
                  <View style={Logins.InputSpaceView}>
                   <Input
                    title={t('Mobile_Number')}
                    placeholder={t('Mobile_Number')}
                    onChangeText={value => {
                      // Removes all spaces from the input string
                      const cleanValue = value.replace(/\s/g, '');
                      setName(cleanValue);
                      setFieldValue('username', cleanValue);
                    }}
                    value={name}
                    // inputType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray_text_color}
                  />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                      {errors.username}
                    </Text>
                  )}

                  <Spacing space={SH(15)} />

                  {/* Password Input */}
                <PasswordInput
                  name={passwordVisibility ? 'eye-off' : 'eye'}
                  label={t('Password_Text')}
                  placeholder={t('Password_Text')}
                  value={password}
                  onPress={() => {
                    onChangeText('TextInputPassword');
                  }}
                  maxLength={14}
                  onChangeText={value => {
                    const cleanValue = value.replace(/\s/g, '');
                    setPassword(cleanValue);
                    setFieldValue('password', cleanValue);
                  }}
                  secureTextEntry={passwordVisibility}
                />
                  {touched.password && errors.password && (
                    <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                      {errors.password}
                    </Text>
                  )}

                  <Spacing space={SH(20)} />

                  {/* Lockout / Error Warnings */}
                  {!!error && (
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>
                      {error}
                    </Text>
                  )}

                  {isLocked ? (
                    <Text style={{ textAlign: 'center', color: 'orange', marginBottom: 8 }}>
                      Account temporarily locked. Try again in {mm}:{ss}
                    </Text>
                  ) : (
                    attemptsLeft < 3 && attemptsLeft > 0 && (
                      <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 8 }}>
                        {attemptsLeft} attempts remaining
                      </Text>
                    )
                  )}

                  {/* Submit Button */}
                  <View style={Logins.LoginButton}>
                    <Button
                      title={t('Login_Text')}
                      onPress={handleSubmit}
                      disabled={loading || isLocked}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>

      {/* Global Loader Component */}
      <Loader visible={loading} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;