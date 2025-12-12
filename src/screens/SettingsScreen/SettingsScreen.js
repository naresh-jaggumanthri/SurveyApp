import React, { useState, } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SettingStyle, Style, LanguageStyles } from '../../styles';
import { Spacing, Container, VectorIcon, Switchs, ModalLanguage } from '../../components';
import { SH, SF, Colors } from '../../utils';
import { useTranslation } from "react-i18next";

const SettingStylesScreen = () => {
  const stateArray = {
    Blutooth: false,
    Notification: true,
    CloudBackup: false,
    DarkMode: false,
  };
  const [checked, setChecked] = useState(stateArray);
  let englishLanguage = "English";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);
  const { t } = useTranslation();

  const changeLang = (e) => {
    setSelectLabel(e)
  }
  return (
    <View style={Style.BgColorWhiteAll}>
      <ScrollView>
        <View style={Style.Container}>
          <View style={Style.MinViewContent}>
            <Spacing space={SH(20)} />
            <View style={SettingStyle.WhiteNotifoication}>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView}>
                    <VectorIcon icon="Feather" name="bluetooth" color={Colors.white_text_color} size={SF(18)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_1")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_2")}</Text>
                  </View>
                </View>
                <View style={SettingStyle.SwithWidthVieww}>
                  <Switchs
                    value={checked.Blutooth}
                    onValueChange={(value) => setChecked({ ...checked, Blutooth: value })}
                  />
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView2}>
                    <VectorIcon icon="Ionicons" name="notifications" color={Colors.white_text_color} size={SF(18)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_3")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_4")}</Text>
                  </View>
                </View>
                <View style={SettingStyle.SwithWidthVieww}>
                  <Switchs
                    value={checked.Notification}
                    onValueChange={(value) => setChecked({ ...checked, Notification: value })}
                  />
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView3}>
                    <VectorIcon icon="AntDesign" name="clouddownloado" color={Colors.white_text_color} size={SF(26)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_5")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_6")}</Text>
                  </View>
                </View>
                <View style={SettingStyle.SwithWidthVieww}>
                  <Switchs
                    value={checked.CloudBackup}
                    onValueChange={(value) => setChecked({ ...checked, CloudBackup: value })}
                  />
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView4}>
                    <VectorIcon icon="MaterialIcons" name="dark-mode" color={Colors.white_text_color} size={SF(18)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_7")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Floting toolbar for streaming videos")}</Text>
                  </View>
                </View>
                <View style={SettingStyle.SwithWidthVieww}>
                  <Switchs
                    value={checked.DarkMode}
                    onValueChange={(value) => setChecked({ ...checked, DarkMode: value })}
                  />
                </View>
              </View>
            </View>
            <Spacing space={SH(20)} />
            <View style={SettingStyle.WhiteNotifoication}>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextViewTwo}>
                  <View style={SettingStyle.BlututhIconView}>
                    <VectorIcon icon="Entypo" name="key" color={Colors.white_text_color} size={SF(18)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_8")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_9")}</Text>
                  </View>
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextViewTwo}>
                  <View style={SettingStyle.BlututhIconView2}>
                    <VectorIcon icon="Entypo" name="language" color={Colors.white_text_color} size={SF(22)} />
                  </View>
                  <TouchableOpacity>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_10")}</Text>
                    <Spacing space={SH(5)} />
                    <TouchableOpacity style={SettingStyle.LanguAgeView} onPress={() => setModalVisible(true)}>
                      <Text style={LanguageStyles.SelectTextSettings}>{selectLabel}</Text>
                      <VectorIcon icon="Feather" name="chevron-down" color={Colors.black_text_color} size={SF(25)} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView3}>
                    <VectorIcon icon="Entypo" name="lock-open" color={Colors.white_text_color} size={SF(22)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_11")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_12")}</Text>
                  </View>
                </View>
              </View>
              <View style={SettingStyle.FlexRowTextStyle}>
                <View style={SettingStyle.BlututhTextView}>
                  <View style={SettingStyle.BlututhIconView4}>
                    <VectorIcon icon="AntDesign" name="info" color={Colors.white_text_color} size={SF(28)} />
                  </View>
                  <View>
                    <Text style={SettingStyle.BlututhText}>{t("Setting_Title_13")}</Text>
                    <Text style={SettingStyle.BlututhTextSmall}>{t("Setting_Title_14")}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalLanguage modalVisible={modalVisible}
        setModalVisible={() => {
          setModalVisible(!modalVisible);
        }}
        close={() => setModalVisible(!modalVisible)}
        OnClose={() => setModalVisible(false)}
        changeLang={changeLang}
      />
      </View>
  );
};
export default SettingStylesScreen;
