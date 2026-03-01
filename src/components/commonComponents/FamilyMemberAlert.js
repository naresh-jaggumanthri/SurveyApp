import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
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
} from '../../components';
import propTypes from 'prop-types';
import {Colors, SH} from '../../utils';
import {useTranslation} from 'react-i18next';
// import { AnalyaticsStyle } from "../../styles";
import {Style, AnalyaticsStyle, HomeTabStyle} from '../../styles';
import PubSub from 'pubsub-js';

function FamilyalertModal(props) {
  const {
    message,
    modalVisible,
    setModalVisible,
    buttonminview,
    onPress,
    onPressCancel,
    buttonText,
    cancelButtonText,
    iconVisible,
    count,
    familyMembers,
    setFamilyMembers,
    handleMemberChange,
    editable,
  } = props;
  // Alert.alert('familyMembers',JSON.stringify(count));
  const {t} = useTranslation();
  const [state, setState] = useState({});
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  useLayoutEffect(() => {
    var token = PubSub.subscribe('HouseItem', mySubscriber);
  }, []);
  var mySubscriber = function (msg, data) {
    const members = data?.item?.householdFamilyMember;
    setFamilyMembers(members);
  };
  useEffect(() => {
    //  Alert.alert("familyMembers",JSON.stringify(familyMembers));
    if (count > 0) {
      if (editable) {
        let existingCount = familyMembers?.length || 0;
        let newCount = count - existingCount;
        setFamilyMembers([
          ...familyMembers,
          Array.from({length: newCount}, () => ({
            name: '',
            age: 0,
            gender: '',
            educationalQualification: '',
            migratedInLast3Years: false,
            destinationState: '',
            sectorOfEngagementDuringMigration: '',
            periodOfMigration: '',
            monthlyRemittanceDuringMigration: 0,
            interestInSkillDevelopment: '',
          })),
        ]);
      } else {
        setFamilyMembers(
          Array.from({length: count}, () => ({
            name: '',
            age: 0,
            gender: '',
            educationalQualification: '',
            migratedInLast3Years: false,
            destinationState: '',
            sectorOfEngagementDuringMigration: '',
            periodOfMigration: '',
            monthlyRemittanceDuringMigration: 0,
            interestInSkillDevelopment: '',
          })),
        );
      }
    }
  }, [count]);
  //  const handleMemberChange = async(index, key, value) => {
  //     const updatedMembers = [...familyMembers];
  //     updatedMembers[index][key] = value;
  //     await setFamilyMembers([...updatedMembers]);
  //   };

  const renderForm = () => {
    if (!familyMembers || familyMembers.length === 0) return null;
    const FamilyMemberForm = ({index, data, onChange}) => {
      const [nameError, setNameError] = useState('');
      return (
        <View>
          <Text style={AnalyaticsStyles.PleaseEnterDate}>
            {t('Family Member')} {index + 1}
          </Text>
          <Spacing space={SH(5)} />
          {/* <Input
        title={t('Name of the Family Member')}
        placeholder={t('Name of the Family Member')}
        onChangeText={text => onChange(index, 'name', text)}
        value={data.name}
        inputType="text"
        titleStyle={AnalyaticsStyles.PleaseEnterDate}
      /> */}
          <Input
            title={t('Name of the Family Member')}
            placeholder={t('Name of the Family Member')}
            value={data.name}
            inputType="text"
            titleStyle={AnalyaticsStyles.PleaseEnterDate}
            onChangeText={text => {
              const cleaned = text.replace(/[^a-zA-Z\s]/g, '');

              // if (cleaned.length > 0 && cleaned.trim().length < 3) {
              //   setNameError('Minimum 3 characters required');
              // } else {
              //   setNameError('');
              // }

              onChange(index, 'name', cleaned);
            }}
            onEndEditing={() => {
              if (data.name.trim().length < 3) {
                setNameError('Minimum 3 characters required');
              } else {
                setNameError('');
              }
            }}
          />

          {nameError ? (
            <Text style={{color: 'red', fontSize: 12}}>{nameError}</Text>
          ) : null}

          <Spacing space={SH(5)} />
          <Input
            title={t('Age')}
            placeholder={t('Age')}
            onChangeText={text => onChange(index, 'age', text)}
            value={data.age}
            inputType="numeric"
            maxLength={10}
            titleStyle={AnalyaticsStyles.PleaseEnterDate}
          />

          <Spacing space={SH(15)} />
          <Text style={AnalyaticsStyles.PleaseEnterDate}>{t('Gender')}</Text>
          <RadioButton
            arrayData={genderData}
            onChangeText={text => onChange(index, 'gender', text)}
            value={data.gender}
          />
          <Spacing space={SH(5)} />
          <Input
            title={t('Education Qualification')}
            placeholder={t('Education Qualification')}
            onChangeText={text =>
              onChange(index, 'educationalQualification', text)
            }
            value={data.educationalQualification}
            inputType="text"
            maxLength={10}
            titleStyle={AnalyaticsStyles.PleaseEnterDate}
          />
          <Spacing space={SH(15)} />
          <Text style={AnalyaticsStyles.PleaseEnterDate}>
            {t('Whether Migrated in last three years')}
          </Text>
          <RadioButton
            arrayData={selfHelpData}
            onChangeText={text => onChange(index, 'migratedInLast3Years', text)}
            value={data.migratedInLast3Years}
          />
          <Spacing space={SH(5)} />
          <Input
            title={t('Destination State')}
            placeholder={t('Destination State')}
            onChangeText={text => onChange(index, 'destinationState', text)}
            value={data.destinationState}
            inputType="text"
            maxLength={10}
            titleStyle={AnalyaticsStyles.PleaseEnterDate}
          />
          <Spacing space={SH(15)} />
          <Text style={AnalyaticsStyles.PleaseEnterDate}>
            {t('Nature/Sector of engagement at destination during migration?')}
          </Text>
          {renderCheckboxes2(index)}
          {/* <RadioButton
        arrayData={sectorData}
        onChangeText={text => onChange(index, 'SectorOfEngagementDuringMigration', text)}
        value={data.SectorOfEngagementDuringMigration}
      /> */}
          <Spacing space={SH(15)} />
          <Text style={AnalyaticsStyles.PleaseEnterDate}>
            {t('Period of migration')}
          </Text>
          <RadioButton
            arrayData={migrationData}
            onChangeText={text => onChange(index, 'periodOfMigration', text)}
            value={data.periodOfMigration}
          />
          <Spacing space={SH(5)} />
          <Input
            title={t(
              'What was the monthly remittance during migration(in Rs.)',
            )}
            placeholder={t(
              'What was the monthly remittance during migration(in Rs.)',
            )}
            onChangeText={text =>
              onChange(index, 'monthlyRemittanceDuringMigration', text)
            }
            value={data.monthlyRemittanceDuringMigration}
            inputType="numeric"
            maxLength={10}
            titleStyle={AnalyaticsStyles.PleaseEnterDate}
          />
          <Spacing space={SH(5)} />
          <Text style={AnalyaticsStyles.PleaseEnterDate}>
            {t('Whether interested for skill development under')}
          </Text>
          {renderCheckboxes(index)}
        </View>
      );
    };

    return (
      <View style={styles.card}>
        <FamilyMemberForm
          index={currentIndex}
          data={familyMembers[currentIndex]}
          onChange={handleMemberChange}
        />

        <View style={styles.buttonRow}>
          {/* Previous */}
          {currentIndex > 0 && (
            <Button
              title="Previous Member"
              onPress={() => setCurrentIndex(i => i - 1)}
              buttonStyle={{width: SH(130)}}
            />
          )}

          {/* Next */}
          {currentIndex < familyMembers.length - 1 && (
            <Button
              title="Next Member"
              onPress={() => setCurrentIndex(i => i + 1)}
              buttonStyle={{width: SH(130)}}
            />
          )}

          {/* Finish */}
          {/* {currentIndex === familyMembers.length - 1 && (
          <Button
            title="Finish"
            onPress={handleSubmitAllMembers}
          />
        )} */}
        </View>
      </View>
    );
  };

  const handleSubmitAllMembers = (index, key, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][key] = value;
    setFamilyMembers(updatedMembers);
  };
  //   const renderForm = () => {
  //     return familyMembers?.map((member, index) => (
  //       <FamilyMemberForm
  //         key={index}
  //         index={index}
  //         data={member}
  //         onChange={handleMemberChange}
  //       />
  //     ));
  //   };

  //   const renderForm = () => {
  // //   return familyMembers?.map((member, index) => (
  //     <View key={index} style={styles.card}>
  //       {/* <Text style={styles.title}>
  //         Family Member {index + 1}
  //       </Text> */}

  //       <FamilyMemberForm
  //       index={currentIndex}
  //         // index={index}
  //         data={familyMembers[currentIndex]}
  //         onChange={handleMemberChange}
  //       />
  //       {currentIndex<familyMembers.size() &&<Button
  //   title="Next"
  //   onPress={() => setCurrentIndex(i => i + 1)}
  // />}
  //     </View>
  // //   ));
  // };
  const renderCheckboxes = ind => {
    return checkboxes.map((checkbox, index) => (
      <CheckBox
        key={index}
        title={checkbox.label}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        // checked={checkbox.checked}
        checked={familyMembers[ind]?.interestInSkillDevelopment?.includes(
          checkbox.label,
        )||false}
        onPress={() => {
          handleCheckboxChange(index, ind);
          // Alert.alert('Checkbox Pressed', `Checkbox ${ind} pressed`);
        }}
      />
    ));
  };

  const renderCheckboxes2 = ind => {
    return checkboxes2.map((checkbox, index) => (
      <CheckBox
        key={index}
        title={checkbox.label}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        // checked={checkbox.checked}
        checked={familyMembers[ind]?.sectorOfEngagementDuringMigration?.includes(
          checkbox.label,
        )||false}
        onPress={() => {
          handleCheckboxChange2(index, ind);
        }}
      />
    ));
  };
  //   const handleCheckboxChange = (index, ind) => {
  //     const updatedCheckboxes = [...checkboxes];
  //         updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
  //         updatedCheckboxes[index].mainIndex = ind;
  //     setCheckboxes(updatedCheckboxes);
  //   };

  const handleCheckboxChange = (checkboxIndex, memberIndex) => {
    setFamilyMembers(prev => {
      const updated = [...prev];
      const skill = checkboxes[checkboxIndex].label;

      if (updated[memberIndex].interestInSkillDevelopment.includes(skill)) {
        updated[memberIndex].interestInSkillDevelopment = updated[
          memberIndex
        ].interestInSkillDevelopment.filter(s => s !== skill);
      } else {
        updated[memberIndex].interestInSkillDevelopment = skill;
      }

      return updated;
    });
    setCheckboxes(prev => {
      const updated = [...prev];
      updated[checkboxIndex].checked = !updated[checkboxIndex].checked;
      return updated;
    });
  };
  const handleCheckboxChange2 = (checkboxIndex, memberIndex) => {
    setFamilyMembers(prev => {
      const updated = [...prev];
      const skill = checkboxes2[checkboxIndex].label;

      if (
        updated[memberIndex].sectorOfEngagementDuringMigration.includes(skill)
      ) {
        updated[memberIndex].sectorOfEngagementDuringMigration = updated[
          memberIndex
        ].sectorOfEngagementDuringMigration.filter(s => s !== skill);
      } else {
        updated[memberIndex].sectorOfEngagementDuringMigration = skill;
      }

      return updated;
    });
    setCheckboxes2(prev => {
      const updated = [...prev];
      updated[checkboxIndex].checked = !updated[checkboxIndex].checked;
      // Alert.alert('Checkbox Pressed', `Checkbox ${JSON.stringify(updated)} pressedfff`);
      return updated;
    });
  };
  //Alert.alert('' + count);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={Style.setbgcolorgrsay}>
        <View style={Style.CenteredView}>
          <View style={Style.ModalView}>
            {/*iconVisible &&
                        <View style={Style.setroundcenter}>
                            <View style={[Style.checkiconright, { borderColor: Colors.theme_background }]}>
                                <VectorIcon icon="AntDesign" style={Style.setbackgroundicon} color={Colors.theme_background} name="check" size={45} />
                            </View>
                        </View>
                    */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={Style.ScrollViewStyles}>
              <KeyboardAvoidingView enabled>
                {/* <Spacing space={SH(40)} /> */}
                <View style={AnalyaticsStyles.MainView}>
                  <Text style={AnalyaticsStyles.TitleStyle}>
                    {t('Add family Member')}
                  </Text>

                  {renderForm()}

                  {/* <Text style={Style.settext}>{message}</Text> */}
                </View>
              </KeyboardAvoidingView>

              <View
                style={[
                  Style.buttonminview,
                  {...buttonminview, marginBottom: SH(100)},
                ]}>
                <View style={Style.setokbutton}>
                  <Button
                    title={buttonText}
                    onPress={() => {
                      onPress && onPress();
                    }}
                  />
                </View>
                {true ? (
                  <View style={Style.setokbutton}>
                    <Button
                      title={'Cancel'}
                      onPress={() => {
                        onPressCancel();
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

FamilyalertModal.defaultProps = {
  message: '',
  onPress: () => {},
  onPressCancel: () => {},
  buttonText: 'Ok',
  cancelButtonText: '',
};

FamilyalertModal.propTypes = {
  message: propTypes.string,
  onPress: propTypes.func,
  onPressCancel: propTypes.func,
  buttonText: propTypes.string,
  cancelButtonText: propTypes.string,
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

export default FamilyalertModal;
