import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { MapStyles, Style } from '../../styles';
import { RouteName } from '../../routes';
import { Search, Spacing, VectorIcon } from "../../components";
import { SF } from "../../utils";
import { useTranslation } from "react-i18next";

const EditLocationScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const MapStyle = useMemo(() => MapStyles(Colors), [Colors]);

  return (
    <View style={Style.BgColorWhiteAll}>
      <View>
        <Spacing space={20} />
        <Search placeholder={t("Search_Text")} />
        <Spacing space={15} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={MapStyle.mainvieweditlocation}>
          <KeyboardAvoidingView enabled>
            <View style={MapStyle.minflexview}>
              <View style={MapStyle.modalView}>
                <TouchableOpacity style={MapStyle.flexrowsetlocationmap} onPress={() => (navigation.navigate(RouteName.MAP_SCREEN))}>
                  <View>
                    <VectorIcon icon="Ionicons" name="locate-sharp" size={SF(26)} color={Colors.theme_background} />
                  </View>
                  <View style={MapStyle.setmarginleftgps}>
                    <Text style={MapStyle.cureentlocationtext}>{t("Matching_Title_4")}</Text>
                    <Text style={MapStyle.usingtextlocation}>{t("Matching_Title_5")}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={MapStyle.flexrowhomeimage} onPress={() => (navigation.navigate(RouteName.HOME_TAB))}>
                  <View style={MapStyle.marginright}>
                    <VectorIcon icon="Ionicons" name="home-outline" size={SF(25)} color={Colors.theme_background} />
                  </View>
                  <View>
                    <Text style={MapStyle.satyanilaym}>{t("Matching_Title_6")}</Text>
                    <Text style={MapStyle.satyanilaymtwo}>{t("Matching_Title_7")}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={MapStyle.flexrowhomeimage} onPress={() => (navigation.navigate(RouteName.HOME_TAB))}>
                  <View style={MapStyle.marginright}>
                    <VectorIcon icon="MaterialCommunityIcons" name="check-network-outline" size={SF(25)} color={Colors.theme_background} />
                  </View>
                  <View>
                    <Text style={MapStyle.satyanilaym}>{t("Matching_Title_8")}</Text>
                    <Text style={MapStyle.satyanilaymtwo}>{t("Matching_Title_9")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default EditLocationScreen;