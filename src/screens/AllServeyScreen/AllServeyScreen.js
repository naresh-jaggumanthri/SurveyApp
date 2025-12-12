import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, FlatList } from "react-native";
import { Style, HomeTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import images from '../../index';
import { RecentlyDataView, Spacing } from '../../components';
import { SH } from '../../utils';
import { RouteName } from "../../routes";

const AllServeyScreen = (props) => {
  const { t } = useTranslation();
  const RecentlyData = [
    {
      text: 'Home_Title_45',
      imageset: images.Recently_Image_1,
      musicname: 'Home_Title_46',
      TextTwo: 'Home_Title_47',
      TextThree: '144k +',
    },
    {
      text: 'Home_Title_6',
      imageset: images.Recently_Image_2,
      musicname: 'Home_Title_48',
      TextTwo: 'Home_Title_49',
      TextThree: '12M +',
    },
    {
      text: 'Home_Title_8',
      imageset: images.Recently_Image_3,
      musicname: 'Home_Title_50',
      TextTwo: 'Survey_Title_1',
      TextThree: '599K +',
    },
    {
      text: 'Home_Title_10',
      imageset: images.Recently_Image_4,
      musicname: 'Survey_Title_2',
      TextTwo: 'Survey_Title_3',
      TextThree: '300K +',
    },
    {
      text: 'Home_Title_12',
      imageset: images.Recently_Image_5,
      musicname: 'Survey_Title_4',
      TextTwo: 'Survey_Title_5',
      TextThree: '98K +',
    },
    {
      text: 'Home_Title_14',
      imageset: images.Recently_Image_1,
      musicname: 'Survey_Title_6',
      TextTwo: 'Survey_Title_7',
      TextThree: '234K +',
    },
  ];
  const { navigation } = props;
  const { Colors } = useTheme();
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  return (
    <View style={Style.BgColorWhiteAll}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyles}>
        <KeyboardAvoidingView enabled>
          <Spacing space={SH(20)} />
          <View style={HomeTabStyles.BackGroundShape}>
            <FlatList
              data={RecentlyData}
              numColumns={1}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (<RecentlyDataView
                item={item}
                index={index}
                onPress={() => navigation.navigate(RouteName.ANALYTICS_SCREEN)}
              />)}
              keyExtractor={item => item.id}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default AllServeyScreen;
