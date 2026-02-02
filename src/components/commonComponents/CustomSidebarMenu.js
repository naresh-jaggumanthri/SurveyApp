import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Sidemenu } from '../../styles';
import { RouteName } from '../../routes';
import { ConfirmationAlert, VectorIcon } from '../../components';
import { Colors, SF } from '../../utils';
import { useTranslation } from "react-i18next";
 import Config from "react-native-config";

const CustomSidebarMenu = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN);
  }
  const Onpressfunction = (e) => {
    navigation.toggleDrawer();
    navigation.navigate(e)
  };

  return (
    <ScrollView>
      <View style={Sidemenu.customslidebarmenu}>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.HOME_TAB)
        }>
          <VectorIcon
            icon="Feather"
            size={SF(19)}
            name="home"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_1")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.SURVEY_TAB)
        }>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="folder-open"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_2")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.SURVEY_TAB)
        }>
          <VectorIcon
            icon="AntDesign"
            size={SF(19)}
            name="form"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_3")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.FAMILY_SURVEY_TAB)
        }>
          <VectorIcon
            icon="AntDesign"
            size={SF(19)}
            name="form"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_11")}</Text>
        </TouchableOpacity>
         <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.FAMILY_LIST_TAB)
        }>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="list"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("HH Survey List")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.VILLAGE_SURVEY_TAB)
        }>
          <VectorIcon
            icon="AntDesign"
            size={SF(19)}
            name="form"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_12")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.VILLAGE_LIST_TAB)
        }>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="list"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Village Survey List")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.VIEW_REPORT_SCREEN)
        }>
          <VectorIcon
            icon="MaterialIcons"
            size={SF(19)}
            name="report"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_4")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.EDIT_LOCATION_SCREEN)
        }>
          <VectorIcon
            icon="AntDesign"
            size={SF(19)}
            name="edit"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_5")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.MAP_SCREEN)
        }>
          <VectorIcon
            icon="Entypo"
            size={SF(19)}
            name="map"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_6")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.SETTING_SCREEN)
        }>
          <VectorIcon icon="AntDesign" size={SF(19)} name="setting" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Setting_Text")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.FAQ_SCREEN)
        }>
          <VectorIcon icon="Entypo" size={SF(19)} name="help" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("FAQ_Text")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.REVIEWS_SCREEN)
        }>
          <VectorIcon icon="Entypo" size={SF(19)} name="star" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Reviews_Screen")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.NOTIFICTION_SCREEN)
        }>
          <VectorIcon icon="Ionicons" size={SF(19)} name="notifications" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Notification_Text")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.PROFILE_TAB)
        }>
          <VectorIcon icon="FontAwesome" size={SF(19)} name="user-circle" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_7")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.EDIT_PROFILE_SCREEN)
        }>
          <VectorIcon icon="AntDesign" size={SF(19)} name="edit" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Side_Title_8")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.HELP_SCREEN)
        }>
          <VectorIcon icon="FontAwesome5" size={SF(19)} name="hands-helping" style={Sidemenu.logoimage} color={Colors.theme_background} />
          <Text style={Sidemenu.hometextstyle}>{t("Help_Text")}</Text>
        </TouchableOpacity> */}
        <View style={Sidemenu.settingandlogout}>
          <TouchableOpacity style={Sidemenu.flexrowset} onPress={() => {
            setAlertVisible(true);
            setAlertMessage(alertdata.logout);
          }}>
            <VectorIcon
              icon="Entypo" name="log-out" color={Colors.theme_background} size={SF(23)} />
            <Text style={Sidemenu.hometextstyle}>{t("Log_Out")}</Text>
          </TouchableOpacity>
        </View>
         {/* ===== VERSION FOOTER ===== */}
      <View style={{
        paddingVertical: 10,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
      }}>
        <Text style={{ fontSize: 12, color: '#888' }}>
          Version {Config.VERSION_NAME} ({Config.VERSION_CODE})
        </Text>
      </View>
        <ConfirmationAlert
          message={alertMessage}
          modalVisible={alertVisible}
          setModalVisible={setAlertVisible}
          onPressCancel={() => setAlertVisible(!alertVisible)}
          onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
          cancelButtonText={t("Cancel_Button")}
          buttonText={t("Ok")}
        />
      </View>
    </ScrollView>
  );
};
export default CustomSidebarMenu;

