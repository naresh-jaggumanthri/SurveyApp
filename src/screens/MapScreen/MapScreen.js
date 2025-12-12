import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Style, MapStyles } from '../../styles';
import MapView, { Marker } from 'react-native-maps';
import { RouteName } from "../../routes";
import { VectorIcon, Button, Spacing } from '../../components';
import { SF, SH } from '../../utils';
import { useTranslation } from "react-i18next";

const MapScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const MapStyle = useMemo(() => MapStyles(Colors), [Colors]);
  return (
    <View style={Style.BgColorWhiteAll}>
      <ScrollView contentContainerStyle={{ height: '100%', width: '100%' }}>
        <MapView
          style={Style.MapStyleset}
          initialRegion={{
            latitude: 22.31152331818034,
            longitude: 70.80272968327495,
            latitudeDelta: 22.31152331818034,
            longitudeDelta: 70.80272968327495,
          }}>
          <Marker
            coordinate={{
              latitude: 22.2974077180557,
              longitude: 70.80134086682297,
            }}
          />
          <Marker
            coordinate={{
              latitude: 22.297199259145227,
              longitude: 70.80121212078939,
            }}
          />
        </MapView>
      </ScrollView>
      <View style={MapStyle.positonabsolute}>
        <View style={MapStyle.setwhiteboxwidth}>
          <View style={MapStyle.centerpencileicon}>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.EDIT_LOCATION_SCREEN)} style={MapStyle.setpencileicon}>
              <VectorIcon icon="FontAwesome5" name="pencil-alt" size={SF(18)} color={Colors.black_text_color} />
            </TouchableOpacity>
          </View>
          <View style={MapStyle.flexrowhomeimage}>
            <View style={MapStyle.marginright}>
              <VectorIcon icon="Feather" name="home" size={SF(27)} color={Colors.black_text_color} />
            </View>
            <View>
              <Text style={MapStyle.satyanilaym}>{t("Category_Listing_37")}</Text>
              <View style={MapStyle.setwhiteboxwidthtwo}>
                <Text style={MapStyle.satyanilaymtwo}>{t("Category_Listing_38")}</Text>
              </View>
            </View>
          </View>
          <Spacing space={SH(20)} />
          <View>
            <Button onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} title={t("Category_Listing_39")} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default MapScreen;