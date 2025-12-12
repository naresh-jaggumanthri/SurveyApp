import React, { useState,useRef } from 'react';
import '../SelectLanguage/i18n'
import { View, Text, TouchableOpacity, ScrollView,Image,Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Lottie, Spacing, VectorIcon, Button, ModalLanguage } from '../../../components';
import { LanguageStyles, Style } from '../../../styles';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { SH, Colors, SF, } from '../../../utils';

const Translation = (props) => {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);
  const scrollY = useRef(new Animated.Value(0)).current;
  const changeLang = (e) => {
    setSelectLabel(e)
  }

  const handleScroll = (event) => {
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false
    })(event);
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const scrollViewRef = useRef();
  return (
    <View style={LanguageStyles.BgColorWhiteAll}>
      <View style={LanguageStyles.SetBackGround} />
      <View style={LanguageStyles.SetBackGroundTwo} />
      <Text style={LanguageStyles.LanguageText}>Language</Text>
      <ScrollView>
        <View style={LanguageStyles.MinView}>
          <View style={LanguageStyles.BackGroundColor}>
          <Lottie source={images.Languageanimation} Lottiewidthstyle={LanguageStyles.LottieWidth} />
          </View>
          <Spacing space={SH(35)} />
          <View style={LanguageStyles.SelectTextView}>
          <Text style={LanguageStyles.LangugeText}>Select Language : </Text>
          </View>
          <Spacing space={SH(10)} />
          <TouchableOpacity onPress={() => setModalVisible(true)} style={LanguageStyles.SelectTagWrap}>
            {/* {sleact != '' ? */}
            <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
            <View style={LanguageStyles.DropDownIcon}>
              <VectorIcon icon="Feather" name="chevron-down" color={Colors.black_text_color} size={SF(25)} /></View>
          </TouchableOpacity>
          <Spacing space={SH(35)} />
          <Spacing space={SH(20)} />
          <ModalLanguage modalVisible={modalVisible}
            setModalVisible={() => {
              setModalVisible(!modalVisible);
            }}
            close={() => setModalVisible(!modalVisible)}
            OnClose={() => setModalVisible(false)}
            changeLang={changeLang}
          />
        </View>
      </ScrollView>
      {/* <Image source={images.Bottom_Shap} resizeMode="cover" style={LanguageStyles.BottomImageShapp} /> */}
      <View style={LanguageStyles.BottomView}>
        <View style={LanguageStyles.BtnVieStyle}>
          <Button  title={t("Confirm_Text")} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
        </View>
      </View>
    </View>
  );
};
export default Translation;