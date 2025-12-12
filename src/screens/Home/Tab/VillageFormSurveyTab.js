import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity, FlatList } from "react-native";
import { Style, AnalyaticsStyle, HomeTabStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import images from '../../../index';
import { Spacing, Input, DatePicker, VectorIcon, RadioButton, CheckBox, ImagePicker, ConfirmationAlert } from '../../../components';
import { Colors, SH, SF } from '../../../utils';
import { Image } from "react-native-elements";
import { RouteName } from "../../../routes";

const VillageFormSurveyTab = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;

  const stateArray = {
    name: "",
    emailId: "",
    mobileNumber: "",
    QuestionOne: "",
    about: ""
  };
  const [state, setState] = useState(stateArray);
  const arrayData = [
    { label: t("Survey_Title_21"), value: 'option1' },
    { label: t("Survey_Title_22"), value: 'option2' },
    { label: t("Survey_Title_23"), value: 'option3' },
  ];
  const [checkboxes, setCheckboxes] = useState([
    { label: t("Survey_Title_24"), checked: false },
    { label: t("Survey_Title_25"), checked: false },
    { label: t("Survey_Title_26"), checked: false },
    { label: t("Survey_Title_27"), checked: false },
    { label: t("Survey_Title_28"), checked: false },

    // Add more options as needed
  ]);
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };
  const renderCheckboxes = () => {
    return checkboxes.map((checkbox, index) => (
      <CheckBox
        key={index}
        title={checkbox.label}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checked={checkbox.checked}
        onPress={() => handleCheckboxChange(index)}
      />
    ));
  };
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [data, setData] = useState([
    { id: '1', image: images.Food_1_Image, text: 'Survey_Title_29', checked: false },
    { id: '2', image: images.Food_4_Image, text: 'Survey_Title_30', checked: false },
    { id: '3', image: images.Food_3_Image, text: 'Survey_Title_31', checked: false },
    { id: '4', image: images.Food_2_Image, text: 'Survey_Title_32', checked: false },
  ]);

  const toggleCheckboxs = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question number

  // Your state and other variables...

  const handleNext = () => {
    if (currentQuestion < 4) {
      const updatedColors = [...backgroundColors];
      updatedColors[currentQuestion - 1] = Colors.theme_background; // Change background color of current view
      setBackgroundColors(updatedColors);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to the next screen
      navigation.navigate(RouteName.THANK_YOU_SCREEN);
    }
  };

  // Function to handle previous button click
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      const updatedColors = [...backgroundColors];
      updatedColors[currentQuestion - 2] = Colors.light_gray_text_color; // Reset background color of previous view
      setBackgroundColors(updatedColors);
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Survey_Title_33"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.ANALYTICS_SCREEN);
  }
  const Onpressfunction = (e) => {
    navigation.toggleDrawer();
    navigation.navigate(e)
  };
  const { Colors } = useTheme();
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  const [backgroundColors, setBackgroundColors] = useState(Array(4).fill(Colors.light_gray_text_color)); // Initial background colors for 4 views
  
  return (
    <View style={Style.BgColorWhiteAll}>
      <Spacing space={SH(40)} />
      <View style={AnalyaticsStyles.FlexViewBack}>
        {backgroundColors.map((color, index) => (
          <View
            key={index}
            style={[
              AnalyaticsStyles.BackgroundView,
              { backgroundColor: index === currentQuestion - 1 ? Colors.theme_background : color }
            ]}
          />
        ))}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyles}>
        <KeyboardAvoidingView enabled>
          <Spacing space={SH(40)} />
          <View style={AnalyaticsStyles.MainView}>
            {/* First question start */}
            {currentQuestion === 1 && (
              <View>
                <Input
                  title={t("Enter_Your_Name")}
                  placeholder={t("Enter_Your_Name")}
                  onChangeText={(text) => setState({ ...state, username: text })}
                  value={state.username}
                  titleStyle={AnalyaticsStyles.TitleStyle}
                />
                <Spacing space={SH(15)} />
                <Input
                  title={t("Survey_Title_34")}
                  placeholder={t("Survey_Title_34")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.TitleStyle}
                />
                <Spacing space={SH(15)} />
                <Input
                  title={t("Survey_Title_35")}
                  placeholder={t("Survey_Title_35")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.TitleStyle}
                />
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_36")}</Text>
                <Spacing space={SH(5)} />
                <DatePicker />
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_37")}</Text>
                <Spacing space={SH(5)} />
                <View style={AnalyaticsStyles.PaddingHori}>
                  <View style={Style.FlexEditView}>
                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.MAP_SCREEN)}>
                      <Text style={Style.datetextstyles}> <VectorIcon icon="FontAwesome" name="map-marker" size={SF(20)} color={Colors.theme_background} />   22.29969, 70.808241</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.EDIT_LOCATION_SCREEN)} style={Style.dobView}>
                      <VectorIcon icon="AntDesign" name="edit" size={SF(30)} color={Colors.theme_background} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            {/* Two question start */}
            {currentQuestion === 2 && (
              <View>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_38")}</Text>
                <RadioButton
                  arrayData={arrayData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_39")}</Text>
                {renderCheckboxes()}
                <Spacing space={SH(30)} />
                <Input
                  title={t("Survey_Title_40")}
                  placeholder={t("Survey_Title_41")}
                  onChangeText={(text) => setState({ ...state, about: text })}
                  value={state.about}
                  titleStyle={AnalyaticsStyles.TitleStyle}
                />
              </View>
            )}
            {/* Three question start */}
            {currentQuestion === 3 && (
              <View>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_42")}</Text>
                <Spacing space={SH(10)} />
                <View style={AnalyaticsStyles.FlexRow}>
                  <ImagePicker showdata={true} />
                  <TouchableOpacity onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                  }} style={HomeTabStyles.BackGroundViewTwo}>
                    <VectorIcon icon="AntDesign" name="delete" size={SF(22)} color={Colors.theme_background} />
                  </TouchableOpacity>
                </View>
                <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_43")}</Text>
                <Spacing space={SH(10)} />
                <View style={AnalyaticsStyles.FlexRow}>
                  <View style={AnalyaticsStyles.FlexRowPassword}>
                    <ImagePicker showdatatwo={true} />
                  </View>
                  <TouchableOpacity onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                  }} style={HomeTabStyles.BackGroundViewTwo}>
                    <VectorIcon icon="AntDesign" name="delete" size={SF(22)} color={Colors.theme_background} />
                  </TouchableOpacity>
                </View>
                <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_44")}</Text>
                <Spacing space={SH(10)} />
                <View style={AnalyaticsStyles.FlexRow}>
                  <ImagePicker showDataThree={true} />
                  <TouchableOpacity onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                  }} style={HomeTabStyles.BackGroundViewTwo}>
                    <VectorIcon icon="AntDesign" name="delete" size={SF(22)} color={Colors.theme_background} />
                  </TouchableOpacity>
                </View>
                <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_45")}</Text>
                <View style={AnalyaticsStyles.FlexRow}>
                  <Image source={images.Survey_Image_Four} style={AnalyaticsStyles.CaptureImageSet} />
                </View>
              </View>
            )}
            {/* Four question start */}
            {currentQuestion === 4 && (
              <View>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_46")}</Text>
                <Spacing space={SH(20)} />
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={AnalyaticsStyles.FlexRowTwo}>
                      <Image source={item.image} style={AnalyaticsStyles.CaptureImageSet} />
                      <View style={AnalyaticsStyles.FlexRowCheckBox}>
                        <View>
                          <CheckBox
                            checked={item.checked}
                            onPress={() => toggleCheckboxs(item.id)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor={Colors.theme_background}
                          />
                        </View>
                        <TouchableOpacity onPress={() => toggleCheckboxs(item.id)}>
                          <Text style={AnalyaticsStyles.PleaseEnterDateTwo}>{t(item.text)}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
            <Spacing space={SH(170)} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={AnalyaticsStyles.NavigationButtons}>
        <TouchableOpacity style={AnalyaticsStyles.PreviousButton} onPress={handlePrevious}>
          <Text style={AnalyaticsStyles.PreviousTextStyle}>{t("Survey_Title_47")}</Text>
        </TouchableOpacity>
        {currentQuestion < 5 && (
          <TouchableOpacity style={AnalyaticsStyles.PreviousButton} onPress={handleNext}>
            <Text style={AnalyaticsStyles.PreviousTextStyle}>{t("Survey_Title_48")}</Text>
          </TouchableOpacity>
        )}
      </View>
      <ConfirmationAlert
        message={alertMessage}
        iconVisible={true}
        modalVisible={alertVisible}
        setModalVisible={setAlertVisible}
        onPressCancel={() => setAlertVisible(!alertVisible)}
        onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
        buttonText={t("Ok")}
        buttonminview={Style.ButtonCenter}
      />
    </View>
  );
};
export default VillageFormSurveyTab;
