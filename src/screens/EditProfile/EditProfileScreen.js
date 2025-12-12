import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image,ScrollView } from "react-native";
import { ProfileTabStyles, Style,AnalyaticsStyle } from '../../styles';
import { RouteName } from '../../routes';
import { SH } from "../../utils";
import { Button, Input, Spacing, ConfirmationAlert } from "../../components";
import { useTranslation } from "react-i18next";
import images from "../../index";

const EditProfileScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  const array = {
    fullname: '',
    mobilenumber: '',
    email: '',
    Password:'',
  }
  const [state, setState] = useState(array);
  const [alertOtpVisible, setAlertOtpVisible] = useState(false);
  const [alertOtpMessage, setAlertOtpMessage] = useState('');

  let alerOtptdata = {
    'logout': t("Home_Title_56"),
  }
  const OtpButton = () => {
    navigation.navigate(RouteName.HOME_TAB);
  }

  const { Colors } = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
  return (
    <>
      <View style={Style.BgColorWhiteAll}>
        <ScrollView>
      <Spacing space={SH(25)} />
        <View style={ProfileTabStyle.ImageCenter}>
          <Image source={images.Chat_image_five} style={ProfileTabStyle.ImageBorderRedus} />
        </View>
        <Spacing space={SH(25)} />
        <View style={ProfileTabStyle.padH20}>
          <Input
           titleStyle={AnalyaticsStyles.TitleStyle}
            title={t("Name_Label")}
            placeholder={"Gus Atkinson"}
            value={state.fullname}
            onChangeText={(text) => setState({ ...state, fullname: text })}
          />
        </View>
        <Spacing space={SH(15)} />
        <View style={ProfileTabStyle.padH20}>
          <Input
           titleStyle={AnalyaticsStyles.TitleStyle}
            title={t("Home_Title_57")}
            placeholder={"+91 2443543543"}
            keyboardType="numeric"
            value={state.mobilenumber}
            onChangeText={(text) => setState({ ...state, mobilenumber: text })}
          />
        </View>
        <Spacing space={SH(15)} />
        <View style={ProfileTabStyle.padH20}>
          <Input
           titleStyle={AnalyaticsStyles.TitleStyle}
            title={t("Home_Title_58")}
            placeholder={"example@gmail.com"}
            autoCorrect={false}
            value={state.email}
            onChangeText={(text) => setState({ ...state, email: text })}
          />
        </View>
        <Spacing space={SH(15)} />
        <View style={ProfileTabStyle.padH20}>
          <Input
           titleStyle={AnalyaticsStyles.TitleStyle}
            title={t("Home_Title_59")}
            placeholder={"example123**"}
            autoCorrect={false}
            value={state.Password}
            onChangeText={(text) => setState({ ...state, Password: text })}
          />
        </View>
        <Spacing space={SH(45)} />
        <View style={ProfileTabStyle.padH20Two}>
          <Button title={t("Survey_Title_8")}
            onPress={() => {
              setAlertOtpVisible(true);
              setAlertOtpMessage(alerOtptdata.logout);
          }}
          />
        </View>
        <Spacing space={SH(35)} />
        </ScrollView>
      </View>
      <ConfirmationAlert
        iconVisible={true}
        message={alertOtpMessage}
        modalVisible={alertOtpVisible}
        setModalVisible={setAlertOtpVisible}
        onPress={() => { setAlertOtpVisible(!alertOtpVisible), OtpButton() }}
        buttonText={t("Ok")}
        source={images.loginsuccessful}
        Lottiewidthstyle={ProfileTabStyle.logoutStyel}
        buttonminview={ProfileTabStyle.centerBtn}
      />
    </>
  );
};

export default EditProfileScreen;
