import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Spacing, PasswordInput, VectorIcon } from '../../../components';
import { RouteName } from '../../../routes';
import { Style, Login } from '../../../styles';
import { SH, SF } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import images from '../../../index';

const LoginScreen = (props) => {
    const { Colors } = useTheme();
    const Logins = useMemo(() => Login(Colors), [Colors]);
    const { navigation } = props;
    const [mobileNumber, setMobileNumber] = useState('');
    const [passwordVisibility, setpasswordVisibility] = useState(true);
    const [TextInputPassword, setTextInputPassword] = useState('');
    const onChangeText = (text) => {
        if (text === 'TextInputPassword') setpasswordVisibility(!passwordVisibility);
    };
    const { t } = useTranslation();

    const OnRegisterPress = () => {
        navigation.navigate(RouteName.REGISTER_SCREEN);
    }

    return (
        <View style={Style.CentrViewMin}>
            <Image source={images.Bottom_Shap_Top} style={Style.BottomImageShapp} />
            <ScrollView
                contentContainerStyle={Style.ScrollViewStyle}>
                <View style={Logins.SetPadding}>
                    <View style={Logins.CenterImage}>
                        <Image source={images.Login_Logo} style={Logins.LogoImageStyle} />
                    </View>
                    <Spacing space={SH(20)} />
                    <View style={Logins.LogIntoAccount}>
                        {/* <Text style={Logins.LoginText}>{t("Survey_Title_57")}</Text> */}
                        {/* <Text style={Logins.LoginText}>{t("Survey_Title_58")}</Text> */}
                    </View>
                    <Spacing space={SH(30)} />
                    <View style={Logins.InputSpaceView}>
                        <Input
                            title={t("Mobile_Number")}
                            placeholder={t("Mobile_Number")}
                            onChangeText={(value) => setMobileNumber(value)}
                            value={mobileNumber}
                            inputType="numeric"
                            maxLength={10}
                            placeholderTextColor={Colors.gray_text_color}
                        />
                    </View>
                    <Spacing space={SH(20)} />
                    <PasswordInput
                        name={passwordVisibility ? 'eye-off' : 'eye'}
                        label={t("Password_Text")}
                        placeholder={t("Password_Text")}
                        value={TextInputPassword}
                        onPress={() => { onChangeText("TextInputPassword") }}
                        onChangeText={(text) => setTextInputPassword(text)}
                        secureTextEntry={passwordVisibility}
                    />

                    <Spacing space={SH(29)} />
                    <View style={Logins.LoginButton}>
                        <Button
                            title={t("Login_Text")}
                            onPress={() => navigation.navigate(RouteName.OTP_VERYFY_SCREEN)}
                        />
                    </View>
                    <Spacing space={SH(20)} />
                    <View style={Style.FlexRowForgot}>
                        <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
                            <Text style={Logins.ForgetPasswordStyles}>{t("Forgot_Password")}</Text>
                        </TouchableOpacity>
                        <View style={Logins.ViewTextStyle}>
                            <Text style={Logins.TextStyle}>{t("Dont_Have_Account")} <Text style={Logins.registerTextStyle} onPress={() => OnRegisterPress()}> {t("Register_Text")}</Text></Text>
                        </View>
                    </View>
                    <Spacing space={SH(20)} />
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
}
export default LoginScreen;