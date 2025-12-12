import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image,StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SwiperStyle } from '../../styles';
import { Spacing, VectorIcon } from '../../components';
import { RouteName } from '../../routes';
import { SH, SF } from '../../utils';
import { useTranslation } from "react-i18next";
import images from '../../index';


const App = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;

  const Swiperdata = [
    {
      key: 's1',
      text: 'Swiperfirst',
      title: "Swipertitle",
      animation: images.Four_Image,
    },
    {
      key: 's2',
      text: 'SwiperFirstTwo',
      title: 'SwiperTitleTwo',
      animation: images.Three_png,
    },
    {
      key: 's3',
      text: 'SwiperFirstThree',
      title: 'Swipertitlethree',
      animation: images.First_Swiper,
      backgroundColor: 'transparent',
    },
  ]

  const RenderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: 'white', height: '80%' }}>
        <Spacing space={SH(100)} />
        {index == 0 ?
          <View Lottiewidthstyle={SwiperStyles.CenterView}>
            <Image source={item.animation} resizeMode="contain" style={SwiperStyles.AnimationViewStyles} />
          </View>
          :
          <View Lottiewidthstyle={SwiperStyles.CenterView}>
            <Image source={item.animation} resizeMode="cover" style={SwiperStyles.AnimationViewStyles} />
          </View>}
        <View style={SwiperStyles.AbsoluteView}>
          <Text style={SwiperStyles.TitleStyles}>
            {t(item.title)}
          </Text>
        </View>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={SwiperStyles.ButtonCircle}>
        <TouchableOpacity onPress={
          () => navigation.navigate(RouteName.SELECT_LANGUAGE)
        }>
          <VectorIcon icon="Entypo" name="arrow-with-circle-right" size={SF(40)} color={Colors.theme_background} />
        </TouchableOpacity>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <Spacing space={SH(12)} />
        <Text style={SwiperStyles.NextTextStyle}>{t("Next_Text")}</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
          <Spacing space={SH(12)} />
          <Text style={SwiperStyles.NextTextStyle}>{t("Skip_Text")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const { Colors } = useTheme();
  const SwiperStyles = useMemo(() => SwiperStyle(Colors), [Colors]);

  return (
    <View style={SwiperStyles.SwiperMinView}>
        <StatusBar backgroundColor={Colors.theme_background} />
      <View style={SwiperStyles.SwiperMinViewTwo}>
        <Image source={images.Bottom_Shap} resizeMode="cover" style={SwiperStyles.BottomImageShapp} />
      </View>
      <AppIntroSlider
        data={Swiperdata}
        renderItem={RenderItem}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        showSkipButton={true}
        activeDotStyle={SwiperStyles.ActiveDotStyles}
        dotStyle={SwiperStyles.DotSwiperStyle}
      />
    </View>

    // <View style={SwiperStyles.SwiperMinView}>
    //   <ImageBackground source={images.Bottom_Shap} style={{ height: '100%', width: '100%'}}>
    //     <AppIntroSlider
    //       data={Swiperdata}
    //       renderItem={RenderItem}
    //       renderNextButton={_renderNextButton}
    //       renderSkipButton={_renderSkipButton}
    //       renderDoneButton={_renderDoneButton}
    //       showSkipButton={true}
    //       activeDotStyle={SwiperStyles.ActiveDotStyles}
    //       dotStyle={SwiperStyles.DotSwiperStyles}
    //     />
    //   </ImageBackground>
    // </View>
  );
};
export default App;

