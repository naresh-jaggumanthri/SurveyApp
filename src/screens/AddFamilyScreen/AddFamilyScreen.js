import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
import { RouteName } from '../../routes';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddFamilyScreen = props => {
  const {navigation} = props;
    const {route}=useRoute();
  //   const { Colors } = useTheme();
  //   const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);

  const {t} = useTranslation();
  const [state, setState] = useState({});
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
 
 
  const [familyMembers, setFamilyMembers] = useState([]);
  
const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const token = PubSub.subscribe('count', (msg, data) => {
    console.log('Received count:', data);
    setCount(data);
    setCurrentIndex(data-1);
  });

  return () => {
    PubSub.unsubscribe(token);
  };
  }, []);
  const genderData = [
    {label: t('mMale'), value: t('mMale')},
    {label: t('fFemale'), value: t('fFemale')},
    {label: t('Others'), value: t('Others')},
  ];
  const selfHelpData = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
  ];
  const sectorData = [
    {label: t('Brick Kiln'), value: 'Brick Kiln'},
    {label: t('Construction Labour'), value: 'Construction Labour'},
    {label: t('Agri Labour'), value: 'Agri Labour'},
    {label: t('Mason'), value: 'Mason'},
    {label: t('Domestic Support'), value: 'Domestic Support'},
    {label: t('Domestic Support'), value: 'Domestic Support'},
    {label: t('Manufacturing'), value: 'Manufacturing'},
    {
      label: t('Service Sector(Hotel,Hospital,Security)'),
      value: 'Service Sector(Hotel,Hospital,Security)',
    },
    {label: t('Other'), value: 'Other'},
  ];
  const migrationData = [
    {label: t('1-3months'), value: '1-3 months'},
    {label: t('4-6months'), value: '4-6 months'},
    {label: t('7-12months'), value: '7-12 months'},
  ];
  const [checkboxes, setCheckboxes] = useState([
    {label: t('DDUGKY'), checked: false, mainIndex: 0},
    {label: t('RSETI'), checked: false, mainIndex: 0},
    {label: t('Other'), checked: false, mainIndex: 0},
    {label: t('None'), checked: false, mainIndex: 0},

    // Add more options as needed
  ]);
  const [checkboxes2, setCheckboxes2] = useState([
    {label: t('Brick Kiln'), checked: false},
    {label: t('Construction Labour'), checked: false},
    {label: t('Agri Labour'), checked: false},
    {label: t('Mason'), checked: false},
    {label: t('Domestic Support'), checked: false},
    {label: t('Manufacturing'), checked: false},
    {label: t('Service Sector(Hotel,Hospital,Security)'), checked: false},
    {label: t('Other'), checked: false},

    // Add more options as needed
  ]);
  const educationData = [
    {label: 'Illiterate', value: 'Illiterate'},
    {label: 'Never attended school', value: 'Never attended school'},
    {
      label: 'Literate but no formal schooling',
      value: 'Literate but no formal schooling',
    },
    {label: 'Primary(Class 1-5)', value: 'Primary(Class 1-5)'},
    {label: 'Upper Primary(Class 6-8)', value: 'Upper Primary(Class 6-8)'},
    {label: 'Secondary(Class 9-10)', value: 'Secondary(Class 9-10)'},
    {
      label: 'Higher Secondary(Class 11-12)',
      value: 'Higher Secondary(Class 11-12)',
    },
    {label: 'Graduate & Others Diploma', value: 'Graduate & Others Diploma'},
    {label: 'ITI', value: 'ITI'},
    {label: 'Vocational Training', value: 'Vocational Training'},
  ];
  const relationshipData = [
    {label: 'Self', value: 'Self'},
    {label: 'Parents', value: 'Parents'},
    {label: 'Children', value: 'Children'},
    {label: 'Spouse', value: 'Spouse'},
    {label: 'Other', value: 'Other'},
  ];
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
    {label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands'},
    {label: 'Chandigarh', value: 'Chandigarh'},
    {label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
    {label: 'Ladakh', value: 'Ladakh'},
    {label: 'Lakshadweep', value: 'Lakshadweep'},
    {label: 'Puducherry', value: 'Puducherry'},
    {label:'Intra-state', value:'Intra-state'},
    {label: 'Other', value: 'Other'},   
  ];
  const sectorsData = [
    {label: 'Brick Kiln', value: 'Brick Kiln'},
    {label: 'Construction Labour', value: 'Construction Labour'},
    {label: 'Agri Labour', value: 'Agri Labour'},
    {label: 'Mason', value: 'Mason'},
    {label: 'Domestic Support', value: 'Domestic Support'},
    {label: 'Manufacturing', value: 'Manufacturing'},
    {label: 'Service Sector(Hotel,Hospital,Security)', value: 'Service Sector(Hotel,Hospital,Security)'},
    {label: 'Other', value: 'Other'},
  ];
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
    name: '',
    age: '',
    gender: '',
    educationalQualification: '',
    relationshipWithHeadOfHousehold:'',
    migratedInLast3Years: '',
    memberHasLabourCard: '',
    memberCoveredUnderNSKY: '',
    destinationState: '',
    periodOfMigration: '',
    monthlyRemittanceDuringMigration: '',
    interestInSkillDevelopment:null,
    sectorOfEngagementDuringMigration: [],
  }));
  return (
    <Formik
      initialValues={{familyMembers: initialMembers}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('Final Data:', values);
        // Alert.alert('Form Submitted', JSON.stringify(values));
        PubSub.publish('familyData', values.familyMembers);
        navigation.navigate(RouteName.FAMILY_SURVEY_TAB);
        // setModalVisible(false);
      }}>
      {({values, setFieldValue, errors, touched, handleSubmit}) => {
        const member = values.familyMembers[currentIndex];
        return (
          <View style={Style.BgColorWhiteAll}>
            <ScrollView>
              <View style={styles.card}>
                <Text>Family Member {currentIndex + 1}</Text>

                {/* NAME */}
                <Input
                  title={t('Name of the Family Member')}
                  value={member?.name}
                  onChangeText={text => {
                    const cleaned = text.replace(/[^a-zA-Z\s]/g, '');
                    setFieldValue(
                      `familyMembers[${currentIndex}].name`,
                      cleaned,
                    );
                  }}
                />
                {errors.familyMembers?.[currentIndex]?.name && (
                  <Text style={{color: 'red'}}>
                    {errors.familyMembers[currentIndex].name}
                  </Text>
                )}

                {/* AGE */}
                <Input
                  title={t('Age')}
                  keyboardType="numeric"
                  value={member?.age}
                  onChangeText={text =>
                    setFieldValue(
                      `familyMembers[${currentIndex}].age`,
                      text.replace(/[^0-9]/g, ''),
                    )
                  }
                />

                {/* GENDER */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Gender')}
                </Text>
                <RadioButton
                  arrayData={genderData}
                  value={member?.gender}
                  onChangeText={val =>
                    setFieldValue(`familyMembers[${currentIndex}].gender`, val)
                  }
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
                    member?.educationalQualification || t('Select Education Qualification')
                  }
                  onChange={obj => {
                   setFieldValue(
        `familyMembers[${currentIndex}].educationalQualification`,
        obj?.label
      )
                  }}
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
                    member?.relationshipWithHeadOfHousehold || t('Relationship with Head of Household')
                  }
                  onChange={obj => {
                   setFieldValue(
        `familyMembers[${currentIndex}].relationshipWithHeadOfHousehold`,
        obj?.label
      )
                  }}
                />

                 {/* migrated */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Whether Migrated in last three years')}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.migratedInLast3Years}
                  onChangeText={val =>
                    setFieldValue(`familyMembers[${currentIndex}].migratedInLast3Years`, val)
                  }
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
                    setFieldValue(`familyMembers[${currentIndex}].memberHasLabourCard`, val)
                  }
                />
                   {/*Nirman Shramik Kalyan Yojana*/}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Whether the member covered under Nirman Shramik Kalyan Yojana (NSKY)?')}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.memberCoveredUnderNSKY}
                  onChangeText={val =>
                    setFieldValue(`familyMembers[${currentIndex}].memberCoveredUnderNSKY`, val)
                  }
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
        obj?.label
      )
                  }}
                />
                {/* Nature/Sector of engagement */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                 {t('Nature/Sector of engagement at destination during migration?')}
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
                    member?.sectorOfEngagementDuringMigration || t('Nature/Sector of engagement at destination during migration?')
                  }
                  onChange={obj => {
                   setFieldValue(
        `familyMembers[${currentIndex}].sectorOfEngagementDuringMigration`,
        obj?.label
      )
                  }}
                />

 {/* Period of migration */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                 {t('Period of migration')}
                </Text>
                <Spacing space={SH(5)} />
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
        obj?.label
      )
                  }}
                />
                {/* Monthly Income */}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                 {t('What was the monthly income during migration(In Rupees)?')}
                </Text>
                <Spacing space={SH(5)} />
                <DropDown
                  data={monthlyIncomeData}
                  dropdownStyle={{marginLeft: SH(10)}}
                  width={SW(345)}
                  labelField="label"
                  valueField="value"
                  value={member?.monthlyRemittanceDuringMigration}
                  placeholder={
                    member?.monthlyRemittanceDuringMigration || t('What was the monthly income during migration(In Rupees)?')
                  }
                  onChange={obj => {
                   setFieldValue(
        `familyMembers[${currentIndex}].monthlyRemittanceDuringMigration`,
        obj?.label
      )
                  }}
                />

                  {/*skill development*/}
                <Spacing space={SH(15)} />
                <Text style={AnalyaticsStyles.PleaseEnterDate}>
                  {t('Whether interested for skill development (DDUGKY, RSETI, Other) under any Govt. program?')}
                </Text>
                <RadioButton
                  arrayData={selfHelpData}
                  value={member?.interestInSkillDevelopment}
                  onChangeText={val =>
                    setFieldValue(`familyMembers[${currentIndex}].interestInSkillDevelopment`, val)
                  }
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
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  {currentIndex > 0 && (
                    <Button
                      title="Previous"
                      onPress={() => setCurrentIndex(i => i - 1)}
                    />
                  )}

                  {currentIndex < values.familyMembers.length - 1 ? (
                    <Button
                      title="Next"
                      onPress={() => setCurrentIndex(i => i + 1)}
                    />
                  ) : (
                    <Button title="Submit" onPress={handleSubmit} />
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
export default AddFamilyScreen;
