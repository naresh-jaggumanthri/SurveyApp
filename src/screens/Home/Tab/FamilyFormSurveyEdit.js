import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {useIsFocused, useRoute, useTheme} from '@react-navigation/native';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import {Style, AnalyaticsStyle, HomeTabStyle} from '../../../styles';
import {useTranslation} from 'react-i18next';
import images from '../../../index';
import {
  Spacing,
  Input,
  DatePicker,
  VectorIcon,
  RadioButton,
  CheckBox,
  ImagePicker,
  ConfirmationAlert,
  DropDown,
  FamilyMemberAlert,
} from '../../../components';
import {Colors, SH, SF} from '../../../utils';
import {Image} from 'react-native-elements';
import {RouteName} from '../../../routes';
import {SW} from '../../../utils/dimensions';
import FamilyalertModal from '../../../components/commonComponents/FamilyMemberAlert';
import api from '../../../api';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {
  HouseHoldFormInitialValues,
  HouseHoldFormValidationSchema,
  HouseHoldValidationSchema,
} from './FamilyFormHelper';
import PubSub from 'pubsub-js';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import Loader from '../../../components/commonComponents/Loader';
import DeviceHelper from '../../../utils/DeviceHelper';
import {AppDataSource} from '../../../database/database';
import {HouseholdSurvey} from '../../../database/entities/HouseholdSurvey';
import {v4 as uuidv4} from 'uuid';
import { AppOkAlert } from '../../../utils/AlertHelper';

const FamilyFormSurveyEdit = props => {
  const {t} = useTranslation();
  const {navigation} = props;

  const stateArray = {
    name: '',
    emailId: '',
    mobileNumber: '',
    QuestionOne: '',
    about: '',
  };
  const [state, setState] = useState(stateArray);
  const [blocks, setBlocks] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  const [editData, setEditData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const formikRef = useRef(null);
  const route = useRoute();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const fiveRef = useRef();

  useLayoutEffect(() => {
    var token = PubSub.subscribe('HouseItem', mySubscriber);
    formikRef.current.resetForm({values: undefined});
  }, []);

  //  const {editData}=null;
  const [alertVisible, setAlertVisible] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [headOfTheHouseholdGender, setHeadOfTheHouseholdGender] = useState('');
  const [isWomenInSHG, setIsWomenInSHG] = useState(null);
  const [isWomenInSubhadraYojana, setIsWomenInSubhadraYojana] = useState(null);

  const [hasRationCard, setHasRationCard] = useState(null);
  const [drinkingWaterSource, setDrinkingWaterSource] = useState('');
  const [isLpgConnectionUnderUjjwala, setIsLpgConnectionUnderUjjwala] =
    useState(null);
  const [havingLabourCards, setHavingLabourCards] = useState(null);
  const [isCoveredUnderNSKY, setIsCoveredUnderNSKY] = useState(null);
  const [
    isFamilyInvolvedInWeavingOrHandloom,
    setIsFamilyInvolvedInWeavingOrHandloom,
  ] = useState(null);
  const [
    isFamilyCoveredUnderPOHI_LoomsScheme,
    setIsFamilyCoveredUnderPOHI_LoomsScheme,
  ] = useState(null);
  const [fraClaimantStatus, setFraClaimantStatus] = useState('');
  const [ownsHomesteadPattaLand, setOwnsHomesteadPattaLand] = useState('');
  const [approximatePrivateLandHolding, setApproximatePrivateLandHolding] =
    useState('');
  const [isIrrigationFacilityAvailable, setIsIrrigationFacilityAvailable] =
    useState(null);
  const [sourcesOfIrrigation, setSourcesOfIrrigation] = useState([]);
  const [involvedInLivestockActivity, setInvolvedInLivestockActivity] =
    useState(null);
  const [kishanSchemeCoverage, setKishanSchemeCoverage] = useState('');
  const [isCoveredUnderPMSBY, setIsCoveredUnderPMSBY] = useState(null);
  const [isCoveredUnderPMJJBY, setIsCoveredUnderPMJJBY] = useState(null);
  const [hasJanDhanYojanaAccount, setHasJanDhanYojanaAccount] = useState(null);
  const [
    isEnrolledUnderShramYogiMaandhan,
    setIsEnrolledUnderShramYogiMaandhan,
  ] = useState(null);
  const [isCoveredUnderAyushmanBharat, setIsCoveredUnderAyushmanBharat] =
    useState(null);
  const [hasElectricityConnection, setHasElectricityConnection] =
    useState(null);
  const [hasIndividualHouseholdLatrine, setHasIndividualHouseholdLatrine] =
    useState(null);
  const [hasMGNREGSJobCard, setHasMGNREGSJobCard] = useState(null);
  const [hasRuralHousingSchemeHouse, setHasRuralHousingSchemeHouse] =
    useState(null);
  const [
    hasFamilyMemberMigratedLast3Years,
    setHasFamilyMemberMigratedLast3Years,
  ] = useState(null);
  const [
    takenAdvanceForMigrationFromMiddleman,
    setTakenAdvanceForMigrationFromMiddleman,
  ] = useState(null);
  const [
    minorChildrenAccompaniedMigration,
    setMinorChildrenAccompaniedMigration,
  ] = useState(null);
  const [womenMembersMigrated, setWomenMembersMigrated] = useState(null);
  const [respondentIdentity, setRespondentIdentity] = useState('');
  const [bankList, setBankList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState(false);
  const [imgpathselect, SetImgpathselect] = useState('');
  // Your state and other variables...
  const [familyAlertVisible, setFamilyAlertVisible] = useState(false);

   const [isOldAgePension, setIsOldAgePension] = useState(null);
   const [isWidowPension, setIsWidowPension] = useState(null);
   const [isAtalPensionYojana,setIsAtalPensionYojana]=useState(null);
   const [isDisabilityPension, setIsDisabilityPension] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMemberCount, setFamilyMemberCount] = useState(0);
  const [selectedSchemes, setSelectedSchemes] =
      useState(null);
      
           const [involvedWaterSource, setInvolvedWaterSource] =
          useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && editData == undefined) {
      // Alert.alert("HIII",JSON.stringify(editData));
    }
  }, [isFocused]);

  const dropDownData = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const socialCatData = [
    {label: 'ST', value: 'ST'},
    {label: 'SC', value: 'SC'},
    {label: 'OBC', value: 'OBC'},
    {label: 'General', value: 'General'},
    {label: 'PVTGS', value: 'PVTGS'},
  ];

  const maritalStatusData = [
    {label: 'Married', value: 'Married'},
    {label: 'Never married', value: 'Never married'},
    {label: 'Widow', value: 'Widow'},
    {label: 'Other', value: 'Other'},
  ];

  const headRelationData = [
    {label: 'Spouse', value: 'Spouse'},
    {label: 'Son', value: 'Son'},
    {label: 'Daughter', value: 'Daughter'},
    {label: 'Daughter-in-law', value: 'Daughter-In-Law'},
    {label: 'Sister', value: 'Sister'},
    {label: 'Mother', value: 'Mother'},
    {label: 'Self', value: 'Self'},
  ];
 const selfHelpData2 = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
    // {label: t('Recently'), value: false},
    // {label: t('Within the last year'), value: false},
    // {label: t('Earlier'), value: false},
  
  ];
  const occupationDropDownData = [
    {label: 'Agriculture', value: 'Agriculture'},
    {label: 'Daily Wage Labour', value: 'Daily Wage Labour'},
    {label: 'Self employed', value: 'Self employed'},
    {label: 'Govt./Private Service', value: 'Govt./Private Service'},
    {label: 'Other User entry', value: 'Other User entry'},
  ];
  const arrayData = [
    {label: t('Survey_Title_21'), value: 'option1'},
    {label: t('Survey_Title_22'), value: 'option2'},
    {label: t('Survey_Title_23'), value: 'option3'},
  ];
  const selfHelpData = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
  ];
  const fraHelpData = [
    {label: t('FRA Claimant'), value: t('FRA Claimant')},
    {label: t('Not a FRA Claimant'), value: t('Not a FRA Claimant')},
  ];
  const privateLandData = [
    {label: t('Landless'), value: 'Landless'},
    {label: t('0-0.5Acr'), value: '0- 0.5 Acr'},
    {label: t('0.5-1Acr'), value: '0.5- 1 Acr'},
    {label: t('1-2.5Acr'), value: '1 - 2.5 Acr'},
    {label: t('more than 2.5Acr'), value: 'more than 2.5 Acr'},
  ];
  const waterSourceData = [
    {label: t('Well'), value: t('Well')},
    {label: t('Tube Well'), value: t('Tube Well')},
    {label: t('Piped Water Supply'), value: t('Piped Water Supply')},
    {label: t('Others'), value: t('Others')},
  ];
  const schemeData = [
    {label: t('PM Kishan'), value: t('PM Kishan')},
    {label: t('CM Kishan'), value: t('CM Kishan')},
    {label: t('Both'), value: t('Both')},
  ];
 const genderData = [
    {label: t('mMale'), value: t('mMale')},
    {label: t('fFemale'), value: t('fFemale')},
    {label: t('Others'), value: t('Others')},
  ];

  const respondantData = [
    {label: t('Migrant Person himself'), value: t('Migrant Person himself')},
    {
      label: t('Other Adult family member'),
      value: t('Other Adult family member'),
    },
    {
      label: t('Village Head/Ward Member'),
      value: t('Village Head/Ward Member'),
    },
    {label: t('Neighbour'), value: t('Neighbour')},
    {label: t('Head of the household'), value: t('Head of the household')},
  ];

  const [checkboxes, setCheckboxes] = useState([
    {label: t('Survey_Title_24'), checked: false},
    {label: t('Survey_Title_25'), checked: false},
    {label: t('Survey_Title_26'), checked: false},
    {label: t('Survey_Title_27'), checked: false},
    {label: t('Survey_Title_28'), checked: false},

    // Add more options as needed
  ]);
  const [checkboxes2, setCheckboxes2] = useState([
    {label: t('Major'), checked: false},
    {label: t('Minor'), checked: false},
    {label: t('Medium'), checked: false},
    {label: t('Lift Irrigation'), checked: false},
    {label: t('Check dam'), checked: false},
    {label: t('Canal'), checked: false},
    {label: t('Bore Well'), checked: false},
    {label: t('Dug Well'), checked: false},
    {label: t('Farm pond'), checked: false},
    {label: t('Others'), checked: false},

    // Add more options as needed
  ]);
  const [checkboxes3, setCheckboxes3] = useState([
    {label: t('Poultry'), checked: false},
    {label: t('Goatery'), checked: false},
    {label: t('Dairy'), checked: false},
    {label: t('Others'), checked: false},

    // Add more options as needed
  ]);
  const {loginData} = useSelector(state => state.DataReducer) || {};
  const [dateSelectLocal, setDateSelectLocal] = useState(
    moment(new Date(), 'YYYY-MM-DDTHH:mm:ss Z')
      .local()
      .format('DD-MM-YYYY HH:mm'),
  );

  var mySubscriber = function (msg, data) {
    // console.log(msg, data);
     //Alert.alert("Data",JSON.stringify(data?.item?.householdFamilyMember.length));
    setFamilyMemberCount(data?.item?.householdFamilyMember?.length ?? 0);
    const members = data?.item?.householdFamilyMember;
    setFamilyMembers(members);
    setEditData(data);
    if (data && formikRef.current) {
      formikRef.current.resetForm({
        values: {
          ...HouseHoldFormInitialValues(props),
          ...data.item,
          householdBasicProfile: {
            ...HouseHoldFormInitialValues(props).householdBasicProfile,
            ...data?.item?.householdBasicProfile,
            totalFamilyMembers: data?.item?.householdFamilyMember?.length ?? 0,
          },
        },
      });
      // formikRef.current.resetForm({
      //   values: {
      //     ...HouseHoldFormInitialValues(props),
      //     ...data.item,

      //   },
      // });
      const result = data?.item;
    }
  };

  useEffect(() => {
    getLocation();
    // Alert.alert("hi");
    getMasterState();
    getBankList();
  }, []);
  //  useEffect(() => {
  //   if (editData && formikRef.current) {
  //     formikRef.current.resetForm({
  //       values: {
  //         ...HouseHoldFormInitialValues(props),
  //         ...editData,
  //       }

  //     });
  //   }
  // });
  const handleCheckboxChange = index => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    setCheckboxes(updatedCheckboxes);
  };
  const handleCheckboxChange2 = index => {
    const updatedCheckboxes = [...checkboxes2];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    let result = updatedCheckboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.label);
    setSourcesOfIrrigation(result);
    //Alert.alert("updatedCheckboxes",JSON.stringify(result));
    setCheckboxes2(updatedCheckboxes);
  };
  const handleCheckboxChange3 = index => {
    const updatedCheckboxes = [...checkboxes3];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    let result = updatedCheckboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.label);
    setInvolvedInLivestockActivity(result);
    //  Alert.alert("updatedCheckboxes",JSON.stringify(result));
    setCheckboxes3(updatedCheckboxes);
  };
    const handleCheckboxChange4 = index => {
    const updatedCheckboxes = [...checkboxes4];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    let result = updatedCheckboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.label);
    setInvolvedWaterSource(result);
    //  Alert.alert("updatedCheckboxes",JSON.stringify(result));
    setCheckboxes4(updatedCheckboxes);
  };
  const handleCheckboxChange5 = index => {
    const updatedCheckboxes = [...checkboxes5];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    let result = updatedCheckboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.label);
    setSelectedSchemes(result);
    //  Alert.alert("updatedCheckboxes",JSON.stringify(result));
    setCheckboxes5(updatedCheckboxes);
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
        onPress={() => handleCheckboxChange2(index)}
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
        onPress={() => handleCheckboxChange3(index)}
      />
    ));
  };
  const [checkboxes4, setCheckboxes4] = useState([
    {label: t('Well'), checked: false},
    {label: t('Tube Well'), checked: false},
    {label: t('Piped Water Supply'), checked: false},
    {label: t('Others'), checked: false},

    // Add more options as needed
  ]);
  const [checkboxes5, setCheckboxes5] = useState([
    {label: t('PM Kishan'), checked: false},
    {label: t('CM Kishan'), checked: false},
    {label: t('Both'), checked: false},
    {label: t('None'), checked: false},

    // Add more options as needed
  ]);
  const renderCheckboxes4 = () => {
    return checkboxes4.map((checkbox, index) => (
      <CheckBox
        key={index}
        title={checkbox.label}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checked={checkbox.checked}
        onPress={() => handleCheckboxChange4(index)}
      />
    ));
  };
  const renderCheckboxes5 = () => {
    return checkboxes5.map((checkbox, index) => (
      <CheckBox
        key={index}
        title={checkbox.label}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checked={checkbox.checked}
        onPress={() => handleCheckboxChange5(index)}
      />
    ));
  };
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [data, setData] = useState([
    {
      id: '1',
      image: images.Food_1_Image,
      text: 'Survey_Title_29',
      checked: false,
    },
    {
      id: '2',
      image: images.Food_4_Image,
      text: 'Survey_Title_30',
      checked: false,
    },
    {
      id: '3',
      image: images.Food_3_Image,
      text: 'Survey_Title_31',
      checked: false,
    },
    {
      id: '4',
      image: images.Food_2_Image,
      text: 'Survey_Title_32',
      checked: false,
    },
  ]);

  const toggleCheckboxs = id => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };

  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question number

  const handleAddFamilyMember = () => {
    // Alert.alert("inn");
    setFamilyAlertVisible(true);
  };

  const getMasterState = async () => {
    let token = loginData?.token;

    const res = await api.master.getDistricts(token);

    const result = res.map(m => {
      return {
        label: m.districtName,
        value: m.districtCode,
      };
    });
    setDistrict(result);
  };

  const getBlocks = async districtId => {
    let token = loginData?.token;
    const res = await api.master.getBlocksByDistrictId(districtId, token);
    const result = res.map(m => {
      return {
        label: m.blockName,
        value: m.blockCode,
      };
    });
    // Alert.alert("Blocks",JSON.stringify(result));
    setBlocks(result);
  };
  const getPanchayats = async blockId => {
    let token = loginData?.token;
    const res = await api.master.getGramPanchayats(blockId, token);

    const result = res.map(m => {
      return {
        label: m.panchayatName,
        value: m.panchayatCode,
        blockId: m.blockCode,
      };
    });

    setPanchayats(result);
  };
  const getVillages = async panchayatId => {
    let token = loginData?.token;
    const res = await api.master.getVillagesByPanchayatId(panchayatId, token);
    const result = res.map(m => {
      return {
        label: m.villageName,
        value: m.villageCode,
        panchayatId: m.panchayatCode,
      };
    });
    //Alert.alert("Villages",JSON.stringify(result));
    setVillages(result);
  };
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

  const getBankList = async () => {
    let token = loginData?.token;
    const res = await api.master.getBanks(token);
    const result = res.map(m => {
      return {
        label: m.bankName,
        value: m.id,
      };
    });
    setBankList(result);
  };
  var alertdata = {
    logout: t('Survey_Title_33'),
  };
  const onoknutton = () => {
    // Alert.alert("Analytics Screen",JSON.stringify(familyMembers));
    // navigation.navigate(RouteName.ANALYTICS_SCREEN);
  };
  const Onpressfunction = e => {
    navigation.toggleDrawer();
    navigation.navigate(e);
  };
  const {Colors} = useTheme();
  const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  const [backgroundColors, setBackgroundColors] = useState(
    Array(5).fill(Colors.light_gray_text_color),
  ); // Initial background colors for 4 views

  const saveSurveyOffline = async (values, imagePath) => {
    const repo = AppDataSource.getRepository(HouseholdSurvey);

    const survey = repo.create({
      localId: uuidv4(),
      householdId: values.householdBasicProfile.id || null,
      surveyJson: JSON.stringify(values),
      imagePath,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    });

    await repo.save(survey);
  };
  const onSavePress = async values => {
    setLoading(true);
    const token = loginData?.token;
    let isConnected = await DeviceHelper.isConnectedToInternet();
    if (!isConnected) {
      // Save to local database
      const localId = uuidv4();
      await saveSurveyOffline(values, imageData.uri);
      setLoading(false);
      setAlertVisible(true);
      setAlertMessage(
        t('Survey_Submit_Successfully') + ' with Local Id :' + localId,
      );
      return;
    }
    // const response = await api.user.saveHouseholdSurveyData(
    //   null,
    //   values,
    //   token,
    //   false
    // );
    const response = await api.user.postHouseholdSurveyDataFilesUpload(
      values,
      null,
      token,
    );

    // Alert.alert("response",JSON.stringify(response));
    // return
    // if (response.uniqueId != null && response.uniqueId != undefined) {
    if (response && response.success) {
      setLoading(false);
      setAlertVisible(true);
      // setAlertMessage(t('Survey_Submit_Successfully'));
      setAlertMessage(response.message + ' with Id :' + response.uniqueId);
    } else {
      setLoading(false);
      setAlertVisible(true);
      setAlertMessage(t('Something_Went_Wrong_Please_Try_Again_Later'));
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        try {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              console.log(latitude, longitude);
              setLocation(position);
            },
            error => {
              console.log(error.message);
            },
            {
              enableHighAccuracy: false,
              timeout: 30000,
              maximumAge: 10000,
            },
          );
          // Geolocation.getCurrentPosition(
          //   position => {
          //     console.log(position);
          //     setLocation(position);
          //   },
          //   error => {
          //     // See error code charts below.
          //     console.log(error.code, error.message);
          //     setLocation(false);
          //   },
          //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          // );
        } catch (e) {}
      }
    });
    console.log(location);
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  //  PubSub.unsubscribe(token);
  const handleMemberChange = (index, key, value) => {
  //   if (key === 'name' && value.trim().length < 3) {
  //   AppOkAlert(t('Name_must_be_at_least_3_characters_long'),() => {});
  //     return; // prevent update
  // }
   setFamilyMembers(prevMembers =>
      prevMembers.map((member, i) =>
        i === index
          ? { ...member, [key]: value }
          : member
      )
    );
  setTimeout(() => {
    // if (key === 'name' && value.trim().length < 3) {
    //   AppOkAlert(t('Name_must_be_at_least_3_characters_long'), () => {});
    //   return; // prevent update
    // }
    
  }, 3000);
   
  };
  return (
    <View style={Style.BgColorWhiteAll}>
      <Spacing space={SH(10)} />
      <View style={AnalyaticsStyles.FlexViewBack}>
        {backgroundColors.map((color, index) => (
          <View
            key={index}
            style={[
              AnalyaticsStyles.BackgroundView,
              {
                backgroundColor:
                  index === currentQuestion - 1
                    ? Colors.theme_background
                    : color,
              },
            ]}
          />
        ))}
      </View>

      {/* First question start */}
      {/* <Text style={AnalyaticsStyles.TitleStyle}>{t("Basic Details")}</Text> */}
      <Formik
        innerRef={formikRef}
        initialValues={HouseHoldFormInitialValues(props, loginData)}
        validationSchema={HouseHoldFormValidationSchema(props)}
        onSubmit={values => {
          let finalFamilyMembers = familyMembers.map(m => {
            return {
              ...m,
              age: parseInt(m.age),
              monthlyRemittanceDuringMigration: parseInt(
                m.monthlyRemittanceDuringMigration,
              ),
            };
          });

          const finalValues = {
            ...values,
            householdFamilyMember: finalFamilyMembers,
          };

          const formData = new FormData();
          // formData.append('respondentPhoto', {
          //   uri: imageData.uri,
          //   type: imageData.type || 'image/jpeg',
          //   name: imageData.fileName || 'upload.jpg',
          // });
          //formData.append("householdJson",JSON.stringify(finalValues));
          //     const samplePayload={
          // "householdBasicProfile": {
          // "district": "Cuttack",
          // "block": "Banki",
          // "gramPanchayat": "Kalapathar",
          // "revenueVillage": "Nuagaon",
          // "hamlet": "Ward-3",
          // "headOfTheHouseholdNameAsPerAadhar": "Ramesh Chandra Sahu",
          // "headOfTheHouseholdGender": "Male",
          // "aadharNo": "123456789012",
          // "socialCategory": "OBC",
          // "bankAccountNumber": "12345678901",
          // "bankName": "State Bank of India",
          // "ifscCodeOrBranch": "SBIN0001234",
          // "womenMemberName": "Sita Sahu",
          // "womenMemberAge": 32,
          // "womenMemberMaritalStatus": "Married",
          // "womenMemberRelationshipWithHead": "Spouse",
          // "isWomenCoveredUnderSHG": true,
          // "isWomenCoveredUnderSubhadraYojana": false,
          // "totalFamilyMembers": 4,
          // "hasRationCard": true,
          // "rationCardNumber": "RC123456789",
          // "drinkingWaterSource": "Well",
          // "hasUjjwalaLPGConnection": true,
          // "hasLabourCard": true,
          // "isCoveredUnderNSKY": false,
          // "geoLocation": "20.4625,85.8828",
          // "entryBy": "Surveyor01"
          // },
          // "householdEntitlement": {
          // "kishanSchemeCoverage": "PM KishaN",
          // "hasRuralHousingSchemeHouse": true,
          // "hasIndividualHouseholdLatrine": true,
          // "hasElectricityConnection": true,
          // "hasMGNREGSJobCard": true,
          // "fullJobCardNumber": "OD-12-345-678",
          // "hasJanDhanYojanaAccount": true,
          // "isCoveredUnderAyushmanBharat": true,
          // "isEnrolledUnderShramYogiMaandhan": false,
          // "isCoveredUnderPMJJBY": true,
          // "isCoveredUnderPMSBY": true
          // },
          // "householdMigrationStatus": {
          // "hasFamilyMemberMigratedLast3Years": true,
          // "takenAdvanceForMigrationFromMiddleman": false,
          // "minorChildrenAccompaniedMigration": false,
          // "womenMembersMigrated": false,
          // "familyContactMobileNo": "9876543210",
          // "respondentIdentity": "Migrant Person himself",
          // "respondentPhotoPathOrUrl": "https://example.com/photos/respondent.jpg"
          // },
          // "householdOccupationAndLand": {
          // "primaryOccupationOfTheFamily": "Agriculture",
          // "otherPrimaryOccupationDetails": null,
          // "isFamilyInvolvedInWeavingOrHandloom": false,
          // "isFamilyCoveredUnderPOHI_LoomsScheme": false,
          // "fraClaimantStatus": "FRA Claimant",
          // "fra_LandAmountInAcres": 1.75,
          // "ownsHomesteadPattaLand": true,
          // "approximatePrivateLandHolding": "0- 0.5 Acr",
          // "isIrrigationFacilityAvailable": true,
          // "sourcesOfIrrigation": "Canal, Borewell",
          // "involvedInLivestockActivity": "Poultry,Goatery"
          // },
          // "householdFamilyMember": [
          // {
          // "name": "Ramesh Chandra Sahu",
          // "age": 38,
          // "gender": "Male",
          // "educationalQualification": "10th Pass",
          // "migratedInLast3Years": false,
          // "DestinationState":"Odisha",
          // "SectorOfEngagementDuringMigration":"Brick Kiln",
          // "monthlyRemittanceDuringMigration": 0,
          // "interestInSkillDevelopment": "None",
          // "periodOfMigration": "1-3 months"
          // },
          // {
          // "name": "Sita Sahu",
          // "age": 32,
          // "gender": "Female",
          // "educationalQualification": "10th Pass",
          // "migratedInLast3Years": true,
          // "destinationState": "Odisha",
          // "sectorOfEngagementDuringMigration": "Brick Kiln",
          // "periodOfMigration": "1-3 months",
          // "monthlyRemittanceDuringMigration": 8000,
          // "interestInSkillDevelopment": "DDUGKY"
          // }
          // ]

          //     };
          formData.append('householdJson', JSON.stringify(finalValues));
          //  Alert.alert("hell",JSON.stringify(formData));
          console.log('hello>>>', JSON.stringify(formData));
          //  return;

          //  Alert.alert("hell",JSON.stringify(formData));
          //return;

          onSavePress(formData);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          setValues,
        }) => (
          <>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={Style.ScrollViewStyles}>
              <KeyboardAvoidingView enabled>
                <Spacing space={SH(10)} />
                <View style={AnalyaticsStyles.MainView}>
                  {currentQuestion === 1 && (
                    <View>
                      {/* District */}
                      <Text ref={oneRef} style={AnalyaticsStyles.TitleStyle}>
                        {t('Basic Details')}
                      </Text>
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        1. {t('District')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={districts}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.district}
                        placeholder={
                          values?.householdBasicProfile?.district ||
                          t('Select District')
                        }
                        onChange={obj => {
                          // Alert.alert("hellll",JSON.stringify(label));
                          getBlocks(obj.value);
                          setFieldValue(
                            'householdBasicProfile.district',
                            obj.label,
                          );
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.district}
                      </Text>
                      <Spacing space={SH(15)} />
                      {/* Block */}
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        2. {t('Block')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={blocks}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.block}
                        placeholder={
                          values?.householdBasicProfile?.block ||
                          t('Select Block')
                        }
                        onChange={obj => {
                          getPanchayats(obj.value);
                          setFieldValue(
                            'householdBasicProfile.block',
                            obj.label,
                          );
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.block}
                      </Text>
                      <Spacing space={SH(15)} />
                      {/* Gram Panchayat */}
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        3. {t('Gram Panchayat')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={panchayats}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.gramPanchayat}
                        placeholder={
                          values?.householdBasicProfile?.gramPanchayat ||
                          t('Select Gram Panchayat')
                        }
                        onChange={obj => {
                          getVillages(obj.value);
                          setFieldValue(
                            'householdBasicProfile.gramPanchayat',
                            obj.label,
                          );
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.gramPanchayat}
                      </Text>
                      <Spacing space={SH(15)} />
                      {/* Revenue Village */}
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        4. {t('Revenue Village')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={villages}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.revenueVillage}
                        placeholder={
                          values?.householdBasicProfile?.revenueVillage ||
                          t('Select Revenue Village')
                        }
                        onChange={obj => {
                          setFieldValue(
                            'householdBasicProfile.revenueVillage',
                            obj.label,
                          );
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.revenueVillage}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={'5. ' + t('Hamlet')}
                        placeholder={t('Hamlet')}
                        onChangeText={text => {
                          const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                          setFieldValue(
                            'householdBasicProfile.hamlet',
                            filteredText,
                          );
                        }}
                        value={values?.householdBasicProfile?.hamlet}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        maxLength={200}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.hamlet}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={'6. ' + t('Nearest Landmark')}
                        placeholder={t('Nearest Landmark')}
                        onChangeText={text => {
                          const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                          setFieldValue(
                            'householdBasicProfile.nearestLandmark',
                            filteredText,
                          );
                        }}
                        value={values?.householdBasicProfile?.nearestLandmark}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        maxLength={200}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.nearestLandmark}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={
                          '7. ' +
                          t(
                            'Name of Head of the Household as per Aadhar Card ?',
                          )
                        }
                        placeholder={t(
                          'Name of Head of the Household as per Aadhar Card ?',
                        )}
                        onChangeText={text => {
                          const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                          setFieldValue(
                            'householdBasicProfile.headOfTheHouseholdNameAsPerAadhar',
                            filteredText,
                          );
                        }}
                        value={
                          values?.householdBasicProfile
                            ?.headOfTheHouseholdNameAsPerAadhar
                        }
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        maxLength={200}
                      />
                      <Text style={{color: 'red'}}>
                        {
                          errors?.householdBasicProfile
                            ?.headOfTheHouseholdNameAsPerAadhar
                        }
                      </Text>
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
                      <Input
                        title={'8. ' + t('AADHAR No.')}
                        placeholder={t('AADHAR No.')}
                        onChangeText={text =>
                          setFieldValue('householdBasicProfile.aadharNo', text)
                        }
                        value={values?.householdBasicProfile?.aadharNo}
                        inputType="numeric"
                        maxLength={12}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.aadharNo}
                      </Text>

                      <Spacing space={SH(15)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        9. {t('Gender (Head of the Household)')}
                      </Text>
                      <RadioButton
                        arrayData={genderData}
                        onChangeText={text => {
                          // Alert.alert("text",JSON.stringify(text));
                          setFieldValue(
                            'householdBasicProfile.headOfTheHouseholdGender',
                            text,
                          );
                          setHeadOfTheHouseholdGender(text);
                        }}
                        value={
                          editData != undefined
                            ? values.householdBasicProfile
                                .headOfTheHouseholdGender
                            : headOfTheHouseholdGender
                        }
                        //value={"Male"}
                      />
                      <Text style={{color: 'red'}}>
                        {
                          errors?.householdBasicProfile
                            ?.headOfTheHouseholdGender
                        }
                      </Text>

                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        10. {t('Social Category')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={socialCatData}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.socialCategory}
                        placeholder={
                          values?.householdBasicProfile?.socialCategory ||
                          t('Select Social Category')
                        }
                        onChange={obj => {
                          setFieldValue(
                            'householdBasicProfile.socialCategory',
                            obj.label,
                          );
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.socialCategory}
                      </Text>
                    </View>
                  )}
                  {/* Two question start */}
                  {currentQuestion === 2 && (
                    <View>
                      <Text refs={twoRef} style={AnalyaticsStyles.TitleStyle}>
                        {t('Bank Account Details of Head of Household')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        11. {t('Bank Name')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <DropDown
                        data={bankList}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        value={values?.householdBasicProfile?.bankName}
                        placeholder={
                          values?.householdBasicProfile?.bankName ||
                          t('Select Bank Name')
                        }
                        onChange={obj => {
                          setFieldValue(
                            'householdBasicProfile.bankName',
                            obj.label,
                          );
                        }}
                      />

                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.bankName}
                      </Text>

                      <Spacing space={SH(15)} />
                      <Input
                        title={'12. ' + t('Bank Account No')}
                        placeholder={t('Bank Account No')}
                        onChangeText={text =>
                          setFieldValue(
                            'householdBasicProfile.bankAccountNumber',
                            text,
                          )
                        }
                        value={values?.householdBasicProfile?.bankAccountNumber}
                        inputType="numeric"
                        maxLength={12}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.bankAccountNumber}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={
                          '13. ' + t('IFSC code / Branch') + ' eg. SBIN0001234'
                        }
                        placeholder={t('IFSC code / Branch')}
                        maxLength={11}
                        autoCapitalize="characters"
                        onChangeText={text => {
                          const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

                          if (ifscRegex.test(text)) {
                            // console.log('Valid IFSC');
                            setFieldValue(
                              'householdBasicProfile.ifscCodeOrBranch',
                              text,
                            );
                          } else {
                            setFieldValue(
                              'householdBasicProfile.ifscCodeOrBranch',
                              text,
                            );
                            console.log('Invalid IFSC');
                          }
                          // const formattedText = text
                          //   .toUpperCase()
                          //   .replace(/^[A-Z]{4}0[A-Z0-9]{6}$/, ''); // ❌ removes special chars
                        }}
                        value={values?.householdBasicProfile?.ifscCodeOrBranch}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.ifscCodeOrBranch}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={'14. ' + t('Total Number of Family Members')}
                        placeholder={t('Total Number of Family Members')}
                          onChangeText={text => {
                         

                          // Allow only numbers
    const numericText = text.replace(/[^0-9]/g, '');

    // Convert to number

    const age = parseInt(numericText==''?'0':numericText, 10);

    // Optional: Age range validation (1–120)
    if (!numericText) {
      setFieldValue('householdBasicProfile.totalFamilyMembers', '');
    } else if (age >= 1 && age <= 15) {
      setFieldValue('householdBasicProfile.totalFamilyMembers', age);
    }
      try {
                            setFamilyMemberCount(age);
                          } catch (e) {}
                         
                          // setFieldValue(
                          //   'householdBasicProfile.totalFamilyMembers',
                          //   text,
                          // );
                        }}
                        value={familyMemberCount.toString() || values?.householdBasicProfile?.totalFamilyMembers || ''}
                        inputType="numeric"
                        maxLength={3}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />

                      {familyMemberCount > 0 && (
                        <TouchableOpacity
                          style={AnalyaticsStyles.addButton}
                          onPress={handleAddFamilyMember}>
                          <Text style={AnalyaticsStyles.PreviousTextStyle}>
                            {t('Add Member')}
                          </Text>
                        </TouchableOpacity>
                      )}
                      <Text style={{color: 'red'}}>
                        {errors?.householdBasicProfile?.totalFamilyMembers}
                      </Text>
                      {/* <Spacing space={SH(5)} />
                                      <Input
                                        title={'13. '+t('Name of the women member of the Household?')}
                                        placeholder={t(
                                          'Name of the women member of the Household?',
                                        )}
                                        onChangeText={(text) =>{
                                          //  const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                                           const filteredText = text.replace(/[^a-zA-Z.]/g, '');
                                          setFieldValue(
                                            'householdBasicProfile.womenMemberName',
                                            filteredText,
                                          );
                                        }}
                                        value={values?.householdBasicProfile?.womenMemberName}
                                        // inputType="numeric"
                                        maxLength={10}
                                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                      />
                                      <Text style={{color: 'red'}}>
                                        {errors?.householdBasicProfile?.womenMemberName}
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <Input
                  title={'14. '+t('Age of Women Member as per AADHAR?')}
                  placeholder={t('Age of Women Member as per AADHAR?')}
                  // keyboardType="numberic"
                   inputType="numeric"
                  maxLength={3} // age never > 3 digits
                  onChangeText={text => {
                  //  if (text.length ==0) {
                  // Allow only numbers
                  try{
                  const numericText = text.replace(/[^0-9]/g,'');
                
                  // If empty after cleaning
                  
                
                  const age = parseInt(text, 10);
                
                  // Age validation (16–75)
                  if (age >= 12 && age <= 18) {
                    setFieldValue('householdBasicProfile.womenMemberAge', age);
                  }
                
                  if (!numericText) {
                    setFieldValue('householdBasicProfile.womenMemberAge', '');
                    return;
                  }
                }catch(e){}
                // }
                  }}
                  value={
                   values?.householdBasicProfile?.womenMemberAge
                  }
                  titleStyle={AnalyaticsStyles.PleaseEnterDate}
                />
                                      <Text style={{color: 'red'}}>
                                        {errors?.householdBasicProfile?.womenMemberAge}
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                        15. {t('Marital Status of the Women Member ?')}
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <DropDown
                                        data={maritalStatusData}
                                        dropdownStyle={{marginLeft: SH(10)}}
                                        width={SW(345)}
                                        labelField="label"
                                        valueField="value"
                                        value={
                                          values?.householdBasicProfile
                                            ?.womenMemberMaritalStatus
                                        }
                                        placeholder={
                                          values?.householdBasicProfile
                                            ?.womenMemberMaritalStatus ||
                                          t('Select Marital Status')
                                        }
                                        onChange={obj => {
                                          setFieldValue(
                                            'householdBasicProfile.womenMemberMaritalStatus',
                                            obj.value,
                                          );
                                        }}
                                      />
                                      <Text style={{color: 'red'}}>
                                        {
                                          errors?.householdBasicProfile
                                            ?.womenMemberMaritalStatus
                                        }
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                        16. {t('Relationship with the Head of the Household')}
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <DropDown
                                        data={headRelationData}
                                        dropdownStyle={{marginLeft: SH(10)}}
                                        width={SW(345)}
                                        labelField="label"
                                        valueField="value"
                                        value={
                                          values?.householdBasicProfile
                                            ?.womenMemberRelationshipWithHead
                                        }
                                        placeholder={
                                          values?.householdBasicProfile
                                            ?.womenMemberRelationshipWithHead ||
                                          t('Select Relationship')
                                        }
                                        onChange={obj => {
                                          setFieldValue(
                                            'householdBasicProfile.womenMemberRelationshipWithHead',
                                            obj.value,
                                          );
                                        }}
                                      />
                                      <Text style={{color: 'red'}}>
                                        {
                                          errors?.householdBasicProfile
                                            ?.womenMemberRelationshipWithHead
                                        }
                                      </Text> */}
                    </View>
                  )}
                    {currentQuestion === 3 && (
                                      <View>
                                         <Text  refs={threeRef} style={AnalyaticsStyles.TitleStyle}>
                                          {t('Social Protection')}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          15. {t(
                                            'Is any Women of the Family covered under Self Help Group(SHG)',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={obj => {
                                            // Alert.alert("obj",JSON.stringify(obj));
                                            setIsWomenInSHG(obj);
                                            setFieldValue(
                                              'householdBasicProfile.isWomenCoveredUnderSHG',
                                              obj,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values?.householdBasicProfile
                                                  ?.isWomenCoveredUnderSHG
                                              : isWomenInSHG
                                          }
                                        />
                                        <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.isWomenCoveredUnderSHG}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          16. {t(
                                            'Whether the women  member of the family covered under Subhadra Yojana',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdBasicProfile.isWomenCoveredUnderSubhadraYojana',
                                              text,
                                            );
                                            setIsWomenInSubhadraYojana(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdBasicProfile
                                                  .isWomenCoveredUnderSubhadraYojana
                                              : isWomenInSubhadraYojana
                                          }
                                        />
                                        <Text style={{color: 'red'}}>
                                          {
                                            errors?.householdBasicProfile
                                              ?.isWomenCoveredUnderSubhadraYojana
                                          }
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          17. {t('Whether the household have Ration Card?')}
                                        </Text>
                                        <RadioButton
                                         
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdBasicProfile.hasRationCard',
                                              text,
                                            );
                                            setHasRationCard(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdBasicProfile.hasRationCard
                                              : hasRationCard
                                          }
                                        />
                                        <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.hasRationCard}
                                        </Text>
                                        {values.householdBasicProfile.hasRationCard && <Input
                                          title={'18. '+t('Ration Card number?')}
                                          placeholder={t('Ration Card number?')}
                                          onChangeText={text => {
                  
                                            const ifscRegex = /^[A-Z0-9]{11,12}$/;
                  
                  if (ifscRegex.test(text)) {
                    setFieldValue(
                                              'householdBasicProfile.rationCardNumber',
                                              text,
                                            );
                    console.log('Valid Card');
                  } else {
                    setFieldValue(
                                              'householdBasicProfile.rationCardNumber',
                                              text,
                                            );
                    console.log('Invalid Card');
                  }
                                            // const cleanedText = text.replace(/^[A-Z0-9]{11,12}$/, '');
                                            // setFieldValue(
                                            //   'householdBasicProfile.rationCardNumber',
                                            //   cleanedText,
                                            // );
                                          }}
                                          value={values?.householdBasicProfile?.rationCardNumber}
                                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                          autoCapitalize="characters"
                                          keyboardType="default"
                                          maxLength={12}
                                        />}
                                        <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.rationCardNumber}
                                        </Text>
                                        <Spacing space={SH(30)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          19. {t(
                                            'What is the source of drinking water for the family?',
                                          )}
                                        </Text>
                                        {renderCheckboxes4()}
                                        {/* <RadioButton
                                          arrayData={waterSourceData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdBasicProfile.drinkingWaterSource',
                                              text,
                                            );
                                            setDrinkingWaterSource(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdBasicProfile.drinkingWaterSource
                                              : drinkingWaterSource
                                          }
                                        /> */}
                                        <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.drinkingWaterSource}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          20. {t('Whether provided LPG connection under Ujjwala?')}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdBasicProfile.hasUjjwalaLPGConnection',
                                              text,
                                            );
                                            setIsLpgConnectionUnderUjjwala(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdBasicProfile
                                                  .hasUjjwalaLPGConnection
                                              : isLpgConnectionUnderUjjwala
                                          }
                                        />
                                        <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.hasUjjwalaLPGConnection}
                                        </Text>
                                        <Spacing space={SH(10)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          21. {t(
                                            'Whether covered  under PM Kishan / CM Kishan Scheme?',
                                          )}
                                        </Text>
                                        {renderCheckboxes5()}
                                        {/* <RadioButton
                                        refs={fourRef}
                                          arrayData={schemeData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdEntitlement.kishanSchemeCoverage',
                                              text,
                                            );
                                            setKishanSchemeCoverage(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement.kishanSchemeCoverage
                                              : kishanSchemeCoverage
                                          }
                                        /> */}
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.kishanSchemeCoverage}
                                        </Text>
                  
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          22. {t(
                                            'Has the family provided house under the Rural Housing Scheme?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setHasRuralHousingSchemeHouse(text);
                                            setFieldValue(
                                              'householdEntitlement.hasRuralHousingSchemeHouse',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .hasRuralHousingSchemeHouse
                                              : hasRuralHousingSchemeHouse
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.hasRuralHousingSchemeHouse}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          23. {t('Does your family have a Job Card under MGNREGS?')}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setHasMGNREGSJobCard(text);
                                            setFieldValue(
                                              'householdEntitlement.hasMGNREGSJobCard',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement.hasMGNREGSJobCard
                                              : hasMGNREGSJobCard
                                          }
                                        />
                                          <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.hasMGNREGSJobCard}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        {values.householdEntitlement?.hasMGNREGSJobCard && <Input
                                          title={t(
                                            'Mention the Full Job card No (after Revenue Village code)',
                                          )}
                                          placeholder={t(
                                            'Mention the Full Job card No (after Revenue Village code)',
                                          )}
                                          onChangeText={text =>
                                            setFieldValue(
                                              'householdEntitlement.fullJobCardNumber',
                                              text,
                                            )
                                          }
                                          value={values?.householdEntitlement?.fullJobCardNumber}
                                          inputType="numeric"
                                          maxLength={100}
                                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                        />}
                                          <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.fullJobCardNumber}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          25. {t(
                                            'Whether the Household provided with Individual Household Latrine in past?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setHasIndividualHouseholdLatrine(text);
                                            setFieldValue(
                                              'householdEntitlement.hasIndividualHouseholdLatrine',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .hasIndividualHouseholdLatrine
                                              : hasIndividualHouseholdLatrine
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.hasIndividualHouseholdLatrine}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          26. {t('Whether the household has electricity connection?')}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setHasElectricityConnection(text);
                                            setFieldValue(
                                              'householdEntitlement.hasElectricityConnection',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .hasElectricityConnection
                                              : hasElectricityConnection
                                          }
                                        />
                                          <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.hasElectricityConnection}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          27. {t(
                                            'Whether Covered under Pradhan Mantri Ayushman  Jan Arogya Yojana?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsCoveredUnderAyushmanBharat(text);
                                            setFieldValue(
                                              'householdEntitlement.isCoveredUnderAyushmanBharat',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isCoveredUnderAyushmanBharat
                                              : isCoveredUnderAyushmanBharat
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isCoveredUnderAyushmanBharat}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          28. {t(
                                            'Is any household member enrolled under Pradhan Mantri Shram Yogi Maandhan pension scheme?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsEnrolledUnderShramYogiMaandhan(text);
                                            setFieldValue(
                                              'householdEntitlement.isEnrolledUnderShramYogiMaandhan',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isEnrolledUnderShramYogiMaandhan
                                              : isEnrolledUnderShramYogiMaandhan
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isEnrolledUnderShramYogiMaandhan}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          29. {t(
                                            'Does the household have Pradhan Mantri Jan Dhan Yojana bank account?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setHasJanDhanYojanaAccount(text);
                                            setFieldValue(
                                              'householdEntitlement.hasJanDhanYojanaAccount',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .hasJanDhanYojanaAccount
                                              : hasJanDhanYojanaAccount
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.hasJanDhanYojanaAccount}
                                        </Text>
                  
                                        {/* new addition */}
                                         <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          30. {t(
                                            'Whether the family members between 18 to 50 years age covered under Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) ?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsCoveredUnderPMJJBY(text);
                                            setFieldValue(
                                              'householdEntitlement.isCoveredUnderPMJJBY',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isCoveredUnderPMJJBY
                                              : isCoveredUnderPMJJBY
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isCoveredUnderPMJJBY}
                                        </Text>
                  
                   <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          31. {t(
                                            'Whether family members between age 18 to 70 years covered under Pradhan Mantri Suraksha Bima Yojana (PMSBY) ?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsCoveredUnderPMSBY(text);
                                            setFieldValue(
                                              'householdEntitlement.isCoveredUnderPMSBY',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isCoveredUnderPMSBY
                                              : isCoveredUnderPMSBY
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isCoveredUnderPMSBY}
                                        </Text>
                  
                   <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          32. {t(
                                            'Whether all eligible Household members are covered under Atal Pension Yojana?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsAtalPensionYojana(text);
                                            // Alert.alert("text",JSON.stringify(text));
                                            setFieldValue(
                                              'householdEntitlement.isAtalPensionYojana',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement.isAtalPensionYojana
                                              : isAtalPensionYojana
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isAtalPensionYojana}
                                        </Text>
                  
                   <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          33. {t(
                                            'Whether all eligible member above the age of 60 are getting oldage pension ?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsOldAgePension(text);
                                            setFieldValue(
                                              'householdEntitlement.isOldAgePension',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement.isOldAgePension
                                              : isOldAgePension
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isOldAgePension}
                                        </Text>
                  
                   <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          34. {t(
                                            'Whether all eligible member are getting widow pension ?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsWidowPension(text);
                                            setFieldValue(
                                              'householdEntitlement.isWidowPension',
                                              text,
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isWidowPension
                                              : isWidowPension
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isWidowPension}
                                        </Text>
                  
                   <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          35. {t(
                                            'Whether all eligible person with diability are getting pension ?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setIsDisabilityPension(text);
                                            setFieldValue(
                                              'householdEntitlement.isDisabilityPension',
                                              JSON.stringify(text),
                                            );
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdEntitlement
                                                  .isDisabilityPension
                                              : isDisabilityPension
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdEntitlement?.isDisabilityPension}
                                        </Text>
                  
                  
                                      </View>)}
                  {/* Three question start */}
                 {currentQuestion === 4 && (
                                     <View>
                                       <Text  refs={threeRef} style={AnalyaticsStyles.TitleStyle}>
                                         {t('Occupation & Resources')}
                                       </Text>
                                       
                                       
                                       
                                       {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_39")}</Text>
                                 {renderCheckboxes()} */}
                                       {/* <Spacing space={SH(5)} /> */}
                                       
                 
                                       
                                       
                                       {/* <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         23. {t('Whether the  family having Labour Cards?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdBasicProfile.hasLabourCard',
                                             text,
                                           );
                                           setHavingLabourCards(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdBasicProfile.hasLabourCard
                                             : havingLabourCards
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.householdBasicProfile?.hasLabourCard}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         24. {t(
                                           'Whether the  family covered under Nirman Shramik Kalyan Yojana (NSKY)?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdBasicProfile.isCoveredUnderNSKY',
                                             text,
                                           );
                                           setIsCoveredUnderNSKY(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdBasicProfile.isCoveredUnderNSKY
                                             : isCoveredUnderNSKY
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.householdBasicProfile?.isCoveredUnderNSKY}
                                       </Text> */}
                                       <Spacing space={SH(10)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         36. {t('What is the Primary Occupation of the family?')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <DropDown
                                       
                                         data={occupationDropDownData}
                                         dropdownStyle={{marginLeft: SH(10)}}
                                         width={SW(345)}
                                         labelField="label"
                                         valueField="value"
                                         value={
                                           values?.householdOccupationAndLand
                                             ?.primaryOccupationOfTheFamily
                                         }
                                         placeholder={
                                           values?.householdOccupationAndLand
                                             ?.primaryOccupationOfTheFamily ||
                                           t('Select Occupation')
                                         }
                                         onChange={obj => {
                                           //  Alert.alert("hellll",JSON.stringify(obj));
                                           setFieldValue(
                                             'householdOccupationAndLand.primaryOccupationOfTheFamily',
                                             obj.label,
                                           );
                                         }}
                                       />
                                         <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.primaryOccupationOfTheFamily}
                                       </Text>
                                       {values?.householdOccupationAndLand
                                         ?.primaryOccupationOfTheFamily ===
                                         'Other User entry' && (
                                         <>
                                           <Spacing space={SH(15)} />
                                           <Input
                                             title={t('Others')}
                                             placeholder={t('Others')}
                                             onChangeText={(text) =>{
                                               if(text.length<3){
                                                 return;
                                               }
                                               setFieldValue(
                                                 'householdOccupationAndLand.otherPrimaryOccupationDetails',
                                                 text,
                                               )
                                             }}
                                             value={
                                               values?.householdOccupationAndLand
                                                 ?.otherPrimaryOccupationDetails
                                             }
                                             titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                             
                                             maxLength={100}
                                           />
                                         </>
                                       )}
                                        <Text style={{color: 'red'}}>{errors?.householdOccupationAndLand?.otherPrimaryOccupationDetails}</Text>
                 
                                       {/* <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         26. {t(
                                           'Is any family member involved in weaving or handloom work?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdOccupationAndLand.isFamilyInvolvedInWeavingOrHandloom',
                                             text,
                                           );
                                           setIsFamilyInvolvedInWeavingOrHandloom(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .isFamilyInvolvedInWeavingOrHandloom
                                             : isFamilyInvolvedInWeavingOrHandloom
                                         }
                                       />
                                         <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.isFamilyInvolvedInWeavingOrHandloom}
                                       </Text> */}
                 
                                       {/*isFamilyInvolvedInWeavingOrHandloom &&<Spacing space={SH(5)} />*/}
                                       {/*isFamilyInvolvedInWeavingOrHandloom &&<Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         27. {t(
                                           'Does the family covered under POHI_Looms and Accessories Scheme?',
                                         )}
                                       </Text>*/}
                                       {/*isFamilyInvolvedInWeavingOrHandloom &&<RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdOccupationAndLand.isFamilyCoveredUnderPOHI_LoomsScheme',
                                             text,
                                           );
                                           setIsFamilyCoveredUnderPOHI_LoomsScheme(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .isFamilyCoveredUnderPOHI_LoomsScheme
                                             : isFamilyCoveredUnderPOHI_LoomsScheme
                                         }
                                       />*/}
                                         {/*isFamilyInvolvedInWeavingOrHandloom &&<Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.isFamilyCoveredUnderPOHI_LoomsScheme}
                                       </Text>*/}
                 
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         37. {t(
                                           'Amount of Land holding under FRA- In Acres ? (If Not a FRA claimant.. Go to next Qn or else go to next to next Qn.)',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={fraHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdOccupationAndLand.fraClaimantStatus',
                                             text,
                                           );
                                           setFraClaimantStatus(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .fraClaimantStatus
                                             : fraClaimantStatus
                                         }
                                       />
                                        <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.fraClaimantStatus}
                                       </Text>
                                       {values?.householdOccupationAndLand?.fraClaimantStatus ===
                                         'FRA Claimant' && (
                                         <>
                                           <Spacing space={SH(15)} />
                                           <Input
                                             title={t(
                                               'Amount of Land holding under FRA- In Acres',
                                             )}
                                             placeholder={t(
                                               'Amount of Land holding under FRA- In Acres',
                                             )}
                                             onChangeText={text => {
                     // Allow only numbers and decimal point
                     const filtered = text.replace(/[^0-9.]/g, '');
                 
                     // Prevent multiple dots
                     if ((filtered.match(/\./g) || []).length > 1) return;
                 
                     const value = Number(filtered);
                 
                     // Allow empty input
                     if (filtered === '') {
                       setFieldValue(
                         'householdOccupationAndLand.fra_LandAmountInAcres',
                         ''
                       );
                       return;
                     }
                 
                     // Block values > 5
                     if (value > 5) return;
                 
                     setFieldValue(
                       'householdOccupationAndLand.fra_LandAmountInAcres',
                       value
                     );
                   }}
                                             // onChangeText={(text) =>{
                                             // // Alert.alert("nummmm",JSON.stringify(Number(text)));
                                             //   setFieldValue(
                                             //     'householdOccupationAndLand.fra_LandAmountInAcres',
                                             //     Number(text),
                                             //   );
                                             // }
                                             // }
                                             value={
                                               values?.householdOccupationAndLand
                                                 ?.fra_LandAmountInAcres
                                             }
                                             titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                             inputType={'numeric'}
                                             maxLength={20}
                                           />
                                         </>
                                       )}
                                        <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.fra_LandAmountInAcres}
                                       </Text>
                 
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         38. {t('Whether your family owns Homestead Patta land?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdOccupationAndLand.ownsHomesteadPattaLand',
                                             text,
                                           );
                                           setOwnsHomesteadPattaLand(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .ownsHomesteadPattaLand
                                             : ownsHomesteadPattaLand
                                         }
                                       />
                                        <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.ownsHomesteadPattaLand}
                                       </Text>
                 
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         39. {t(
                                           'Approximate private land holding of the Household?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={privateLandData}
                                         onChangeText={text => {
                                           // Alert.alert("text",JSON.stringify(text));
                                           setFieldValue(
                                             'householdOccupationAndLand.approximatePrivateLandHolding',
                                             text,
                                           );
                                           setApproximatePrivateLandHolding(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .approximatePrivateLandHolding
                                             : approximatePrivateLandHolding
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.approximatePrivateLandHolding}
                                       </Text>
                 
                                       {approximatePrivateLandHolding!='Landless' && <Spacing space={SH(5)} />}
                                       {approximatePrivateLandHolding!='Landless' && <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         40. {t('Whether irrigation facility available?')}
                                       </Text>}
                                       {approximatePrivateLandHolding!='Landless' && <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'householdOccupationAndLand.isIrrigationFacilityAvailable',
                                             text,
                                           );
                                           setIsIrrigationFacilityAvailable(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.householdOccupationAndLand
                                                 .isIrrigationFacilityAvailable
                                             : isIrrigationFacilityAvailable
                                         }
                                       />}
                 
                                         {approximatePrivateLandHolding!='Landless'&&<Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.isIrrigationFacilityAvailable}
                                       </Text>}
                 
                                       {values?.householdOccupationAndLand
                                         ?.isIrrigationFacilityAvailable === true && (
                                         <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                           {t('What are the sources of Irrigation?')}
                                         </Text>
                                       )}
                                       {values?.householdOccupationAndLand
                                         ?.isIrrigationFacilityAvailable === true &&
                                         renderCheckboxes2()}
                                       {values?.householdOccupationAndLand
                                         ?.isIrrigationFacilityAvailable === true && (
                                         <Spacing space={SH(5)} />
                                       )}
                                       <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.sourcesOfIrrigation}
                                       </Text>
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         41. {t('Whether involved in livestock activity?')}
                                       </Text>
                                       {renderCheckboxes3()}
                                        <Text style={{color: 'red'}}>
                                         {errors?.householdOccupationAndLand?.involvedInLivestockActivity}
                                       </Text>
                                       {<Spacing space={SH(5)} />}
                 
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
                  {/* {currentQuestion === 5 && (
                                    <View>
                                      <Text style={AnalyaticsStyles.TitleStyle}>
                                        {t('Entitlement')}
                                      </Text>
                                      
                                      
                                      <Spacing space={SH(5)} />
                                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                        40. {t(
                                          'Whether the family members between 18 to 50 years age covered under Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) ?',
                                        )}
                                      </Text>
                                      <RadioButton
                                        arrayData={selfHelpData}
                                        onChangeText={text => {
                                          setIsCoveredUnderPMJJBY(text);
                                          setFieldValue(
                                            'householdEntitlement.isCoveredUnderPMJJBY',
                                            text,
                                          );
                                        }}
                                        value={
                                          editData != undefined
                                            ? values.householdEntitlement.isCoveredUnderPMJJBY
                                            : isCoveredUnderPMJJBY
                                        }
                                      />
                                        <Text style={{color: 'red'}}>
                                        {errors?.householdEntitlement?.isCoveredUnderPMJJBY}
                                      </Text>
                                      <Spacing space={SH(5)} />
                                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                        41. {t(
                                          'Whether family members between age 18 to 70 years covered under Pradhan Mantri Suraksha Bima Yojana (PMSBY) ?',
                                        )}
                                      </Text>
                                      <RadioButton
                                        arrayData={selfHelpData}
                                        onChangeText={text => {
                                          setIsCoveredUnderPMSBY(text);
                                          setFieldValue(
                                            'householdEntitlement.isCoveredUnderPMSBY',
                                            text,
                                          );
                                        }}
                                        value={
                                          editData != undefined
                                            ? values.householdEntitlement.isCoveredUnderPMSBY
                                            : isCoveredUnderPMSBY
                                        }
                                      />
                                      <Text style={{color: 'red'}}>
                                        {errors?.householdEntitlement?.isCoveredUnderPMSBY}
                                      </Text>
                                      <Spacing space={SH(5)} />
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
                                /> *
                                    </View>
                                  )} */}
                  {/*five question start */}
                  {currentQuestion === 5 && (
                                      <View>
                                        <Text style={AnalyaticsStyles.TitleStyle}>
                                          {t('Additional Information of HH on Migration')}
                                        </Text>
                                        {/* <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          42. {t(
                                            'Has any family member migrated during the last 3 years?',
                                          )}
                                        </Text>
                                        <RadioButton
                                        refs={fiveRef}
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdMigrationStatus.hasFamilyMemberMigratedLast3Years',
                                              text,
                                            );
                                            setHasFamilyMemberMigratedLast3Years(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdMigrationStatus
                                                  .hasFamilyMemberMigratedLast3Years
                                              : hasFamilyMemberMigratedLast3Years
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.hasFamilyMemberMigratedLast3Years}
                                        </Text> */}
                                        <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          42. {t(
                                            'Had the family taken any advance from middleman  for migration?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData2}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdMigrationStatus.takenAdvanceForMigrationFromMiddleman',
                                              text,
                                            );
                                            setTakenAdvanceForMigrationFromMiddleman(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdMigrationStatus
                                                  .takenAdvanceForMigrationFromMiddleman
                                              : takenAdvanceForMigrationFromMiddleman
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.takenAdvanceForMigrationFromMiddleman}
                                        </Text>
                                         <Spacing space={SH(5)} />
                                          <Input
                                          title={'43. '+t('No of minor children accompanied during migration? (Less than 18 Yrs of age)')}
                                          placeholder={t('No of minor children accompanied during migration? (Less than 18 Yrs of age)')}
                                          value={
                                            values?.householdMigrationStatus
                                              ?.minorChildrenAccompaniedMigration
                                          }
                                          keyboardType="number-pad"
                                          onChangeText={text => {
                                            // allow only digits
                                            const digitsOnly = text.replace(/[^0-9]/g, '');
                  
                                            // allow first digit only if 6-9
                                            if (digitsOnly.length === 0) {
                                              setFieldValue(
                                                'householdMigrationStatus.minorChildrenAccompaniedMigration',
                                                Number(digitsOnly),
                                              );
                                              return;
                                            }
                                            // if (
                                            //   digitsOnly.length === 1 &&
                                            //   !/^[6-9]/.test(digitsOnly)
                                            // ) {
                                            //   Alert.alert(
                                            //     'Invalid Mobile Number',
                                            //     'Mobile number must start with 6, 7, 8 or 9',
                                            //   );
                                            // }
                  
                                            // if (/^[6-9]/.test(digitsOnly)) {
                                              setFieldValue(
                                                'householdMigrationStatus.minorChildrenAccompaniedMigration',
                                                 Number(digitsOnly),
                                              );
                                            // }
                                            // else: ignore invalid starting digit (1–5,0)
                                          }}
                                          inputType="numeric"
                                          maxLength={5}
                                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                        />
                  
                                        <Text style={{color: 'red'}}>
                                          {
                                            errors?.householdMigrationStatus
                                              ?.minorChildrenAccompaniedMigration
                                          }
                                        </Text>
                                        {/* <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          44. {t(
                                            'Whether minor children accompanied during migration?',
                                          )}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdMigrationStatus.minorChildrenAccompaniedMigration',
                                              text,
                                            );
                                            setMinorChildrenAccompaniedMigration(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdMigrationStatus
                                                  .minorChildrenAccompaniedMigration
                                              : minorChildrenAccompaniedMigration
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.minorChildrenAccompaniedMigration}
                                        </Text> */}
                                        {/* <Spacing space={SH(5)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          45. {t('Whether Women Members Migrated?')}
                                        </Text>
                                        <RadioButton
                                          arrayData={selfHelpData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdMigrationStatus.womenMembersMigrated',
                                              text,
                                            );
                                            setWomenMembersMigrated(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdMigrationStatus
                                                  .womenMembersMigrated
                                              : womenMembersMigrated
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.womenMembersMigrated}
                                        </Text> */}
                                        <Spacing space={SH(5)} />
                                        <Input
                                          title={'44. '+t('Household contact mobile no.?')}
                                          placeholder={t('Household contact mobile no.?')}
                                          value={
                                            values?.householdMigrationStatus
                                              ?.familyContactMobileNo
                                          }
                                          keyboardType="number-pad"
                                          onChangeText={text => {
                                            // allow only digits
                                            const digitsOnly = text.replace(/[^0-9]/g, '');
                  
                                            // allow first digit only if 6-9
                                            if (digitsOnly.length === 0) {
                                              setFieldValue(
                                                'householdMigrationStatus.familyContactMobileNo',
                                                digitsOnly,
                                              );
                                              return;
                                            }
                                            if (
                                              digitsOnly.length === 1 &&
                                              !/^[6-9]/.test(digitsOnly)
                                            ) {
                                              Alert.alert(
                                                'Invalid Mobile Number',
                                                'Mobile number must start with 6, 7, 8 or 9',
                                              );
                                            }
                  
                                            if (/^[6-9]/.test(digitsOnly)) {
                                              setFieldValue(
                                                'householdMigrationStatus.familyContactMobileNo',
                                                digitsOnly,
                                              );
                                            }
                                            // else: ignore invalid starting digit (1–5,0)
                                          }}
                                          inputType="numeric"
                                          maxLength={10}
                                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                        />
                  
                                        <Text style={{color: 'red'}}>
                                          {
                                            errors?.householdMigrationStatus
                                              ?.familyContactMobileNo
                                          }
                                        </Text>
                                        <Spacing space={SH(10)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          45. {t('Identity of the respondent?')}
                                        </Text>
                                        <RadioButton
                                          arrayData={respondantData}
                                          onChangeText={text => {
                                            setFieldValue(
                                              'householdMigrationStatus.respondentIdentity',
                                              text,
                                            );
                                            setRespondentIdentity(text);
                                          }}
                                          value={
                                            editData != undefined
                                              ? values.householdMigrationStatus.respondentIdentity
                                              : respondentIdentity
                                          }
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.respondentIdentity}
                                        </Text>
                                        {/* <Spacing space={SH(10)} />
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          48. {t('Capture a photo of the respondent')}
                                        </Text>
                                        <Spacing space={SH(10)} />
                                        <View style={AnalyaticsStyles.FlexRow}>
                                          <ImagePicker
                                          
                                            value={
                                              values.householdMigrationStatus.respondentPhotoPathOrUrl
                                            }
                                            onPress={(img) =>{
                                             // Alert.alert("img",JSON.stringify(img));
                                              setFieldValue(
                                                'householdMigrationStatus.respondentPhotoPathOrUrl',
                                                img,
                                              )
                                            }}
                                            showdata={true}
                                            imageData={imageData}
                                            setImageData={setImageData}
                                            imgpathselect={imgpathselect}
                                            SetImgpathselect={SetImgpathselect} 
                                          />
                                          <TouchableOpacity
                                            onPress={() => {
                                              setAlertVisible(true);
                                              setAlertMessage(alertdata.logout);
                                            }}
                                            style={HomeTabStyles.BackGroundViewTwo}>
                                            <VectorIcon
                                              icon="AntDesign"
                                              name="delete"
                                              size={SF(22)}
                                              color={Colors.theme_background}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdMigrationStatus?.respondentIdentity}
                                        </Text> */}
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
                                        <Spacing space={SH(10)} />
                                        <View style={AnalyaticsStyles.PaddingHori}>
                                          <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                                                  46. {t('Click on the icon to capture GEO location')}
                                                                </Text>
                                          <View style={Style.FlexEditView}>
                                            <TouchableOpacity
                                              onPress={() =>
                                                // navigation.navigate(RouteName.MAP_SCREEN)
                                                getLocation()
                                              }>
                                              <Text style={Style.datetextstyles}>
                                                {' '}
                                                <VectorIcon
                                                  icon="FontAwesome"
                                                  name="map-marker"
                                                  size={SF(20)}
                                                  color={Colors.theme_background}
                                                />{' '}
                                              {location ? location.coords.latitude : null},{location ? location.coords.longitude : null}
                                              </Text>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity
                                              onPress={() =>
                                                navigation.navigate(
                                                  RouteName.EDIT_LOCATION_SCREEN,
                                                )
                                              }
                                              style={Style.dobView}>
                                              <VectorIcon
                                                icon="AntDesign"
                                                name="edit"
                                                size={SF(30)}
                                                color={Colors.theme_background}
                                              />
                                            </TouchableOpacity> */}
                                          </View>
                                        </View>
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.geoLocation}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <Input
                                          title={'47. '+t('Surveyor Name')}
                                          placeholder={t('Surveyor Name')}
                                          onChangeText={text =>
                                            setFieldValue('householdBasicProfile.entryBy', text)
                                          }
                                          value={values?.householdBasicProfile?.entryBy}
                                          // inputType="numeric"
                                          maxLength={20}
                                          disabled={true}
                                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                        />
                                         <Text style={{color: 'red'}}>
                                          {errors?.householdBasicProfile?.entryBy}
                                        </Text>
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
                                        <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                          48. {t('Survey Date and Time')}
                                        </Text>
                                        <Spacing space={SH(5)} />
                                        <DatePicker
                                                               dateselcetLocal={dateSelectLocal}
                                                               setdateselectLocal={setDateSelectLocal}
                                                             />
                                        <Spacing space={SH(15)} />
                                      </View>
                                    )}
                  <Spacing space={SH(170)} />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
                <Modal visible={showConfirmModal} transparent animationType="slide">
                           <View
                             style={{
                               flex: 1,
                               backgroundColor: 'rgba(0,0,0,0.5)',
                               justifyContent: 'center',
                               padding: 20,
                             }}>
                             <View
                               style={{
                                 backgroundColor: '#fff',
                                 borderRadius: 10,
                                 padding: 20,
                                 maxHeight: '80%',
                               }}>
                               <Text
                                 style={{
                                   fontSize: 18,
                                   fontWeight: 'bold',
                                   marginBottom: 10,
                                 }}>
                                 Confirm Survey Details
                               </Text>
             
                               <ScrollView>
                                 <Text style={AnalyaticsStyles.TitleStyle}>
                                   {t('Basic Details')}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>{t('District')}:</Text>{' '}
                                   {previewData?.householdBasicProfile?.district}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>{t('Block')}:</Text>{' '}
                                   {previewData?.householdBasicProfile?.block}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Gram Panchayat')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.gramPanchayat}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Revenue Village')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.revenueVillage}
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>{t('Hamlet')}:</Text>{' '}
                                   {previewData?.householdBasicProfile?.hamlet}
                                 </Text>
                                  <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Nearest Landmark')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdBasicProfile
                                       ?.nearestLandmark
                                   }
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Head of the Household as per Aadhar Card')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdBasicProfile
                                       ?.headOfTheHouseholdNameAsPerAadhar
                                   }
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Gender (Head of the Household)')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdBasicProfile
                                       ?.headOfTheHouseholdGender
                                   }
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('AADHAR No.')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.aadharNo}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Social Category')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.socialCategory}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Bank Account No')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.bankAccountNumber}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Bank Name')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.bankName}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('IFSC code / Branch')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.ifscCodeOrBranch}
                                 </Text>
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Name of the women member of the Household')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.womenMemberName}
                                 </Text> */}
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Age of Women Member as per AADHAR?')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.womenMemberAge}
                                 </Text> */}
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Marital Status of the Women Member ?')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdBasicProfile
                                       ?.womenMemberMaritalStatus
                                   }
                                 </Text> */}
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Relationship with the Head of the Household')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdBasicProfile
                                       ?.womenMemberRelationshipWithHead
                                   }
                                 </Text> */}
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {' '}
                                     {t(
                                       'Is any Women of the Family covered under Self Help Group(SHG)',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdBasicProfile
                                       ?.isWomenCoveredUnderSHG
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether the women  member of the family covered under Subhadra Yojana',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdBasicProfile
                                       ?.isWomenCoveredUnderSubhadraYojana
                                   }
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>Total Members:</Text>{' '}
                                   {previewData?.householdBasicProfile?.totalFamilyMembers}
                                 </Text>
             
                                 <Spacing space={SH(10)} />
             
                                 <Text style={{fontWeight: 'bold'}}>Family Members:</Text>
                                 {previewData?.householdFamilyMember?.map((m, i) => (
                                   <Text key={i}>
                                     {i + 1}. {m.name} | Age: {m.age} | Gender: {m.gender}
                                   </Text>
                                 ))}
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether the household have Ration Card?')}:
                                   </Text>{' '}
                                   {""+previewData?.householdBasicProfile?.hasRationCard}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Ration Card number')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.rationCardNumber}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'What is the source of drinking water for the family?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.drinkingWaterSource}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether provided LPG connection under Ujjwala?')}:
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdBasicProfile
                                       ?.hasUjjwalaLPGConnection
                                   }
                                 </Text>
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether the  family having Labour Cards?')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.hasLabourCard}
                                 </Text> */}
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether the  family covered under Nirman Shramik Kalyan Yojana (NSKY)?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.isCoveredUnderNSKY}
                                 </Text> */}
                                 <Text style={AnalyaticsStyles.TitleStyle}>
                                   {t('Occupation & Resources')}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {' '}
                                     {t('What is the Primary Occupation of the family?')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.primaryOccupationOfTheFamily
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>{t('Others')}:</Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.otherPrimaryOccupationDetails
                                   }
                                 </Text>
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Is any family member involved in weaving or handloom work?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.isFamilyInvolvedInWeavingOrHandloom
                                   }
                                 </Text> */}
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Does the family covered under POHI_Looms and Accessories Scheme?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.isFamilyCoveredUnderPOHI_LoomsScheme
                                   }
                                 </Text> */}
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Amount of Land holding under FRA- In Acres ? (If Not a FRA claimant.. Go to next Qn or else go to next to next Qn.)',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.fraClaimantStatus
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Amount of Land holding under FRA- In Acres')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.fra_LandAmountInAcres
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether your family owns Homestead Patta land?')}:
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdOccupationAndLand
                                       ?.ownsHomesteadPattaLand
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Approximate private land holding of the Household?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdOccupationAndLand
                                       ?.approximatePrivateLandHolding
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether irrigation facility available?')}:
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdOccupationAndLand
                                       ?.isIrrigationFacilityAvailable
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('What are the sources of Irrigation?')}:
                                   </Text>{' '}
                                   {previewData?.householdOccupationAndLand?.sourcesOfIrrigation}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {' '}
                                     {t('Whether involved in livestock activity?')}:
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdOccupationAndLand
                                       ?.involvedInLivestockActivity
                                   }
                                 </Text>
                                 <Text style={AnalyaticsStyles.TitleStyle}>
                                   {t('Entitlement')}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether covered  under PM Kishan / CM Kishan Scheme?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.kishanSchemeCoverage}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Has the family provided house under the Rural Housing Scheme?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdEntitlement
                                       ?.hasRuralHousingSchemeHouse
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Does your family have a Job Card under MGNREGS?')}:
                                   </Text>{' '}
                                   {previewData?.householdEntitlement?.hasMGNREGSJobCard}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Mention the Full Job card No (after Revenue Village code)',
                                     )}
                                     :
                                   </Text>{' '}
                                   {previewData?.householdEntitlement?.fullJobCardNumber}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether the Household provided with Individual Household Latrine in past?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdEntitlement
                                       ?.hasIndividualHouseholdLatrine
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether the household has electricity connection?')}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdEntitlement
                                       ?.hasElectricityConnection
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether Covered under Pradhan Mantri Ayushman  Jan Arogya Yojana?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdEntitlement
                                       ?.isCoveredUnderAyushmanBharat
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Is any household member enrolled under Pradhan Mantri Shram Yogi Maandhan pension scheme?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdEntitlement
                                       ?.isEnrolledUnderShramYogiMaandhan
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Does the household have Pradhan Mantri Jan Dhan Yojana bank account?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdEntitlement
                                       ?.hasJanDhanYojanaAccount
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether the family members between 18 to 50 years age covered under Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) ?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isCoveredUnderPMJJBY}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether family members between age 18 to 70 years covered under Pradhan Mantri Suraksha Bima Yojana (PMSBY) ?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isCoveredUnderPMSBY}
                                 </Text>
                                 {/* newly added */}
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether all eligible Household members are covered under Atal Pension Yojana?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isAtalPensionYojana}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether all eligible member above the age of 60 are getting oldage pension ?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isOldAgePension}
                                 </Text>
                                   <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether all eligible member are getting widow pension ?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isWidowPension}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                      'Whether all eligible person with disability are getting pension ?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {""+previewData?.householdEntitlement?.isDisabilityPension}
                                 </Text>
             
                                 <Text style={AnalyaticsStyles.TitleStyle}>
                                   {t('Migration Status')}
                                 </Text>
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Has any family member migrated during the last 3 years?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     previewData?.householdMigrationStatus
                                       ?.hasFamilyMemberMigratedLast3Years
                                   }
                                 </Text> */}
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Had the family taken any advance from middleman  for migration?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdMigrationStatus
                                       ?.takenAdvanceForMigrationFromMiddleman
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Had the family taken any advance from middleman  for migration?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdMigrationStatus
                                       ?.takenAdvanceForMigrationFromMiddleman
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t(
                                       'Whether minor children accompanied during migration?',
                                     )}
                                     :
                                   </Text>{' '}
                                   {
                                     ""+previewData?.householdMigrationStatus
                                       ?.minorChildrenAccompaniedMigration
                                   }
                                 </Text>
                                 {/* <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Whether Women Members Migrated?')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdMigrationStatus
                                       ?.womenMembersMigrated
                                   }
                                 </Text> */}
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Family contact mobile no.?')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdMigrationStatus
                                       ?.familyContactMobileNo
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Identity of the respondent?')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdMigrationStatus
                                       ?.respondentIdentity
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Capture a photo of the respondent')}:
                                   </Text>{' '}
                                   {
                                     previewData?.householdMigrationStatus
                                       ?.respondentPhotoPathOrUrl
                                   }
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>{t('Location')}:</Text>{' '}
                                   {previewData?.householdBasicProfile?.geoLocation}
                                 </Text>
             
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Surveyor Name')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.entryBy}
                                 </Text>
                                 <Text>
                                   <Text style={{fontWeight: 'bold'}}>
                                     {t('Survey Date and Time')}:
                                   </Text>{' '}
                                   {previewData?.householdBasicProfile?.surveyDate}
                                 </Text>
                               </ScrollView>
             
                               <Spacing space={SH(15)} />
             
                               <View
                                 style={{
                                   flexDirection: 'row',
                                   justifyContent: 'space-between',
                                 }}>
                                 <TouchableOpacity
                                   onPress={() => setShowConfirmModal(false)}
                                   style={{padding: 10}}>
                                   <Text style={{color: 'red'}}>Edit</Text>
                                 </TouchableOpacity>
             
                                 <TouchableOpacity
                                   onPress={() => {
                                     setShowConfirmModal(false);
                                     handleSubmit(); // ✅ FINAL SUBMIT
                                   }}
                                   style={{padding: 10}}>
                                   <Text style={{color: 'green'}}>Confirm & Submit</Text>
                                 </TouchableOpacity>
                               </View>
                             </View>
                           </View>
                         </Modal>

            <View style={AnalyaticsStyles.NavigationButtons}>
              <TouchableOpacity
                style={AnalyaticsStyles.PreviousButton}
                onPress={handlePrevious}>
                <Text style={AnalyaticsStyles.PreviousTextStyle}>
                  {t('Survey_Title_47')}
                </Text>
              </TouchableOpacity>
              {currentQuestion < 5 && (
                <TouchableOpacity
                  style={AnalyaticsStyles.PreviousButton}
                  onPress={handleNext}>
                  <Text style={AnalyaticsStyles.PreviousTextStyle}>
                    {t('Survey_Title_48')}
                  </Text>
                </TouchableOpacity>
              )}
              {currentQuestion == 5 && (
                <TouchableOpacity
                  style={AnalyaticsStyles.SubmitButton}
                  onPress={() => {
                    // Alert.alert("errors",JSON.stringify(values));
                    // return;
                    if (involvedInLivestockActivity?.length > 0) {
                      let livestockArray = '';
                      involvedInLivestockActivity?.forEach(item => {
                        livestockArray =
                          involvedInLivestockActivity.length > 1
                            ? livestockArray.concat(item + ', ')
                            : livestockArray.concat(item);
                      });
                      //Alert.alert("involvedInLivestockActivity",JSON.stringify(livestockArray));
                      setFieldValue(
                        'householdOccupationAndLand.involvedInLivestockActivity',
                        livestockArray,
                      );
                    }
                    if (sourcesOfIrrigation?.length > 0) {
                      let irrigationArray = '';
                      sourcesOfIrrigation?.forEach(item => {
                        irrigationArray =
                          sourcesOfIrrigation.length > 1
                            ? irrigationArray.concat(item + ', ')
                            : irrigationArray.concat(item);
                      });
                      //Alert.alert("involvedInLivestockActivity",JSON.stringify(livestockArray));
                      setFieldValue(
                        'householdOccupationAndLand.sourcesOfIrrigation',
                        irrigationArray,
                      );
                    }
                    // setFieldValue(
                    //   'householdOccupationAndLand.sourcesOfIrrigation',
                    //   sourcesOfIrrigation,
                    // );

                    setFieldValue(
                      'householdBasicProfile.surveyDate',
                      dateSelectLocal,
                    );
                    let res =
                      (location ? location.coords.latitude : null) +
                      ',' +
                      (location ? location.coords.longitude : null);
                    setFieldValue('householdBasicProfile.geoLocation', res);

                    setFieldValue(
                      'householdMigrationStatus.respondentPhotoPathOrUrl',
                      imgpathselect,
                    );

                    let finalValuesPreview = {
                      ...values,
                      householdFamilyMember: familyMembers,
                    };

                    if (errors && errors?.householdBasicProfile?.district) {
                      AppOkAlert(
                        errors.householdBasicProfile.district,
                        () => {},
                      );
                      return;
                    }
                    if (errors && errors?.householdBasicProfile?.block) {
                      AppOkAlert(errors.householdBasicProfile.block, () => {});
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.gramPanchayat
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.gramPanchayat,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.revenueVillage
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.revenueVillage,
                        () => {},
                      );
                      return;
                    }

                    if (errors && errors?.householdBasicProfile?.hamlet) {
                      AppOkAlert(errors.householdBasicProfile.hamlet, () => {});
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile
                        ?.headOfTheHouseholdNameAsPerAadhar
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile
                          .headOfTheHouseholdNameAsPerAadhar,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.headOfTheHouseholdGender
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.headOfTheHouseholdGender,
                        () => {},
                      );
                      return;
                    }
                    if (errors && errors?.householdBasicProfile?.aadharNo) {
                      AppOkAlert(
                        errors.householdBasicProfile.aadharNo,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.socialCategory
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.socialCategory,
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile?.bankAccountNumber
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.bankAccountNumber,
                        () => {},
                      );
                      return;
                    }
                    if (errors && errors?.householdBasicProfile?.bankName) {
                      AppOkAlert(
                        errors.householdBasicProfile.bankName,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.ifscCodeOrBranch
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.ifscCodeOrBranch,
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile?.isWomenCoveredUnderSHG
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.isWomenCoveredUnderSHG,
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile
                        ?.isWomenCoveredUnderSubhadraYojana
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile
                          .isWomenCoveredUnderSubhadraYojana,
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile?.totalFamilyMembers
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.totalFamilyMembers,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.hasRationCard === false
                    ) {
                      AppOkAlert(
                        'Please select if the household has a ration card',
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile?.rationCardNumber
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.rationCardNumber,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdBasicProfile?.drinkingWaterSource
                    ) {
                      AppOkAlert(
                        errors.householdBasicProfile.drinkingWaterSource,
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdBasicProfile?.hasUjjwalaLPGConnection ===
                        false
                    ) {
                      AppOkAlert(
                        'Please select if the household has Ujjwala LPG Connection',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement?.hasRuralHousingSchemeHouse
                    ) {
                      AppOkAlert(
                        'Please select if the household has Rural Housing Scheme House',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement?.hasRuralHousingSchemeHouse
                    ) {
                      AppOkAlert(
                        'Please select if the household has Rural Housing Scheme House',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement
                        ?.hasIndividualHouseholdLatrine
                    ) {
                      AppOkAlert(
                        'Please select if the household has Individual Household Latrine',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement?.hasElectricityConnection
                    ) {
                      AppOkAlert(
                        'Please select if the household has Electricity Connection',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement?.hasMGNREGSJobCard
                    ) {
                      AppOkAlert(
                        'Please select if the household has MGNREGS Job Card',
                        () => {},
                      );
                      return;
                    }
                    if (
                      values?.householdEntitlement?.hasMGNREGSJobCard &&
                      errors &&
                      errors?.householdEntitlement?.fullJobCardNumber
                    ) {
                      AppOkAlert(
                        errors.householdEntitlement.fullJobCardNumber,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement?.hasJanDhanYojanaAccount
                    ) {
                      AppOkAlert(
                        'Please select if the household has Jan Dhan Yojana Account',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement
                        ?.isCoveredUnderAyushmanBharat === false
                    ) {
                      AppOkAlert(
                        'Please select if the household is covered under Ayushman Bharat',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdEntitlement
                        ?.isEnrolledUnderShramYogiMaandhan === false
                    ) {
                      AppOkAlert(
                        'Please select if the household is enrolled under Shram Yogi Maandhan',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdMigrationStatus
                        ?.takenAdvanceForMigrationFromMiddleman === false
                    ) {
                      AppOkAlert(
                        'Please select if the household has taken advance for migration from middleman',
                        () => {},
                      );
                      return;
                    }

                    if (
                      errors &&
                      errors?.householdMigrationStatus
                        ?.minorChildrenAccompaniedMigration
                    ) {
                      AppOkAlert(
                        'Please select Minor Children Accompanied Migration',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdMigrationStatus?.familyContactMobileNo
                    ) {
                      AppOkAlert(
                        errors?.householdMigrationStatus?.familyContactMobileNo,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdMigrationStatus?.respondentIdentity
                    ) {
                      AppOkAlert('Please enter Respondent Identity', () => {});
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdOccupationAndLand
                        ?.primaryOccupationOfTheFamily
                    ) {
                      AppOkAlert(
                        'Please enter Primary Occupation of the Family',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdOccupationAndLand?.fraClaimantStatus
                    ) {
                      AppOkAlert('Please enter FRA Claimant Status', () => {});
                      return;
                    }
                    if (
                      values?.householdOccupationAndLand?.fraClaimantStatus ===
                        'FRA Claimant' &&
                      errors &&
                      errors?.householdOccupationAndLand?.fra_LandAmountInAcres
                    ) {
                      AppOkAlert(
                        errors.householdOccupationAndLand.fra_LandAmountInAcres,
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdOccupationAndLand?.ownsHomesteadPattaLand
                    ) {
                      AppOkAlert(
                        'Please select if the family owns Homestead Patta Land',
                        () => {},
                      );
                      return;
                    }
                    if (
                      errors &&
                      errors?.householdOccupationAndLand
                        ?.approximatePrivateLandHolding
                    ) {
                      AppOkAlert(
                        'Please enter Approximate Private Land Holding',
                        () => {},
                      );
                      return;
                    }
                    if (
                      values?.householdOccupationAndLand
                        ?.approximatePrivateLandHolding !== 'Landless' &&
                      errors &&
                      errors?.householdOccupationAndLand
                        ?.isIrrigationFacilityAvailable
                    ) {
                      AppOkAlert(
                        'Please select if the irrigation facility is available',
                        () => {},
                      );
                      return;
                    }

                    setPreviewData(finalValuesPreview);
                    setShowConfirmModal(true);

                    //  return;
                    // handleSubmit();
                  }}>
                  <Text style={AnalyaticsStyles.PreviousTextStyle}>
                    {t('Submit')}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={AnalyaticsStyles.CancelButton}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={AnalyaticsStyles.PreviousTextStyle}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
              <Loader visible={loading} />
            </View>
          </>
        )}
      </Formik>

      <ConfirmationAlert
        message={alertMessage}
        iconVisible={true}
        modalVisible={alertVisible}
        setModalVisible={setAlertVisible}
        onPressCancel={() => setAlertVisible(!alertVisible)}
        onPress={() => {
          setAlertVisible(!alertVisible), onoknutton();
        }}
        buttonText={t('Ok')}
        buttonminview={Style.ButtonCenter}
      />
      <FamilyMemberAlert
        message={''}
        modalVisible={familyAlertVisible}
        setModalVisible={setFamilyAlertVisible}
        onPress={() => {
          setFamilyAlertVisible(!familyAlertVisible), onoknutton();
        }}
        buttonminview={Style.ButtonCenter}
        iconVisible={true}
        buttonText={t('Add')}
        count={familyMemberCount}
        familyMembers={familyMembers}
        setFamilyMembers={setFamilyMembers}
        onPressCancel={() => setFamilyAlertVisible(!familyAlertVisible)}
        handleMemberChange={handleMemberChange}
        editable={true}
      />
    </View>
  );
};
export default FamilyFormSurveyEdit;
