import React, { useState, useMemo } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, } from "react-native";
import { HelpScreenStyles, HelpScreenStyle, Style } from '../../styles';
import { Button, Spacing, ConfirmationAlert, Input, Container } from '../../components';
import { SH } from '../../utils';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const HelpScreen = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const { Colors } = useTheme();
  const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
  const [alertMessage, setAlertMessage] = useState('');
  const [helptext, setHelptext] = useState('');

  var alertdata = {
    'logout': t("Help_sand_mail_Successful"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.HOME_TAB);
  }

  return (
      <View style={Style.CentrViewMin}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.ScrollViewStyles}>
          <KeyboardAvoidingView enabled>
            <View style={HelpScreenStyle.HelpViewStyles}>
              <Spacing space={SH(30)} />
              <View style={HelpScreenStyle.MinContentView}>
                <View style={HelpScreenStyle.WhiteBgcolor}>
                  <View>
                    <Spacing space={SH(20)} />
                    <Input inputStyle={HelpScreenStyle.TextInputWidth}
                      placeholder={t("Type_Your_Message")}
                      value={helptext}
                      onChangeText={(text) => setHelptext(text)}
                      placeholderTextColor="gray" />
                  </View>
                  <View>
                    <Text style={HelpScreenStyle.TextInputeText}>{t("Help_paregraph")}</Text>
                  </View>
                  <View style={HelpScreenStyle.ButtonStyle}>
                    <Button onPress={() => {
                      setAlertVisible(true);
                      setAlertMessage(alertdata.logout);
                    }} title={t("Help_sand_mail")} />
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <ConfirmationAlert
          message={alertMessage}
          modalVisible={alertVisible}
          iconVisible={true}
          setModalVisible={setAlertVisible}
          onPressCancel={() => setAlertVisible(!alertVisible)}
          onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
          buttonminview={HelpScreenStyle.FlexCenterButton}
          buttonText={t("Ok")}
        />
      </View>
  );
};
export default HelpScreen;
