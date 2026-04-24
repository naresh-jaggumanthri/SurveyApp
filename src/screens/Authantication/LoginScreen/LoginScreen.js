import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Button,
  Input,
  Spacing,
  PasswordInput,
  VectorIcon,
} from '../../../components';
import {RouteName} from '../../../routes';
import {Style, Login} from '../../../styles';
import {SH, SF} from '../../../utils';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import images from '../../../index';
import {Formik} from 'formik';
import {
  decodeJWT,
  LoginFormInitialValues,
  LoginValidationSchema,
  saveMasters,
} from './LoginHelper';
import api from '../../../api';
import {APP_NAME, AppOkAlert} from '../../../utils/AlertHelper';
import DataReducer from '../../../redux/reducers/DataReducer';
import {login_data_action} from '../../../redux/action/DataAction';
import {useDispatch} from 'react-redux';
import Loader from '../../../components/commonComponents/Loader';

const LoginScreen = props => {
  const {Colors} = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const {navigation} = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [TextInputPassword, setTextInputPassword] = useState('');
  const dispatch = useDispatch();
  const onChangeText = text => {
    if (text === 'TextInputPassword')
      setpasswordVisibility(!passwordVisibility);
  };
  const {t} = useTranslation();

  const OnRegisterPress = () => {
    navigation.navigate(RouteName.REGISTER_SCREEN);
  };
  const onLoginPress = async values => {
    setLoading(true);
    const res = await api.user.signIn(
      null,
      null,
      {
        username: values.username,
        password: values.password,
      },
      undefined,
    );
  

    if (res?.status == 'CODE_ERROR') {
      setLoading(false);
      AppOkAlert('Login Failed', () => {}, 'OK', APP_NAME);
      return;
    }
    if (res?.status == 'OK') {
      try {
        setLoading(false);
        const token = res?.token;
        await saveMasters(token);
        const userData = await decodeJWT(token);

        const user = {
          fullname:
            userData[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
            ],
          name: userData[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ],
          email:
            userData[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ],
          role: userData[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
          issuer: userData?.iss,
          audience: userData?.aud,
          expiryDate: userData?.exp,
        };
        
    
      let finalValues = {
        username: user.fullname,
        roleId:user.role,
        roleName:user.role == 1 ? "Mobile User" : user.role == 2 ? "Approver" : "Admin",
        emailId:user.email,
        naem:user.name,
        password: values.password,
        token: res.token,
        state: res.state,
        district: res.district,
        block: res.block,
        gp: res.gp,
        village: res.village
      };
      dispatch(login_data_action(finalValues));
      // navigation.navigate(RouteName.OTP_VERYFY_SCREEN)
      navigation.navigate(RouteName.HOME_SCREEN);
      return;
        } catch (e) {}
    }
    setLoading(false);
  };

  return (
    <View style={Style.CentrViewMin}>
      <Image source={images.Bottom_Shap_Top} style={Style.BottomImageShapp} />
      <ScrollView contentContainerStyle={Style.ScrollViewStyle}>
        <View style={Logins.SetPadding}>
          <View style={Logins.CenterImage}>
            <Image source={images.new_logo} style={Logins.LogoImageStyle} />
          </View>
          <Spacing space={SH(20)} />
          <View style={Logins.LogIntoAccount}>
            {/* <Text style={Logins.LoginText}>{t("Survey_Title_57")}</Text> */}
            {/* <Text style={Logins.LoginText}>{t("Survey_Title_58")}</Text> */}
          </View>
          <Spacing space={SH(30)} />
          <Formik
            initialValues={LoginFormInitialValues(name, password)}
            validationSchema={LoginValidationSchema(name, password)}
            onSubmit={values => {
              onLoginPress(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={Logins.InputSpaceView}>
                  <Input
                    title={t('Mobile_Number')}
                    placeholder={t('Mobile_Number')}
                    onChangeText={value => {
                      setName(value);
                      setFieldValue('username', value);
                    }}
                    value={name}
                    // inputType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray_text_color}
                  />
                </View>
                <Text style={{color: 'red'}}>{errors.username}</Text>

                <Spacing space={SH(20)} />
                <PasswordInput
                  name={passwordVisibility ? 'eye-off' : 'eye'}
                  label={t('Password_Text')}
                  placeholder={t('Password_Text')}
                  value={password}
                  onPress={() => {
                    onChangeText('TextInputPassword');
                  }}
                  maxLength={7}
                  onChangeText={text => {
                    setPassword(text);
                    setFieldValue('password', text);
                  }}
                  secureTextEntry={passwordVisibility}
                />
                <Text style={{color: 'red'}}>{errors.password}</Text>

                <Spacing space={SH(29)} />
                <View style={Logins.LoginButton}>
                  <Button
                    title={t('Login_Text')}
                    onPress={
                      () => {
                        // navigation.navigate(RouteName.HOME_SCREEN);
                        handleSubmit();
                      }

                      // navigation.navigate(RouteName.OTP_VERYFY_SCREEN)
                    }
                  />
                  <Loader visible={loading} />
                </View>
              </>
            )}
          </Formik>

          <Spacing space={SH(20)} />
          {/* <View style={Style.FlexRowForgot}>
                        <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
                            <Text style={Logins.ForgetPasswordStyles}>{t("Forgot_Password")}</Text>
                        </TouchableOpacity>
                        <View style={Logins.ViewTextStyle}>
                            <Text style={Logins.TextStyle}>{t("Dont_Have_Account")} <Text style={Logins.registerTextStyle} onPress={() => OnRegisterPress()}> {t("Register_Text")}</Text></Text>
                        </View>
                    </View>
                    <Spacing space={SH(20)} /> */}
          {/* <Text style={Logins.OrTextStyle}>Or</Text>
                    <Spacing space={SH(20)} />
                    <View style={Logins.FlexRowSignUp}>
                        <TouchableOpacity style={Logins.BackGroundColorSet}>
                            <Image source={images.Google_image} resizeMode="contain" style={Logins.GoogleImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={Logins.BackGroundColorSet}>
                            <VectorIcon icon="Entypo" name="facebook-with-circle" size={SF(45)} color={Colors.theme_background} />
                        </TouchableOpacity>
                    </View> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
