import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, Image, FlatList } from "react-native";
import { ProfileTabStyles, Style } from '../../../styles';
import { Button, Spacing, ProfileAccountView } from '../../../components';
import images from "../../../index";
import { SH } from '../../../utils';
import { RouteName } from "../../../routes";
import { useTranslation } from "react-i18next";

const ProfileTab = (props) => {
  const { navigation } = props;
  const CategoryData = [
    {
      "id": 1,
      "text": 'Survey_Title_13',
      "url": RouteName.NOTIFICTION_SCREEN,
    },
    {
      "id": 2,
      "text": 'Survey_Title_14',
      "url": RouteName.SURVEY_TAB,
    },
    {
      "id": 3,
      "text": 'Survey_Title_15',
      "url": RouteName.VIEW_REPORT_SCREEN,
    },
    {
      "id": 4,
      "text": 'Survey_Title_16',
      "url": RouteName.SETTING_SCREEN,
    },
    {
      "id": 5,
      "text": 'Survey_Title_17',
      "url": RouteName.FAQ_SCREEN,
    },
    {
      "id": 6,
      "text": 'Survey_Title_18',
      "url": RouteName.HELP_SCREEN,
    },
  ]
  const { t } = useTranslation();

  const { Colors } = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);

  return (
    <View style={Style.BgColorWhiteAll}>
      <ScrollView>
        <View style={Style.Container}>
          <View style={Style.MinViewContent}>
            <Spacing space={SH(10)} />
            <View style={ProfileTabStyle.FlexViewProfile}>
              <View>
                <Image source={images.Chat_image_five} style={ProfileTabStyle.ImageStyles} />
              </View>
              <View style={ProfileTabStyle.ProfileView}>
                <Text style={ProfileTabStyle.TextViewStyle}>{t("Survey_Title_9")}</Text>
                <Text style={ProfileTabStyle.TextViewStyleTwo}>{t("Survey_Title_10")}</Text>
                <Text style={ProfileTabStyle.TextViewStyleTwo}>{t("Survey_Title_11")}</Text>
                <Text style={ProfileTabStyle.TextViewStyleTwo}>+91 2443543543</Text>
                <Spacing space={SH(10)} />
                <Button buttonStyle={ProfileTabStyle.ButtonStyle} onPress={() => navigation.navigate(RouteName.EDIT_PROFILE_SCREEN)} buttonTextStyle={ProfileTabStyle.ButtonTextStyle} title={t("Survey_Title_12")} />
              </View>
            </View>
            <Spacing space={SH(35)} />
            <View style={ProfileTabStyle.BgcolorViewWhite}>
              <FlatList
                data={CategoryData}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (<ProfileAccountView
                  item={item}
                  onPress={() => navigation.navigate(item.url)}
                />)}
                keyExtractor={item => item.id}
              />
            </View>
            <Spacing space={SH(20)} />
            <View style={ProfileTabStyle.FlexButtonvIEW}>
              <Button buttonStyle={ProfileTabStyle.SetButtonWidth50} onPress={() => navigation.navigate(RouteName.SETTING_SCREEN)} title={t("Survey_Title_19")} />
              <Button buttonStyle={ProfileTabStyle.SetButtonWidth50} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} title={t("Survey_Title_20")} />
            </View>
            <Spacing space={SH(20)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileTab;