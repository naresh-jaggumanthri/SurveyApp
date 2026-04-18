import React, {  useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { HomeTabStyle } from '../../styles';
import { Button, Spacing, VectorIcon } from '../../components';
import { SH, SF, Colors } from '../../utils';
import { useTranslation } from "react-i18next";

const TrendingEvent = (props) => {
  const { item,index,onPress,type} = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  return (
    <TouchableOpacity onPress={() => onPress()} style={index == 0 ? HomeTabStyles.EventlistviewTwo : HomeTabStyles.Eventlistview}>
      <View>
        <View>
          <View style={HomeTabStyles.Flexrowbox}>
            <View style={HomeTabStyles.Widthstyles}>
               {/* <VectorIcon
                            color={Colors.gray_text_color}
                            name="list"
                            icon="FontAwesome"
                            size={SF(55)}
                          /> */}
              <Image source={item.imageset} style={HomeTabStyles.Setimagestyles} />
            </View>
            <View style={HomeTabStyles.Widthstylestwo}>
              <Text style={HomeTabStyles.Textstylesbastu}>{t(item.text)}</Text>
              <Text style={HomeTabStyles.Musictextstryles}>{t(item.musicname)}</Text>
              {/* <View style={HomeTabStyles.Flexrowmusiz}>
                <View style={HomeTabStyles.Musicborderview}>
                  <Text style={HomeTabStyles.Musictextstryles}>{t(item.TextTwo)}</Text>
                </View>
              </View> */}
              <View style={HomeTabStyles.FlexRowDirection}>
              <Text style={HomeTabStyles.BlackResponce}>{t("Total Number of house holds")} : </Text>
              <Text style={HomeTabStyles.BlackResponceOne}>{item.TextThree}</Text>
             
              </View>
               <View style={HomeTabStyles.FlexRowDirection}>
               {item.sync_status!=undefined&&<Text style={HomeTabStyles.BlackResponce}>{t('Status')} : </Text>}
                {item.sync_status!=undefined&&<Text style={HomeTabStyles.BlackResponceOne}>{item.sync_status === 'PENDING' ? '🟡 Pending' : '🟢 Synced'}</Text>}
                </View>
              <Spacing space={SH(5)} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default TrendingEvent;
