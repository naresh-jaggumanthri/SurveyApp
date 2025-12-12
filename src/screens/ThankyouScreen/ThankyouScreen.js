import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, Text } from "react-native";
import { Style, PaymentsStyle,AnalyaticsStyle } from '../../styles';
import { Container, Spacing, Lottie, Button } from '../../components';
import { SH } from '../../utils';
import images from '../../index';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";

const ThankyouScreen = (props) => {
  const {navigation} = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const PaymentsStyles = useMemo(() => PaymentsStyle(Colors), [Colors]);
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
  return (
    <Container>
       <Spacing space={SH(40)} />
      <View style={AnalyaticsStyles.FlexViewBack}>
      <View style={AnalyaticsStyles.Thankyou} />
      <View style={AnalyaticsStyles.Thankyou} />
      <View style={AnalyaticsStyles.Thankyou} />
      <View style={AnalyaticsStyles.Thankyou} />
      </View>
      <ScrollView>
        <View style={Style.Container}>
          <View style={Style.MinViewContentFuill}>
            <View style={PaymentsStyles.MinViewContentFuill}>
              <Spacing space={SH(250)} />
              <View style={PaymentsStyles.BgcolorWhite}>
                <View style={PaymentsStyles.CenterView}>
                  <View style={PaymentsStyles.BackWhite}>
                    <Lottie Lottiewidthstyle={PaymentsStyles.Lootianimation}
                      source={images.Payments_Successful}
                    />
                  </View>
                </View>
                <Spacing space={SH(30)} />
                <Text style={PaymentsStyles.ParegraphText}>{t("Home_Title_42")}</Text>
                <Spacing space={SH(20)} />
                <Text style={PaymentsStyles.DateTewxtStyle}>{t("Home_Title_43")}</Text>
                <Spacing space={SH(30)} />
                <Button onPress={() => navigation.navigate(RouteName.HOME_TAB)} title={t("Home_Title_44")} />
                <Spacing space={SH(30)} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
export default ThankyouScreen;