import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
// import { Modal, Text, View } from "react-native";
// import Style from '../../styles/CommonStyle/Style';
import {
  Button,
  Spacing,
  VectorIcon,
  Input,
  RadioButton,
  CheckBox,
  DropDown,
} from '../../components';
import propTypes from 'prop-types';
import {Colors, SH, SW} from '../../utils';
import {useTranslation} from 'react-i18next';
// import { AnalyaticsStyle } from "../../styles";

import PubSub from 'pubsub-js';
import {useTheme} from 'react-native-elements';
import {Style, AnalyaticsStyle, HomeTabStyle} from '../../styles';
import {Formik} from 'formik';
import {validationSchema} from './AddFamilyHelper';
import {RouteName} from '../../routes';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../api';
import {getMasterData} from '../Home/Tab/HomeHelper';

const AddFamilyScreenUpdated = props => {
  const {navigation} = props;
  const {route} = useRoute();
  //   const { Colors } = useTheme();
  //   const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);

  const {t, i18n} = useTranslation();
  const [state, setState] = useState({});
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);

  const [familyMembers, setFamilyMembers] = useState([]);
  const [headName, setHeadName] = useState('');

  const [genderName, setGenderName] = useState('');

  const [count, setCount] = useState(0);
  const [type, setType] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();
  const {familyData, loginData} = useSelector(state => state.DataReducer) || {};

  const formikRef = useRef(null);

  useEffect(() => {
    loadRelationshipData(); //1
    loadGenders(); //2
    loadEducationData(); //3
    loadSectorsData(); //7

    const token = PubSub.subscribe('count', (msg, data) => {
      console.log('Received count:', data);

      const targetCount = data?.count || 0;
      setCount(targetCount);
      setHeadName(data?.name);
      setType(data?.type);
      setGenderName(data?.gender);

      familyMembers[0] = {
        ...familyMembers[0],
        name: data?.name || headName,
        gender: data?.gender || genderName,
      };

      setCurrentIndex(targetCount > 0 ? targetCount - 1 : 0);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, [isFocused]);
  useEffect(() => {
    // 3. Access setFieldTouched safely through the current ref
    if (familyMembers[0]?.name) {
      formikRef.current?.setFieldTouched('familyMembers.0.name', true);
      formikRef.current?.setFieldValue('familyMembers.0.name', familyMembers[0]?.name);
    }
    if (familyMembers[0]?.gender) {
      formikRef.current?.setFieldTouched('familyMembers.0.gender', true);
      formikRef.current?.setFieldValue('familyMembers.0.gender', familyMembers[0]?.gender);
    }
  }, [familyMembers[0]?.name, familyMembers[0]?.gender]);
  const [genderData, setGenderData] = useState([]);
  const loadGenders = async () => {
    let token = loginData?.token;

    const currentLanguage = i18n.language;

    //  const language = await getLanguage();
    const genders = await getMasterData(
      'gender',
      2, // The index you assigned in saveMasters
      api.master.getGender,
      token,
    );

    const result = genders.map(gender => {
      return {
        id: gender.id,
        label:
          currentLanguage === 'en' ? gender.genderName : gender.genderNameLocal,
        value:
          currentLanguage === 'en' ? gender.genderName : gender.genderNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Gender data fetched successfully!'+JSON.stringify(result));
    setGenderData(result);
  };
  const selfHelpData = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
  ];

  const migrationData = [
    {label: t('1-3months'), value: '1-3 months'},
    {label: t('4-6months'), value: '4-6 months'},
    {label: t('7-12months'), value: '7-12 months'},
  ];

  const [educationData, setEducationData] = useState([]);
  const loadEducationData = async () => {
    let token = loginData?.token;

    const currentLanguage = i18n.language;

    //  const language = await getLanguage();
    const educations = await getMasterData(
      'education',
      3, // The index you assigned in saveMasters
      api.master.getEducation,
      token,
    );

    const result = educations.map(education => {
      return {
        id: education.id,
        label:
          currentLanguage === 'en'
            ? education.qualificationName
            : education.qualificationNameLocal,
        value:
          currentLanguage === 'en'
            ? education.qualificationName
            : education.qualificationNameLocal,
      };
    }); // Sort alphabetically

    setEducationData(result);
  };
  // const educationData = [
  //   {label: 'Illiterate', value: 'Illiterate'},
  //   {label: 'Never attended school', value: 'Never attended school'},
  //   {
  //     label: 'Literate but no formal schooling',
  //     value: 'Literate but no formal schooling',
  //   },
  //   {label: 'Primary(Class 1-5)', value: 'Primary(Class 1-5)'},
  //   {label: 'Upper Primary(Class 6-8)', value: 'Upper Primary(Class 6-8)'},
  //   {label: 'Secondary(Class 9-10)', value: 'Secondary(Class 9-10)'},
  //   {
  //     label: 'Higher Secondary(Class 11-12)',
  //     value: 'Higher Secondary(Class 11-12)',
  //   },
  //   {label: 'Graduate & Others Diploma', value: 'Graduate & Others Diploma'},
  //   {label: 'ITI', value: 'ITI'},
  //   {label: 'Vocational Training', value: 'Vocational Training'},
  // ];
  const [relationshipData, setRelationshipData] = useState([]);
  const loadRelationshipData = async () => {
    let token = loginData?.token;

    const currentLanguage = i18n.language;

    //  const language = await getLanguage();
    const relations = await getMasterData(
      'relationship',
      1, // The index you assigned in saveMasters
      api.master.getRelationship,
      token,
    );

    const result = relations.map(relation => {
      return {
        id: relation.id,
        label:
          currentLanguage === 'en'
            ? relation.relationshipName
            : relation.relationshipNameLocal,
        value:
          currentLanguage === 'en'
            ? relation.relationshipName
            : relation.relationshipNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Education data fetched successfully!'+JSON.stringify(result));
    setRelationshipData(result);
  };

  // const relationshipData = [
  //   {label: 'Self', value: 'Self'},
  //   {label: 'Parents', value: 'Parents'},
  //   {label: 'Children', value: 'Children'},
  //   {label: 'Spouse', value: 'Spouse'},
  //   {label: 'Other', value: 'Other'},
  // ];
  const statesData = [
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Manipur', value: 'Manipur'},
    {label: 'Meghalaya', value: 'Meghalaya'},
    {label: 'Mizoram', value: 'Mizoram'},
    {label: 'Nagaland', value: 'Nagaland'},
    {label: 'Odisha', value: 'Odisha'},
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Rajasthan', value: 'Rajasthan'},
    {label: 'Sikkim', value: 'Sikkim'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Telangana', value: 'Telangana'},
    {label: 'Tripura', value: 'Tripura'},
    {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
    {label: 'Uttarakhand', value: 'Uttarakhand'},
    {label: 'West Bengal', value: 'West Bengal'},
    {
      label: 'Andaman and Nicobar Islands',
      value: 'Andaman and Nicobar Islands',
    },
    {label: 'Chandigarh', value: 'Chandigarh'},
    {
      label: 'Dadra and Nagar Haveli and Daman and Diu',
      value: 'Dadra and Nagar Haveli and Daman and Diu',
    },
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
    {label: 'Ladakh', value: 'Ladakh'},
    {label: 'Lakshadweep', value: 'Lakshadweep'},
    {label: 'Puducherry', value: 'Puducherry'},
    {label: 'Intra-state', value: 'Intra-state'},
    {label: 'Other', value: 'Other'},
  ];
  const [sectorsData, setSectorsData] = useState([]);
  const loadSectorsData = async () => {
    let token = loginData?.token;

    const currentLanguage = i18n.language;

    //  const language = await getLanguage();
    const sectors = await getMasterData(
      'migrationSector',
      7, // The index you assigned in saveMasters
      api.master.getMigrationSector,
      token,
    );

    const result = sectors.map(sector => {
      return {
        id: sector.id,
        label:
          currentLanguage === 'en' ? sector.sectorName : sector.sectorNameLocal,
        value:
          currentLanguage === 'en' ? sector.sectorName : sector.sectorNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Education data fetched successfully!'+JSON.stringify(result));
    setSectorsData(result);
  };

  // const sectorsData = [
  //   {label: 'Brick Kiln', value: 'Brick Kiln'},
  //   {label: 'Construction Labour', value: 'Construction Labour'},
  //   {label: 'Agri Labour', value: 'Agri Labour'},
  //   {label: 'Mason', value: 'Mason'},
  //   {label: 'Domestic Support', value: 'Domestic Support'},
  //   {label: 'Manufacturing', value: 'Manufacturing'},
  //   {
  //     label: 'Service Sector(Hotel,Hospital,Security)',
  //     value: 'Service Sector(Hotel,Hospital,Security)',
  //   },
  //   {label: 'Other', value: 'Other'},
  // ];
  const monthlyIncomeData = [
    {label: '3000', value: '3000'},
    {label: '4000', value: '4000'},
    {label: '5000', value: '5000'},
    {label: '6000', value: '6000'},
    {label: '7000', value: '7000'},
    {label: '8000', value: '8000'},
    {label: '9000', value: '9000'},
    {label: '10000', value: '10000'},
    {label: '11000', value: '11000'},
    {label: '12000', value: '12000'},
    {label: '13000', value: '13000'},
    {label: '14000', value: '14000'},
    {label: '15000', value: '15000'},
    {label: '16000', value: '16000'},
    {label: '17000', value: '17000'},
    {label: '18000', value: '18000'},
    {label: '19000', value: '19000'},
    {label: '20000', value: '20000'},
  ];

  const initialMembers = Array.from({length: count}, () => ({
    name: headName || '',
    age: '',
    gender: '',
    educationalQualification: '',
    relationshipWithHeadOfHousehold: '',
    migratedInLast3Years: '',
    memberHasLabourCard: '',
    memberCoveredUnderNSKY: '',
    destinationState: '',
    periodOfMigration: '',
    monthlyRemittanceDuringMigration: '',
    interestInSkillDevelopment: null,
    sectorOfEngagementDuringMigration: '',
  }));
  // Helper component to cleanly display inline formik errors
  const ErrorMessage = ({label, errors, touched, setFieldTouched}) => {
    const error = errors?.familyMembers?.[currentIndex]?.[label];
    const isTouched = touched?.familyMembers?.[currentIndex]?.[label];
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    return null;
  };
  return (
    <Formik
      innerRef={formikRef} // 2. Pass the ref here
      initialValues={{familyMembers: initialMembers}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('Final Data:', values);
        if (type == 1) {
          PubSub.publish('familyData', values?.familyMembers);

          navigation.navigate(RouteName.FAMILY_SURVEY_TAB);

          return;
        }
        if (type == 2) {
          const result = {
            ...familyData,
            householdFamilyMember: values.familyMembers,
          };
          //Alert.alert("familyData",JSON.stringify(result.householdFamilyMember));
          PubSub.publish('HouseItem', result);
          //  PubSub.publish('familyData', values.familyMembers);
          // navigation.replace(RouteName.FAMILY_SURVEY_EDIT_TAB);
          navigation.reset({
            index: 0,
            routes: [{name: RouteName.FAMILY_SURVEY_EDIT_TAB}],
          });
          return;
        }
        // setModalVisible(false);
      }}>
      {({
        values,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        handleSubmit,
      }) => {
        const member = values.familyMembers[currentIndex];
        return (
          <View style={Style.BgColorWhiteAll}>
            <ScrollView>
              <View style={styles.card}>
                <Text style={styles.title}>
                  {t('Household Member No.')} {currentIndex + 1}
                </Text>

                {/* SQUARE BOX PAGINATION */}
                <View style={styles.paginationContainer}>
                  {Array.from({length: count}).map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.pageBox,
                        currentIndex === index
                          ? styles.activePageBox
                          : styles.inactivePageBox,
                      ]}
                      onPress={() => setCurrentIndex(index)}>
                      <Text
                        style={[
                          styles.pageText,
                          currentIndex === index
                            ? styles.activePageText
                            : styles.inactivePageText,
                        ]}>
                        {index + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* NAME */}
                <Input
                  title={t('Name of the Family Member')}
                  value={familyMembers[currentIndex]?.name}
                  onChangeText={text => {
                    const cleaned = text.replace(/[^a-zA-Z\s.]/g, '');
                    setFieldValue(
                      `familyMembers[${currentIndex}].name`,
                      cleaned,
                    );
                    familyMembers[currentIndex] = {
                      ...familyMembers[currentIndex],
                      name: cleaned,
                    };
                    if (familyMembers[0]?.name) {
                      setFieldTouched(`familyMembers?.[0]?.[name]`, true);
                    }
                    if (familyMembers[0]?.gender) {
                      setFieldTouched(`familyMembers?.[0]?.[gender]`, true);
                    }
                  }}
                  maxLength={30}
                />
                <ErrorMessage
                  name="name"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                {/* AGE */}
                <Input
                  title={t('AgeN')}
                  keyboardType="numeric"
                  value={member?.age}
                  onChangeText={text =>
                    setFieldValue(
                      `familyMembers[${currentIndex}].age`,
                      text.replace(/[^0-9]/g, ''),
                    )
                  }
                />
                <ErrorMessage
                  name="age"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* GENDER */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Gender')}
                </Text>
                <RadioButton
                  arrayData={genderData}
                  value={currentIndex==0?genderName:member?.gender}
                  onChangeText={(val)=>{
                    setFieldValue(`familyMembers[${currentIndex}].gender`, val);
                    if(currentIndex==0){
                    setGenderName(val);
                    }
                  }
                  }
                />
                <ErrorMessage
                  name="gender"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* Educational Qualification */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Education Qualification')}
                </Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={educationData}
                  dropdownStyle={{marginLeft: SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  value={member?.educationalQualification}
                  placeholder={
                    member?.educationalQualification ||
                    t('Select Education Qualification')
                  }
                  onChange={obj => {
                    setFieldValue(
                      `familyMembers[${currentIndex}].educationalQualification`,
                      obj?.label,
                    );
                  }}
                />
                <ErrorMessage
                  name="educationalQualification"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* Relationship with Head of Household */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Relationship with Head of Household')}
                </Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={relationshipData}
                  dropdownStyle={{marginLeft: SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  value={member?.relationshipWithHeadOfHousehold}
                  placeholder={
                    member?.relationshipWithHeadOfHousehold ||
                    t('Relationship with Head of Household')
                  }
                  onChange={obj => {
                    setFieldValue(
                      `familyMembers[${currentIndex}].relationshipWithHeadOfHousehold`,
                      obj?.label,
                    );
                  }}
                />
                <ErrorMessage
                  name="relationshipWithHeadOfHousehold"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* labour Card*/}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Whether the Member has labour Card')}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.memberHasLabourCard}
                  onChangeText={val =>
                    setFieldValue(
                      `familyMembers[${currentIndex}].memberHasLabourCard`,
                      val,
                    )
                  }
                />
                <ErrorMessage
                  name="memberHasLabourCard"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/*Nirman Shramik Kalyan Yojana*/}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t(
                    'Whether the member covered under Nirman Shramik Kalyan Yojana (NSKY)?',
                  )}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.memberCoveredUnderNSKY}
                  onChangeText={val =>
                    setFieldValue(
                      `familyMembers[${currentIndex}].memberCoveredUnderNSKY`,
                      val,
                    )
                  }
                />
                <ErrorMessage
                  name="memberCoveredUnderNSKY"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* Destination State */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Destination State')}
                </Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={statesData}
                  dropdownStyle={{marginLeft: SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  value={member?.destinationState}
                  placeholder={
                    member?.destinationState || t('Destination State')
                  }
                  onChange={obj => {
                    setFieldValue(
                      `familyMembers[${currentIndex}].destinationState`,
                      obj?.label,
                    );
                  }}
                />
                <ErrorMessage
                  name="destinationState"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                {/* Nature/Sector of engagement */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t(
                    'Nature/Sector of engagement at destination during migration?',
                  )}
                </Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={sectorsData}
                  dropdownStyle={{marginLeft: SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  value={member?.sectorOfEngagementDuringMigration}
                  placeholder={
                    member?.sectorOfEngagementDuringMigration ||
                    t(
                      'Nature/Sector of engagement at destination during migration?',
                    )
                  }
                  onChange={obj => {
                    setFieldValue(
                      `familyMembers[${currentIndex}].sectorOfEngagementDuringMigration`,
                      obj?.label,
                    );
                  }}
                />
                <ErrorMessage
                  name="sectorOfEngagementDuringMigration"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                {/* migrated */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Whether Migrated in last three years')}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.migratedInLast3Years}
                  onChangeText={val => {
                    // Alert.alert("val",JSON.stringify(val));
                    setFieldValue(
                      `familyMembers[${currentIndex}].migratedInLast3Years`,
                      val,
                    );
                    if (!val) {
                      setFieldValue(
                        `familyMembers[${currentIndex}].periodOfMigration`,
                        '',
                      );

                      setFieldValue(
                        `familyMembers[${currentIndex}].monthlyRemittanceDuringMigration`,
                        0,
                      );
                    }
                  }}
                />
                <ErrorMessage
                  name="migratedInLast3Years"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* Period of migration */}
                {member?.migratedInLast3Years && <Spacing space={SH(15)} />}
                {member?.migratedInLast3Years && (
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>
                    {t('Period of migration')}
                  </Text>
                )}
                {member?.migratedInLast3Years && <Spacing space={SH(5)} />}
                {member?.migratedInLast3Years && (
                  <DropDown
                    data={migrationData}
                    dropdownStyle={{marginLeft: SH(10)}}
                    width={SW(345)}
                    labelField="label"
                    valueField="value"
                    value={member?.periodOfMigration}
                    placeholder={
                      member?.periodOfMigration || t('Period of migration')
                    }
                    onChange={obj => {
                      setFieldValue(
                        `familyMembers[${currentIndex}].periodOfMigration`,
                        obj?.label,
                      );
                    }}
                  />
                )}
                <ErrorMessage
                  name="periodOfMigration"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />
                {/* Monthly Income */}
                {member?.migratedInLast3Years && <Spacing space={SH(15)} />}
                {member?.migratedInLast3Years && (
                  <Text style={AnalyaticsStyles.PleaseEnterDate}>
                    {t(
                      'What was the monthly income during migration(In Rupees)?',
                    )}
                  </Text>
                )}
                {member?.migratedInLast3Years && <Spacing space={SH(5)} />}
                {member?.migratedInLast3Years && (
                  <DropDown
                    data={monthlyIncomeData}
                    dropdownStyle={{marginLeft: SH(10)}}
                    width={SW(345)}
                    labelField="label"
                    valueField="value"
                    value={member?.monthlyRemittanceDuringMigration}
                    placeholder={
                      member?.monthlyRemittanceDuringMigration ||
                      t(
                        'What was the monthly income during migration(In Rupees)?',
                      )
                    }
                    onChange={obj => {
                      setFieldValue(
                        `familyMembers[${currentIndex}].monthlyRemittanceDuringMigration`,
                        obj?.label,
                      );
                    }}
                  />
                )}
                <ErrorMessage
                  name="monthlyRemittanceDuringMigration"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/*skill development*/}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t(
                    'Whether interested for skill development (DDUGKY, RSETI, Other) under any Govt. program?',
                  )}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.interestInSkillDevelopment}
                  onChangeText={val =>
                    setFieldValue(
                      `familyMembers[${currentIndex}].interestInSkillDevelopment`,
                      val,
                    )
                  }
                />
                <ErrorMessage
                  name="interestInSkillDevelopment"
                  errors={errors}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                />

                {/* CHECKBOX EXAMPLE */}
                {/* {['DDUGKY', 'RSETI', 'Other'].map((item, i) => (
                  <CheckBox
                    key={i}
                    title={item}
                    checked={member.interestInSkillDevelopment.includes(item)}
                    onPress={() => {
                      const current = member.interestInSkillDevelopment || [];

                      if (current.includes(item)) {
                        setFieldValue(
                          `familyMembers[${currentIndex}].interestInSkillDevelopment`,
                          current.filter(v => v !== item),
                        );
                      } else {
                        setFieldValue(
                          `familyMembers[${currentIndex}].interestInSkillDevelopment`,
                          [...current, item],
                        );
                      }
                    }}
                  />
                ))} */}

                {/* NAVIGATION */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between',
                  }}>
                  {currentIndex > 0 && (
                    // <Button
                    //   title="Previous"
                    //   onPress={() => {
                    //      setCurrentIndex(i => i - 1);
                    //    // setCurrentIndex(i);
                    // }}
                    // />
                    <TouchableOpacity
                      style={AnalyaticsStyles.PreviousButton}
                      onPress={() => {
                        setCurrentIndex(i => i - 1);
                        // setCurrentIndex(i);
                      }}>
                      <Text style={AnalyaticsStyles.PreviousTextStyle}>
                        {t('Survey_Title_47')}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {currentIndex < count - 1 ? (
                    // <Button
                    //   title="Next"
                    //   onPress={() => {
                    //      setCurrentIndex(i => i + 1);
                    //     // setCurrentIndex(i);
                    // }}
                    // />
                    <TouchableOpacity
                      style={AnalyaticsStyles.PreviousButton}
                      onPress={() => {
                        setCurrentIndex(i => i + 1);
                        // setCurrentIndex(i);
                      }}>
                      <Text style={AnalyaticsStyles.PreviousTextStyle}>
                        {t('Survey_Title_48')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={AnalyaticsStyles.SubmitButton}
                      onPress={() => {

                        if (familyMembers.length !== count) {
                          Alert.alert(
                            t('Error'),
                            t(
                              'Please fill all family members data before submitting.',
                            ),
                            [{text: t('OK'), style: 'default'}],
                          );
                          return;
                        }

                        // Alert.alert("errors",JSON.stringify(errors));

                        if (
                          errors.familyMembers &&
                          errors.familyMembers.length > 0
                        ) {
                          Alert.alert(
                            t('Error'),
                            t(
                              'Please correct the errors in the form before submitting.',
                            ),
                            [{text: t('OK'), style: 'default'}],
                          );
                          return;
                        }
                        //  return;

                        Alert.alert(
                          t('Confirmation'),
                          t(
                            'Are you sure you want to submit the family members data?',
                          ),
                          [
                            {
                              text: t('Cancel'),
                              style: 'cancel',
                            },
                            {
                              text: t('Submit'),
                              onPress: () => handleSubmit(),
                            },
                          ],
                          {cancelable: false},
                        );
                        // handleSubmit()
                      }}>
                      <Text style={AnalyaticsStyles.PreviousTextStyle}>
                        {t('Add member')}
                      </Text>
                    </TouchableOpacity>
                    // <Button title="Submit" onPress={handleSubmit} />
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: SH(16),
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  pageBox: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  activePageBox: {
    backgroundColor: '#007AFF', // You can swap this with Colors.themeColor if available
    borderColor: '#007AFF',
  },
  inactivePageBox: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  pageText: {
    fontSize: SH(14),
    fontWeight: '600',
  },
  activePageText: {
    color: '#FFFFFF',
  },
  inactivePageText: {
    color: '#333333',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: SH(12),
    marginLeft: SH(10),
  },
});
export default AddFamilyScreenUpdated;
