import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Style, AnalyaticsStyle, HomeTabStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import images from '../../../index';
import { Spacing, Input, DatePicker, VectorIcon, RadioButton, CheckBox, ImagePicker, ConfirmationAlert,DropDown, FamilyMemberAlert } from '../../../components';
import { Colors, SH, SF } from '../../../utils';
import { Image } from "react-native-elements";
import { RouteName } from "../../../routes";
import { SW } from '../../../utils/dimensions';
import FamilyalertModal from '../../../components/commonComponents/FamilyMemberAlert';
// import { VillageFormSurveyTab } from '.';

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
  const dropDownData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const socialCatData=[{ label: 'ST', value: 'ST' },
  { label: 'SC', value: 'SC' },
  { label: 'OBC', value: 'OBC' },
  { label: 'General', value: 'General' },
  { label: 'PVTGS', value: 'PVTGS' },];

  const maritalStatusData=[{ label: 'Married', value: 'Married' },
  { label: 'Never married', value: 'Never married' },
  { label: 'Widow', value: 'Widow' },
  { label: 'Other', value: 'Other' },
  ];

  const headRelationData=[{ label: 'Spouse', value: 'Spouse' },
  { label: 'Daughter', value: 'Daughter' },
  { label: 'Daughter-in-law', value: 'Daughter-in-law' },
  { label: 'Sister', value: 'Sister' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Self', value: 'Self' },];

  const occupationDropDownData = [
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Daily Wage Labour', value: 'Daily Wage Labour' },
    { label: 'Self employed', value: 'Self employed' },
    { label: 'Govt./Private Service', value: 'Govt./Private Service' },
    { label: 'Other User entry', value: 'Other User entry' },
  ];
  const arrayData = [
    { label: t("Survey_Title_21"), value: 'option1' },
    { label: t("Survey_Title_22"), value: 'option2' },
    { label: t("Survey_Title_23"), value: 'option3' },
  ];
  const selfHelpData = [
    { label: t("Yes"), value: 'true' },
    { label: t("No"), value: 'false' },
  ];
  const selfHelpData2 = [
    { label: t("Yes"), value: 'true' },
    { label: t("No"), value: 'false' },
     { label: t("Partially"), value: 'Partially' },
  ];
   const electricityData = [
    { label: t("Solar"), value: 'Solar' },
    { label: t("Electric"), value: 'Electric'},
  ];
  const privateLandData = [
    { label: t("Landless"), value: 'Landless' },
    { label: t("0-0.5Acr"), value: '0-0.5Acr' },
    { label: t("0.5-1Acr"), value: '0.5-1Acr' },
    { label: t("1-2.5Acr"), value: '1-2.5Acr' },
    { label: t("more than 2.5Acr"), value: 'more than 2.5Acr' },
  ];
  const waterSourceData=[
      { label: t("Well"), value:t("Well") },
      { label: t("Tube Well"), value:t("Tube Well")},
      { label: t("Piped Water Supply"), value:t("Piped Water Supply")},
      { label: t("Others"), value:t("Others")},
];
const schemeData=[
    { label: t("PM Kishan"), value:t("PM Kishan") },
    { label: t("CM Kishan"), value:t("CM Kishan")},
    { label: t("Both"), value:t("Both")},
];

const genderData=[{ label: t("Male"), value:t("Male") },
{ label: t("Female"), value:t("Female")},
{ label: t("Others"), value:t("Others")},];

const respondantData=[
    { label: t("Migrant Person himself"), value:t("Migrant Person himself") },
    { label: t("Other Adult family member"), value:t("Other Adult family member")},
    { label: t("Village Head/Ward Member"), value:t("Village Head/Ward Member")},
    { label: t("Neighbour"), value:t("Neighbour")},
    { label: t("Head of the household"), value:t("Head of the household")},
];

  const [checkboxes, setCheckboxes] = useState([
    { label: t("Survey_Title_24"), checked: false },
    { label: t("Survey_Title_25"), checked: false },
    { label: t("Survey_Title_26"), checked: false },
    { label: t("Survey_Title_27"), checked: false },
    { label: t("Survey_Title_28"), checked: false },

    // Add more options as needed
  ]);
  const [checkboxes2, setCheckboxes2] = useState([
    { label: t("Major"), checked: false },
    { label: t("Minor"), checked: false },
    { label: t("Medium"), checked: false },
    { label: t("Lift Irrigation"), checked: false },
    { label: t("Check dam"), checked: false },
    { label: t("Canal"), checked: false },
    { label: t("Bore Well"), checked: false },
    { label: t("Dug Well"), checked: false },
    { label: t("Farm pond"), checked: false },
    { label: t("Others"), checked: false },

    // Add more options as needed
  ]);
  const [checkboxes3, setCheckboxes3] = useState([
    { label: t("Poultry"), checked: false },
    { label: t("Goatery"), checked: false },
    { label: t("Dairy"), checked: false },
    { label: t("Others"), checked: false },
    

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
  const renderCheckboxes2 = () => {
    return checkboxes2.map((checkbox, index) => (
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
  const renderCheckboxes3 = () => {
    return checkboxes3.map((checkbox, index) => (
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
 const [familyAlertVisible, setFamilyAlertVisible] = useState(false);
  const handleAddFamilyMember=()=>{
  // Alert.alert("inn"); 
  setFamilyAlertVisible(true);
  }

  const handleNext = () => {
    if (currentQuestion < 5) {
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
  const [backgroundColors, setBackgroundColors] = useState(Array(5).fill(Colors.light_gray_text_color)); // Initial background colors for 4 views
  
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
            {/* <Text style={AnalyaticsStyles.TitleStyle}>{t("Basic Details")}</Text> */}
            {currentQuestion === 1 && (
              <View>
                  {/* District */}
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Basic Details")}</Text>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("District")}</Text>
                <Spacing space={SH(5)} />
                  <DropDown
                  data={dropDownData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(15)} />
                  {/* Block */}
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Block")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={dropDownData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(15)} />
                  {/* Gram Panchayat */}
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Gram Panchayat")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={dropDownData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(15)} />
                  {/* Revenue Village */}
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Revenue Village")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={dropDownData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(15)} />
                <Input
                  title={t("Total number of households")}
                  placeholder={t("Total number of households")}
                  onChangeText={(text) => setState({ ...state, username: text })}
                  value={state.username}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(15)} />
                <Input
                  title={t("Male")}
                  placeholder={t("Male")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(15)} />
                <Input
                  title={t("Female")}
                  placeholder={t("Female")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(15)} />
                <Input
                  title={t("Total Population")}
                  placeholder={t("Total Population")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                
              </View>
            )}
            {/* Two question start */}
            {currentQuestion === 2 && (
              <View>
                 <Text style={AnalyaticsStyles.TitleStyle}>{t("Basic Infrastructure & Amenities")}</Text>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Are internal village roads pucca (concrete)?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_39")}</Text>
                {renderCheckboxes()} */}
                {/* <Spacing space={SH(5)} /> */}
                
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("If No or Partially, requirement of internal village pucca roads (in RMT)?")}</Text>
                <RadioButton
                  arrayData={waterSourceData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Are internal drains available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("If Yes, Are drains properly functional?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is the village electrified?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is street lighting available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What type of street lighting is provided?")}</Text>
                <RadioButton
                  arrayData={electricityData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is the village connected to the GP headquarters by an all weather road?")}</Text>
                <RadioButton
                  arrayData={selfHelpData2}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(15)} />
                <Input
                  title={t("If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?")}
                  placeholder={t("If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                
                
                  <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is the GP head quarter connected to any PWD road or State highway or Nation Highway by an all weather road?")}</Text>
                <RadioButton
                  arrayData={selfHelpData2}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(15)} />
                <Input
                  title={t("What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?")}
                  placeholder={t("What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
              </View>
            )}
            {/* Three question start */}
            {currentQuestion === 3 && (
              <View>
                   <Text style={AnalyaticsStyles.TitleStyle}>{t("Information Related to Migration")}</Text>
                    <Spacing space={SH(5)} />
                <Input
                  title={t("No of men currently in migration?")}
                  placeholder={t("No of men currently in migration?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                  <Spacing space={SH(5)} />
                <Input
                  title={t("No of women currently in migration?")}
                  placeholder={t("No of women currently in migration?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("No of minor children below 18 yrs age currently in migration?")}
                  placeholder={t("No of minor children below 18 yrs age currently in migration?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />

                 <Spacing space={SH(15)} />
                <Input
                  title={t("Total No. of person currently in migration?")}
                  placeholder={t("Total No. of person currently in migration?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />

                 
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Water Supply & Sanitation")}</Text>
                   <Spacing space={SH(10)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Main source of drinking water?")}</Text>
                <RadioButton
                  arrayData={waterSourceData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Are all households having toilets?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
               
                <Text style={AnalyaticsStyles.TitleStyle}>{t("Education & Health Facilities")}</Text>
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is there a functioning Anganwadi Centre?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is Primary school available within the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is Secondary school within 3 km distance?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is there a Sub Health Centre in the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Text style={AnalyaticsStyles.TitleStyle}>{t("Community & Social Infrastructure")}</Text>
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Community Centre available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Common shed for WSHG available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Availability of playground in the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                  <Spacing space={SH(15)} />
                <Input
                  title={t("No. of community tanks available in the village?")}
                  placeholder={t("No. of community tanks available in the village?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)}/>

                <Text style={AnalyaticsStyles.TitleStyle}>{t("Livelihood & Service Infrastructure")}</Text>
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is mobile network coverage available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is Digital last mile connectivity (internet facility) available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is there a drying yard available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is there a PDS (ration shop) in the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                  <Spacing space={SH(15)} />
                <Input
                  title={t("If No, distance of PDS (ration shop) from the village (in km)?")}
                  placeholder={t("If No, distance of PDS (ration shop) from the village (in km)?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether banking or post office or KIOSK or mini bank services are available within 3 km distance from the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                              


               

                

                







                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What are the sources of Irrigation?")}</Text>
                {renderCheckboxes2()}
                {<Spacing space={SH(5)}/>}


                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether involved in livestock activity?")}</Text>
                {renderCheckboxes3()}
                {<Spacing space={SH(5)}/>} */}



                

                
              </View>
             
            )}
            {/* Four question start */}
            {currentQuestion === 4 && (
              <View>
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Water Resource & Irrigation Structures")}</Text>
                   <Spacing space={SH(10)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is water from any mega, medium or minor irrigation project available to the village?")}</Text>
                <RadioButton
                  arrayData={schemeData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("If Yes, Whether repair or construction of a new distribution canal is required?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("If Yes, Length of distribution canal requiring repair or new construction in RMT?")}
                  placeholder={t("If Yes, Length of distribution canal requiring repair or new construction in RMT?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is there functional lift irrigation project available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Scope of new lift irrigation project?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Availability of functional Check Dams in the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                  <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Scope of new Check Dams in the village?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                  <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Availability of functional distribution canal in the village in RMT?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                
                <Spacing space={SH(5)} />
                <Input
                  title={t("If Yes, Scope of new distribution canal in the village in RMT?")}
                  placeholder={t("If Yes, Scope of new distribution canal in the village in RMT?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                
                <Spacing space={SH(5)}/>
                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_46")}</Text>
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
                /> */}
              </View>
            )}
            {/*five question start */}
            {currentQuestion === 5 && (
              <View>
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Respondent Details")}</Text>
                  <Spacing space={SH(5)} />
                <Input
                  title={t("Respondent Name")}
                  placeholder={t("Respondent Name")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                  <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Identity")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Process Adopted for Survey")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                
                <Spacing space={SH(5)} />
                <Input
                  title={t("Respondent contact mobile no.?")}
                  placeholder={t("Respondent contact mobile no.?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                
                   <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Capture a photo of the meeting/FGD")}</Text>
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
                {/* <Spacing space={SH(10)} />
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
                </View> */}
                {/* <Spacing space={SH(10)} />
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
                </View> */}
                {/* <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_45")}</Text>
                <View style={AnalyaticsStyles.FlexRow}>
                  <Image source={images.Survey_Image_Four} style={AnalyaticsStyles.CaptureImageSet} />
                </View> */}
                <Spacing space={SH(10)}/>
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
                <Spacing space={SH(5)} />
                <Input
                  title={t("Enumerator Name")}
                  placeholder={t("Enumerator Name")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                {/* <Spacing space={SH(5)} />
                <Input
                  title={t("Family contact mobile no.?")}
                  placeholder={t("Family contact mobile no.?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                /> */}
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey Date and Time")}</Text>
                <Spacing space={SH(5)} />
                <DatePicker />
                <Spacing space={SH(15)} /> 
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
       <FamilyMemberAlert
                      message={alertMessage}
                      modalVisible={familyAlertVisible}
                      setModalVisible={setFamilyAlertVisible}
                      onPress={() => { setFamilyAlertVisible(!familyAlertVisible), onoknutton() }}
                      buttonminview={Style.ButtonCenter}
                      iconVisible={true}
                      buttonText={t("Ok")}
                  />
    </View>
  );
};
export default VillageFormSurveyTab;
