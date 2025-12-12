import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Style, AnalyaticsStyle, HomeTabStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import images from '../../../index';
import { Spacing, Input, DatePicker, VectorIcon, RadioButton, CheckBox, ImagePicker, ConfirmationAlert,DropDown } from '../../../components';
import { Colors, SH, SF } from '../../../utils';
import { Image } from "react-native-elements";
import { RouteName } from "../../../routes";
import { SW } from '../../../utils/dimensions';

const FamilyFormSurveyTab = (props) => {
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
                  title={t("Hamlet")}
                  placeholder={t("Hamlet")}
                  onChangeText={(text) => setState({ ...state, username: text })}
                  value={state.username}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(15)} />
                <Input
                  title={t("Name of Head of the Household as per Aadhar Card ?")}
                  placeholder={t("Name of Head of the Household as per Aadhar Card ?")}
                  onChangeText={(text) => setState({ ...state, emailId: text })}
                  value={state.emailId}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                {/* <Spacing space={SH(15)} />
                <Input
                  title={t("Gender (Head of the Household)")}
                  placeholder={t("Gender (Head of the Household)")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                /> */}
                <Spacing space={SH(15)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Gender (Head of the Household)")}</Text>
                <RadioButton
                  arrayData={genderData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(15)} />
                <Input
                  title={t("AADHAR No.")}
                  placeholder={t("AADHAR No.")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Social Category")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={socialCatData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                <Spacing space={SH(15)} />
                <Input
                  title={t("Bank Account No")}
                  placeholder={t("Bank Account No")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                
                <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Bank Name")}</Text>
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
                  <Spacing space={SH(5)} />
                <Input
                  title={t("IFSC code / Branch")}
                  placeholder={t("IFSC code / Branch")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("Name of the women member of the Household?")}
                  placeholder={t("Name of the women member of the Household?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("Age of Women Member as per AADHAR?")}
                  placeholder={t("Age of Women Member as per AADHAR?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Marital Status of the Women Member ?")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={maritalStatusData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Relationship with the Head of the Household")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={headRelationData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>
                  <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is any Women of the Family covered under Self Help Group(SHG)")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the women  member of the family covered under Subhadra Yojana")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                <Spacing space={SH(5)} />
                <Input
                  title={t("Total Number of Family Members")}
                  placeholder={t("Total Number of Family Members")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_36")}</Text>
                <Spacing space={SH(5)} />
                <DatePicker />
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_37")}</Text>
                <Spacing space={SH(5)} /> */}
                {/* <View style={AnalyaticsStyles.PaddingHori}>
                  <View style={Style.FlexEditView}>
                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.MAP_SCREEN)}>
                      <Text style={Style.datetextstyles}> <VectorIcon icon="FontAwesome" name="map-marker" size={SF(20)} color={Colors.theme_background} />   22.29969, 70.808241</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.EDIT_LOCATION_SCREEN)} style={Style.dobView}>
                      <VectorIcon icon="AntDesign" name="edit" size={SF(30)} color={Colors.theme_background} />
                    </TouchableOpacity>
                  </View>
                </View> */}
              </View>
            )}
            {/* Two question start */}
            {currentQuestion === 2 && (
              <View>
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the household have Ration Card?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_39")}</Text>
                {renderCheckboxes()} */}
                {/* <Spacing space={SH(5)} /> */}
                <Input
                  title={t("Ration Card number?")}
                  placeholder={t("Ration Card number?")}
                  onChangeText={(text) => setState({ ...state, about: text })}
                  value={state.about}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(30)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What is the source of drinking water for the family?")}</Text>
                <RadioButton
                  arrayData={waterSourceData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether provided LPG connection under Ujjwala?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the  family having Labour Cards?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the  family covered under Nirman Shramik Kalyan Yojana (NSKY)?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
              </View>
            )}
            {/* Three question start */}
            {currentQuestion === 3 && (
              <View>
                   <Text style={AnalyaticsStyles.TitleStyle}>{t("Occupation & Resources")}</Text>
                   <Spacing space={SH(10)} />
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What is the Primary Occupation of the family?")}</Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={occupationDropDownData}
                  dropdownStyle={{marginLeft:SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  onChange={()=>{
                      Alert.alert("hellll");
                  }}/>

                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is any family member involved in weaving or handloom work?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />

                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Does the family covered under POHI_Looms and Accessories Scheme?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />

                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Amount of Land holding under FRA- In Acres ? (If Not a FRA claimant.. Go to next Qn or else go to next to next Qn.)")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />

<Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether your family owns Homestead Patta land?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />

<Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Approximate private land holding of the Household?")}</Text>
                <RadioButton
                  arrayData={privateLandData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />

<Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether irrigation facility available?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />


                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What are the sources of Irrigation?")}</Text>
                {renderCheckboxes2()}
                {<Spacing space={SH(5)}/>}


                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether involved in livestock activity?")}</Text>
                {renderCheckboxes3()}
                {<Spacing space={SH(5)}/>}



                

                {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_42")}</Text>
                <Spacing space={SH(10)} />
                <View style={AnalyaticsStyles.FlexRow}>
                  <ImagePicker showdata={true} />
                  <TouchableOpacity onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                  }} style={HomeTabStyles.BackGroundViewTwo}>
                    <VectorIcon icon="AntDesign" name="delete" size={SF(22)} color={Colors.theme_background} />
                  </TouchableOpacity>
                </View> */}
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
              </View>
            )}
            {/* Four question start */}
            {currentQuestion === 4 && (
              <View>
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Entitlement")}</Text>
                   <Spacing space={SH(10)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether covered  under PM Kishan / CM Kishan Scheme?")}</Text>
                <RadioButton
                  arrayData={schemeData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Has the family provided house under the Rural Housing Scheme?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Does your family have a Job Card under MGNREGS?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("Mention the Full Job card No (after Revenue Village code)")}
                  placeholder={t("Mention the Full Job card No (after Revenue Village code)")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                 <Spacing space={SH(5)} />
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the Household provided with Individual Household Latrine in past?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the household has electricity connection?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether Covered under Pradhan Mantri Ayushman  Jan Arogya Yojana?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Is any household member enrolled under Pradhan Mantri Shram Yogi Maandhan pension scheme?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Does the household have Pradhan Mantri Jan Dhan Yojana bank account?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether the family members between 18 to 50 years age covered under Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) ?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether family members between age 18 to 70 years covered under Pradhan Mantri Suraksha Bima Yojana (PMSBY) ?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
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
                  <Text style={AnalyaticsStyles.TitleStyle}>{t("Migration Status")}</Text>
                  <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Has any family member migrated during the last 3 years?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Had the family taken any advance from middleman  for migration?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether minor children accompanied during migration?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether Women Members Migrated?")}</Text>
                <RadioButton
                  arrayData={selfHelpData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                <Spacing space={SH(5)} />
                <Input
                  title={t("Family contact mobile no.?")}
                  placeholder={t("Family contact mobile no.?")}
                  onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                  value={state.mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                <Spacing space={SH(10)}/>
                 <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Identity of the respondent?")}</Text>
                <RadioButton
                  arrayData={respondantData}
                  onChangeText={(text) => setState({ ...state, QuestionOne: text })}
                  value={state.QuestionOne}
                />
                   <Spacing space={SH(10)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Capture a photo of the respondent")}</Text>
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
                  title={t("Surveyor Name")}
                  placeholder={t("Surveyor Name")}
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
    </View>
  );
};
export default FamilyFormSurveyTab;
