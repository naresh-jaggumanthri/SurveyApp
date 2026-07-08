import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
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
  StyleSheet,
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
  // FamilyMemberAlert,
  Button,
} from '../../../components';
import {Colors, SH, SF} from '../../../utils';
import {Image} from 'react-native-elements';
import {RouteName} from '../../../routes';
import {SW} from '../../../utils/dimensions';
// import FamilyalertModal from '../../../components/commonComponents/FamilyMemberAlert';
import api from '../../../api';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {
  HouseHoldFormInitialValues,
  HouseHoldFormValidationSchema,
  HouseHoldValidationSchema,
  isEligibleForNext,
} from './FamilyFormHelper';
import PubSub from 'pubsub-js';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import Loader from '../../../components/commonComponents/Loader';
import DeviceHelper from '../../../utils/DeviceHelper';
import {AppDataSource} from '../../../database/database';
import {HouseholdSurvey} from '../../../database/entities/HouseholdSurvey';
import {v4 as uuidv4} from 'uuid';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {AppOkAlert} from '../../../utils/AlertHelper';
import {err} from 'react-native-svg';
import propTypes from 'prop-types';
import {counterEvent} from 'react-native/Libraries/Performance/Systrace';
import {getMasterData} from './HomeHelper';
import { getMasterLocationData } from '../../Authantication/LoginScreen/LoginHelper';

const FamilyFormSurveyTab = props => {
  const {t, i18n} = useTranslation();
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
  const [involvedWaterSource, setInvolvedWaterSource] = useState(null);
  const [selectedSchemes, setSelectedSchemes] = useState(null);
  const [kishanSchemeCoverage, setKishanSchemeCoverage] = useState('');
  const [isCoveredUnderPMSBY, setIsCoveredUnderPMSBY] = useState(null);
  const [isCoveredUnderPMJJBY, setIsCoveredUnderPMJJBY] = useState(null);
  const [isOldAgePension, setIsOldAgePension] = useState(null);
  const [isWidowPension, setIsWidowPension] = useState(null);
  const [isAtalPensionYojana, setIsAtalPensionYojana] = useState(null);
  const [isDisabilityPension, setIsDisabilityPension] = useState(null);
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
  const [ifscCode, setIfscCode] = useState(null);
  const [ifscCodeList, setIfscCodeList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState(false);
  const [imgpathselect, SetImgpathselect] = useState('');
  const isFocused = useIsFocused();
  const [nameError, setNameError] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getLocation();
    // if (isFocused) {

    const token = PubSub.subscribe('familyData', (msg, data) => {
      //  Alert.alert('Family Data Received', JSON.stringify(data));
      setFamilyMembers(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };

    // }
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

  // const socialCatData = [
  //   {label: 'ST', value: 'ST'},
  //   {label: 'SC', value: 'SC'},
  //   {label: 'OBC', value: 'OBC'},
  //   {label: 'General', value: 'General'},
  //   {label: 'PVTGS', value: 'PVTGS'},
  // ];
  const [socialCatData, setSocialCatData] = useState([]);
   const loadSocialCategories = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const categories = await getMasterData(
      'socialCategory',
      4, // The index you assigned in saveMasters
      api.master.getSocialCategory,
      token,
    );
    const result = categories.map(category => {
      return {
        id: category.id,
        label:
          currentLanguage === 'en' ? category.categoryName : category.categoryNameLocal,
        value:
          currentLanguage === 'en' ? category.categoryName : category.categoryNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setSocialCatData(result);
  };

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
const [occupationDropDownData, setOccupationData] = useState([]);
  const loadOccupations = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const occupations = await getMasterData(
      'primaryOccupation',
      10, // The index you assigned in saveMasters
      api.master.getPrimaryOccupation,
      token,
    );
    const result = occupations.map(occupation => {
      return {
        id: occupation.id,
        label:
          currentLanguage === 'en' ? occupation.occupationName : occupation.occupationNameLocal,
        value:
          currentLanguage === 'en' ? occupation.occupationName : occupation.occupationNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setOccupationData(result);
  };

  

  // const occupationDropDownData = [
  //   {label: 'Agriculture', value: 'Agriculture'},
  //   {label: 'Daily Wage Labour', value: 'Daily Wage Labour'},
  //   {label: 'Self employed', value: 'Self employed'},
  //   {label: 'Govt./Private Service', value: 'Govt./Private Service'},
  //   {label: 'Other User entry', value: 'Other User entry'},
  // ];
  const arrayData = [
    {label: t('Survey_Title_21'), value: 'option1'},
    {label: t('Survey_Title_22'), value: 'option2'},
    {label: t('Survey_Title_23'), value: 'option3'},
  ];
  const selfHelpData = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
  ];
  const selfHelpData2 = [
    {label: t('Yes'), value: true},
    {label: t('No'), value: false},
    // {label: t('Recently'), value: false},
    // {label: t('Within the last year'), value: false},
    // {label: t('Earlier'), value: false},
  ];
  const fraHelpData = [
    {label: t('FRA Claimant'), value: t('FRA Claimant')},
    {label: t('Not a FRA Claimant'), value: t('Not a FRA Claimant')},
  ];
  
  // const privateLandData = [
  //   {label: t('Landless'), value: 'Landless'},
  //   {label: t('0-0.5Acr'), value: '0- 0.5 Acr'},
  //   {label: t('0.5-1Acr'), value: '0.5- 1 Acr'},
  //   {label: t('1-2.5Acr'), value: '1 - 2.5 Acr'},
  //   {label: t('more than 2.5Acr'), value: 'more than 2.5 Acr'},
  // ];
  const [privateLandData, setPrivateLandData] = useState([]);
    const loadPrivateLandData = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const holdings = await getMasterData(
      'landHolding',
      11, // The index you assigned in saveMasters
      api.master.getLandHolding,
      token,
    );
    const result = holdings.map(holding => {
      return {
        id: holding.id,
        label:
          currentLanguage === 'en' ? holding.holdingSize : holding.holdingSizeLocal,
        value:
          currentLanguage === 'en' ? holding.holdingSize : holding.holdingSizeLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setPrivateLandData(result);
    };
 
  // const waterSourceData = [
  //   {label: t('Well'), value: t('Well')},
  //   {label: t('Tube Well'), value: t('Tube Well')},
  //   {label: t('Piped Water Supply'), value: t('Piped Water Supply')},
  //   {label: t('Others'), value: t('Others')},
  // ];
   const [waterSourceData, setWaterSourceData] = useState([]);
   const [checkboxes4, setCheckboxes4] = useState([]);
   const loadWaterSourceData = async () => {
    let token = loginData?.token;
      const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const waterSources = await getMasterData(
      'drinkingWaterSource',
      5, // The index you assigned in saveMasters
      api.master.getDrinkingWaterSource,
      token,
    );
    const result = waterSources.map(waterSource => {
      return {
        id: waterSource.id,
        label:
          currentLanguage === 'en' ? waterSource.sourceName : waterSource.sourceNameLocal,
        value:
          currentLanguage === 'en' ? waterSource.sourceName : waterSource.sourceNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setWaterSourceData(result);
    setCheckboxes4(result.map(source => ({label: source.label, checked: false})));
  };

  // const schemeData = [
  //   {label: t('PM Kishan'), value: t('PM Kishan')},
  //   {label: t('CM Kishan'), value: t('CM Kishan')},
  //   {label: t('Both'), value: t('Both')},
  // ];
  // const genderData = [
  //   {label: t('mMale'), value: t('mMale')},
  //   {label: t('fFemale'), value: t('fFemale')},
  //   {label: t('Others'), value: t('Others')},
  // ];

  const [genderData, setGenderData] = useState([]);

  // Example: Getting Gender List
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

  
  // const respondantData = [
  //   {label: t('Migrant Person himself'), value: t('Migrant Person himself')},
  //   {
  //     label: t('Others'),
  //     value: t('Others'),
  //   },
  //   {
  //     label: t('Village Head/Ward Member'),
  //     value: t('Village Head/Ward Member'),
  //   },
  //   {label: t('Neighbour'), value: t('Neighbour')},
  //   {label: t('Head of the household'), value: t('Head of the household')},
  // ];
  const [respondantData, setRespondentData] = useState([]);
  const loadRespondentData = async () => {
    let token = loginData?.token;

    const currentLanguage = i18n.language;

    //  const language = await getLanguage();
    const respondentIdentities = await getMasterData(
      'respondentIdentity',
      6, // The index you assigned in saveMasters
      api.master.getRespondentIdentity,
      token,
    );

    const result = respondentIdentities.map(respondentIdentity => {
      return {
        id: respondentIdentity.id,
        label:
          currentLanguage === 'en' ? respondentIdentity.identityName : respondentIdentity.identityNameLocal,
        value:
          currentLanguage === 'en' ? respondentIdentity.identityName : respondentIdentity.identityNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Gender data fetched successfully!'+JSON.stringify(result));
    setRespondentData(result);
  };


  const [checkboxes, setCheckboxes] = useState([
    {label: t('Survey_Title_24'), checked: false},
    {label: t('Survey_Title_25'), checked: false},
    {label: t('Survey_Title_26'), checked: false},
    {label: t('Survey_Title_27'), checked: false},
    {label: t('Survey_Title_28'), checked: false},

    // Add more options as needed
  ]);
  
  const [checkboxes2, setCheckboxes2] = useState([]);

  //   {label: t('Major'), checked: false},
  //   {label: t('Minor'), checked: false},
  //   {label: t('Medium'), checked: false},
  //   {label: t('Lift Irrigation'), checked: false},
  //   {label: t('Check dam'), checked: false},
  //   {label: t('Canal'), checked: false},
  //   {label: t('Bore Well'), checked: false},
  //   {label: t('Dug Well'), checked: false},
  //   {label: t('Farm pond'), checked: false},
  //   {label: t('Others'), checked: false},

  //   // Add more options as needed
  // ]);
  

  const [irrigationData, setIrrigationData] = useState([]);
  const loadIrrigationData = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const irrigationSources = await getMasterData(
      'irrigationSource',
      9, // The index you assigned in saveMasters
      api.master.getIrrigationSource,
      token,
    );
    const result = irrigationSources.map(source => {
      return {
        id: source.id,
        label:
          currentLanguage === 'en' ? source.sourceName : source.sourceNameLocal,
        value:
          currentLanguage === 'en' ? source.sourceName : source.sourceNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setIrrigationData(result);
    setCheckboxes2(result.map(source => ({label: source.label, checked: false})));
  };


  
  //   {label: t('Poultry'), checked: false},
  //   {label: t('Goatery'), checked: false},
  //   {label: t('Dairy'), checked: false},
  //   {label: t('Others'), checked: false},
  //   {label: t('None'), checked: false},

  //   // Add more options as needed
  // ]);
const [checkboxes3, setCheckboxes3] = useState([]);
const [livestockData, setLivestockData] = useState([]);
   const loadLiveStockData = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const livestockactivities = await getMasterData(
      'livestockActivity',
      12, // The index you assigned in saveMasters
      api.master.getLivestockActivity,
      token,
    );
    const result = livestockactivities.map(activity => {
      return {
        id: activity.id,
        label:
          currentLanguage === 'en' ? activity.activityType : activity.activityTypeLocal,
        value:
          currentLanguage === 'en' ? activity.activityType : activity.activityTypeLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    setLivestockData(result);
    setCheckboxes3(result.map(activity => ({label: activity.label, checked: false})));
  };

 
  

  // const [checkboxes4, setCheckboxes4] = useState([
  //   {label: t('Well'), checked: false},
  //   {label: t('Tube Well'), checked: false},
  //   {label: t('Piped Water Supply'), checked: false},
  //   {label: t('Others'), checked: false},

  //   // Add more options as needed
  // ]);
  const [checkboxes5, setCheckboxes5] = useState([]);
  //   {label: t('PM Kishan'), checked: false},
  //   {label: t('CM Kishan'), checked: false},
  //   // {label: t('Both'), checked: false},
  //   {label: t('None'), checked: false},

  //   // Add more options as needed
  // ]);
  const [schemeData, setSchemeData] = useState([]);
   const loadSchemesData = async () => {
    let token = loginData?.token;
    const currentLanguage = i18n.language;
    //  const language = await getLanguage();
    const schemes = await getMasterData(
      'kishanScheme',
      12, // The index you assigned in saveMasters
      api.master.getKishanScheme,
      token,
    );
    const result = schemes.map(scheme => {
      return {
        id: scheme.id,
        label:
          currentLanguage === 'en' ? scheme.schemeName : scheme.schemeNameLocal,
        value:
          currentLanguage === 'en' ? scheme.schemeName : scheme.schemeNameLocal,
      };
    }); // Sort alphabetically

    // Alert.alert('Success', 'Occupation data fetched successfully!'+JSON.stringify(result));
    let finalResult = result.filter(scheme => scheme.id !== 3);
    setSchemeData(finalResult);
    setCheckboxes5(finalResult.map(scheme => ({label: scheme.label, checked: false})));
  };

  const migrationData = [
    {label: t('1-3months'), value: '1-3 months'},
    {label: t('4-6months'), value: '4-6 months'},
    {label: t('7-12months'), value: '7-12 months'},
  ];
  const [checkboxesSkill, setCheckboxesSkill] = useState([
    {label: t('DDUGKY'), checked: false, mainIndex: 0},
    {label: t('RSETI'), checked: false, mainIndex: 0},
    {label: t('Other'), checked: false, mainIndex: 0},
    {label: t('None'), checked: false, mainIndex: 0},

    // Add more options as needed
  ]);
  const [checkboxesSector, setCheckboxesSector] = useState([
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
  const {loginData} = useSelector(state => state.DataReducer) || {};

  const [dateSelectLocal, setDateSelectLocal] = useState(
    moment(new Date(), 'YYYY-MM-DDTHH:mm:ss Z')
      .local()
      .format('DD-MM-YYYY HH:mm'),
  );

  var mySubscriber = function (msg, data) {
    // console.log(msg, data);
    // Alert.alert("Data",JSON.stringify(data));
    setEditData(data);
    if (data && formikRef.current) {
      formikRef.current.resetForm({
        values: {
          ...HouseHoldFormInitialValues(props),
          ...data.item,
        },
      });
      const result = data?.item;
    }
  };
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const fiveRef = useRef();
  useEffect(() => {
    // getLocation();
    // Alert.alert("hi");
    loadGenders();
    loadOccupations();
    loadSocialCategories();
    loadWaterSourceData();
    loadRespondentData();
    loadPrivateLandData();
    loadIrrigationData();
    loadLiveStockData();
    loadSchemesData();
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

  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question number

  // Your state and other variables...
  const [familyAlertVisible, setFamilyAlertVisible] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMemberCount, setFamilyMemberCount] = useState(0);
  const [headName, setHeadName] = useState('');

  const handleAddFamilyMember = () => {
    // Alert.alert('headName',JSON.stringify(headName));
    try {
      const res = {
        name: headName,
        count: familyMemberCount,
        type: 1,
      };
      if (!headName) {
        setNameError(t('Please enter the name of the head of the household'));
        return;
      }
      setTimeout(() => {
        PubSub.publish('count', res);
      }, 10);

      navigation.navigate(RouteName.ADD_FAMILY_SCREEN);
    } catch (err) {
      Alert.alert(
        'Error',
        'An error occurred while adding family member. Please try again.',
      );
    }
  };

 
  // Get Districts
const getMasterState = async () => {
  const token = loginData?.token;
  const districts = await getMasterLocationData('district',null,() => api.master.getDistricts(token));
  setDistrict(districts.map(m => ({ label: m.districtName, value: m.districtCode })));
};

  // Get Blocks
const getBlocks = async (districtId) => {
  const token = loginData?.token;
  const data = await getMasterLocationData('block', districtId, () => api.master.getBlocksByDistrictId(districtId, token));
  setBlocks(data.map(m => ({ label: m.blockName, value: m.blockCode })));
};
 

  // Get Panchayats
const getPanchayats = async (blockId) => {
  const token = loginData?.token;
  const data = await getMasterLocationData('panchayat', blockId, () => api.master.getGramPanchayats(blockId, token));
  setPanchayats(data.map(m => ({
    label: m.panchayatName,
    value: m.panchayatCode,
    blockId: m.blockCode,
  })));
};

 // Get Villages
const getVillages = async (panchayatId) => {
  const token = loginData?.token;
  const data = await getMasterLocationData('village', panchayatId, () => api.master.getVillagesByPanchayatId(panchayatId, token));
  setVillages(data.map(m => ({
    label: m.villageName,
    value: m.villageCode,
    panchayatId: m.panchayatCode,
  })));
};


 const getBankList = async () => {
    let token = loginData?.token;
    // const res = await api.master.getBanks(token);
    // const result = res.map(m => {
    //   return {
    //     label: m.bankName,
    //     value: m.id,
    //   };
    // });
      const data = await getMasterLocationData('banks',null, () => api.master.getBanks(token));
  setBankList(data.map(m => ({
    label: m.bankName,
    value: m.id,
  })));
    // setBankList(result);
  };

const handleNext = () => {
    // goToTop();

    if (currentQuestion == 1) {
      twoRef.current?.focus();
    }
    if (currentQuestion == 2) {
      threeRef.current?.focus();
    }
    if (currentQuestion == 3) {
      fourRef.current?.focus();
    }
    if (currentQuestion == 4) {
      fiveRef.current?.focus();
    }
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
    if (currentQuestion == 2) {
      twoRef.current?.focus();
    }
    if (currentQuestion == 3) {
      threeRef.current?.focus();
    }
    if (currentQuestion == 4) {
      fourRef.current?.focus();
    }
    if (currentQuestion == 3) {
      fiveRef.current?.focus();
    }

    if (currentQuestion > 1) {
      const updatedColors = [...backgroundColors];
      updatedColors[currentQuestion - 2] = Colors.light_gray_text_color; // Reset background color of previous view
      setBackgroundColors(updatedColors);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

 
  var alertdata = {
    logout: t('Survey_Title_33'),
  };
  const onoknutton = () => {
    //  Alert.alert("Analytics Screen",JSON.stringify(familyMembers));
    // setAlertMessage(false);
    navigation.navigate('HomeScsreenTabAll', {
        screen: RouteName.HOME_TAB,
      });
   
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
      setAlertMessage(response.message);
      // setAlertMessage(t('Something_Went_Wrong_Please_Try_Again_Later'));
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
              const {latitude, longitude,accuracy} = position.coords;
              console.log(latitude, longitude,accuracy);
              setLocation(position);
            },
            error => {
              console.log(error.message);
            },
            {
              enableHighAccuracy: false,
              timeout: 60000,
              maximumAge: 10000,
              distanceFilter: 500,
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

  const getBankIfscCodeByBankName = async (bankName, setFieldValue) => {
    let token = loginData?.token;
    const res = await api.user.getBankIfscCodeByBankName(bankName, token);

    const result = res?.map(m => {
      return {
        label: m.ifsCode,
        value: m.ifsCode,
        ifscCode: m.ifsCode,
      };
    });
    setIfscCodeList(result);
    // Alert.alert("IFSC Codes",JSON.stringify(result));

    setIfscCode(result[0]?.ifscCode || null);
    setFieldValue('householdBasicProfile.ifscCodeOrBranch', ifscCode);
  };

  const handleAddPress = () => {
    setAlertVisible(!alertVisible);
    onoknutton();
  };

  const scrollRef = useRef(null);
  const goToTop = () => {
    // 2. Call the scrollTo method
    scrollRef?.current?.scrollTop({
      y: 0,
      animated: true,
    });
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
          //         formData.append('respondentPhoto', {
          //   uri: "https://example.com/photos/respondent.jpg",//imageData.uri,
          //   type: 'image/jpeg',//imageData.type || 'image/jpeg',
          //   name: 'upload.jpg',//</View>imageData.fileName || 'upload.jpg',
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
            <KeyboardAwareScrollView
              ref={scrollRef}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={Style.ScrollViewStyles}>
              {/* <KeyboardAwareScrollView> */}
              <Spacing space={SH(10)} />
              <View style={AnalyaticsStyles.MainView}>
                {currentQuestion === 1 && (
                  <View>
                    {/* District */}
                    <Text ref={oneRef} style={AnalyaticsStyles.TitleStyle}>
                      {'A. ' + t('Demographic Profile')}
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
                        setFieldValue('householdBasicProfile.block', obj.label);
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
                        const filteredText = text.replace(
                          /[^a-zA-Z\s!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|]/g,
                          '',
                        );
                        setFieldValue(
                          'householdBasicProfile.hamlet',
                          filteredText,
                        );
                      }}
                      value={values?.householdBasicProfile?.hamlet}
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      maxLength={30}
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.hamlet}
                    </Text>
                    <Spacing space={SH(15)} />
                    <Input
                      title={'6. ' + t('Nearest Landmark')}
                      placeholder={t('Nearest Landmark')}
                      onChangeText={text => {
                        const filteredText = text.replace(
                          /[^a-zA-Z\s!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|]/g,
                          '',
                        );
                        setFieldValue(
                          'householdBasicProfile.nearestLandmark',
                          filteredText,
                        );
                      }}
                      value={values?.householdBasicProfile?.nearestLandmark}
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      maxLength={30}
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.nearestLandmark}
                    </Text>
                    <Spacing space={SH(15)} />
                    <Input
                      title={
                        '7. ' +
                        t('Name of Head of the Household as per Aadhar Card ?')
                      }
                      placeholder={t(
                        'Name of Head of the Household as per Aadhar Card ?',
                      )}
                      onChangeText={text => {
                        const filteredText = text.replace(
                          /[^a-zA-Z\s!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|]/g,
                          '',
                        );
                        setFieldValue(
                          'householdBasicProfile.headOfTheHouseholdNameAsPerAadhar',
                          filteredText,
                        );
                        setHeadName(filteredText);
                      }}
                      value={
                        values?.householdBasicProfile
                          ?.headOfTheHouseholdNameAsPerAadhar
                      }
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      maxLength={30}
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

                    {/* <Spacing space={SH(15)} />
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
                    </Text> */}

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
                      {errors?.householdBasicProfile?.headOfTheHouseholdGender}
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
                      {'B. ' + t('Bank Account Details of Head of Household')}
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
                        getBankIfscCodeByBankName(obj.label, setFieldValue);

                        //  setIfscCode(result[0]?.ifscCode || null);

                        setFieldValue(
                          'householdBasicProfile.bankName',
                          obj.label,
                        );
                        // Alert.alert("Selected Bank",JSON.stringify(ifscCode));
                        setFieldValue(
                          'householdBasicProfile.ifscCodeOrBranch',
                          ifscCode,
                        );
                      }}
                      searchPlaceholder={'Search ...'}
                    />

                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.bankName}
                    </Text>

                    <Spacing space={SH(15)} />
                    <Input
                      title={'12. ' + t('Bank Account No')}
                      placeholder={t('Bank Account No')}
                      onChangeText={text => {
                        const filteredText = text.replace(/[^0-9]/g, '');
                        setFieldValue(
                          'householdBasicProfile.bankAccountNumber',
                          filteredText,
                        );
                      }}
                      value={values?.householdBasicProfile?.bankAccountNumber}
                      inputType="numeric"
                      maxLength={12}
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.bankAccountNumber}
                    </Text>
                    <Spacing space={SH(5)} />
                    {ifscCodeList?.length > 1 && (
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        13. {t('IFSC code / Branch')}
                      </Text>
                    )}
                    <Spacing space={SH(5)} />
                    {ifscCodeList?.length > 1 && (
                      <DropDown
                        data={ifscCodeList}
                        dropdownStyle={{marginLeft: SH(10)}}
                        width={SW(345)}
                        labelField="label"
                        valueField="value"
                        // value={
                        //   ifscCode ||
                        //   values?.householdBasicProfile?.ifscCodeOrBranch
                        // }
                        value={ifscCode}
                        // placeholder={
                        //   values?.householdBasicProfile?.bankName ||
                        //   t('Select IFSC Code')
                        // }
                         placeholder={
                          t('Select IFSC Code')
                        }
                        onChange={obj => {
                          //  Alert.alert("Selected Bank",JSON.stringify(obj));
                          // getBankIfscCodeByBankName(obj.label);
                          setIfscCode(obj.label);
                          setFieldValue(
                            'householdBasicProfile.ifscCodeOrBranch',
                            obj.label,
                          );
                        }}
                        searchPlaceholder={'Search ...'}
                      />
                    )}
                    {ifscCode != null &&
                      ifscCodeList.length > 0 &&
                      ifscCodeList.length == 1 && (
                        <Input
                          title={'13. ' + t('IFSC code / Branch')}
                          placeholder={t('IFSC code / Branch')}
                          maxLength={15}
                          autoCapitalize="characters"
                          onChangeText={text => {
                            const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

                            if (ifscRegex.test(text)) {
                              // console.log('Valid IFSC');
                              setFieldValue(
                                'householdBasicProfile.ifscCodeOrBranch',
                                text,
                              );
                              setIfscCode(text);
                              if (text.length > 10) {
                                if (bankList.length == 0) {
                                  getBankDetailsByIfscCode(text);
                                }
                                async function getBankDetailsByIfscCode(
                                  ifscCode,
                                ) {
                                  let token = loginData?.token;
                                  const res =
                                    await api.user.getBankDetailsByIfscCode(
                                      ifscCode,
                                      token,
                                    );
                                  //  Alert.alert("Bank Details",JSON.stringify(res));
                                  setBankList([...bankList, ...res]);
                                  let bankName = res[0]?.bankName || '';
                                  setFieldValue(
                                    'householdBasicProfile.bankName',
                                    bankName,
                                  );

                                  return res;
                                }
                              }
                            } else {
                              setFieldValue(
                                'householdBasicProfile.ifscCodeOrBranch',
                                text,
                              );
                              setIfscCode(text);
                              console.log('Invalid IFSC');
                            }
                            // const formattedText = text
                            //   .toUpperCase()
                            //   .replace(/^[A-Z]{4}0[A-Z0-9]{6}$/, ''); // ❌ removes special chars
                          }}
                          value={
                            ifscCode ||
                            values?.householdBasicProfile?.ifscCodeOrBranch
                          }
                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        />
                      )}
                    {values?.householdBasicProfile?.bankName == null && (
                      <Input
                        title={'13. ' + t('IFSC code / Branch')}
                        placeholder={t('IFSC code / Branch')}
                        maxLength={15}
                        autoCapitalize="characters"
                        onChangeText={text => {
                          const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

                          if (ifscRegex.test(text)) {
                            // console.log('Valid IFSC');
                            setFieldValue(
                              'householdBasicProfile.ifscCodeOrBranch',
                              text,
                            );
                            setIfscCode(text);
                            if (text.length > 10) {
                              // if(bankList.length==0){
                              getBankDetailsByIfscCode(text);
                              // }
                              async function getBankDetailsByIfscCode(
                                ifscCode,
                              ) {
                                let token = loginData?.token;
                                const res =
                                  await api.user.getBankDetailsByIfscCode(
                                    ifscCode,
                                    token,
                                  );
                                //  Alert.alert("Bank Details",JSON.stringify(res));
                                setBankList([...bankList, ...res]);
                                let bankName = res[0]?.bankName || '';
                                if (
                                  bankName !== '' &&
                                  bankName != null &&
                                  bankName != undefined
                                ) {
                                  setIfscCode(text);
                                  setIfscCodeList([
                                    {label: text, value: text, ifscCode: text},
                                  ]);
                                }
                                setFieldValue(
                                  'householdBasicProfile.bankName',
                                  bankName,
                                );

                                return res;
                              }
                            }
                          } else {
                            setFieldValue(
                              'householdBasicProfile.ifscCodeOrBranch',
                              text,
                            );
                            setIfscCode(text);
                            console.log('Invalid IFSC');
                          }
                          // const formattedText = text
                          //   .toUpperCase()
                          //   .replace(/^[A-Z]{4}0[A-Z0-9]{6}$/, ''); // ❌ removes special chars
                        }}
                        value={
                          ifscCode ||
                          values?.householdBasicProfile?.ifscCodeOrBranch
                        }
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                    )}
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.ifscCodeOrBranch}
                    </Text>
                    <Spacing space={SH(5)} />
                    <Input
                      title={'14. ' + t('Total Number of Family Members')}
                      placeholder={t('Total Number of Family Members')}
                      onChangeText={text => {
                        try {
                          // Allow only numbers
                          const numericText = text.replace(/[^0-9]/g, '');

                          // Convert to number
                          const age = parseInt(
                            numericText == '' ? '0' : numericText,
                            10,
                          );
                          if(age==0){
                            setFamilyMembers([]);
                            setFamilyMemberCount(0);
                            return;
                          }

                          // Optional: Age range validation (1–120)
                          if (!numericText) {
                            setFieldValue(
                              'householdBasicProfile.totalFamilyMembers',
                              '',
                            );
                          } else if (age >= 1 && age <= 15) {
                            setFieldValue(
                              'householdBasicProfile.totalFamilyMembers',
                              age,
                            );
                          }

                          setFamilyMemberCount(age);
                        } catch (e) {}

                        // setFieldValue(
                        //   'householdBasicProfile.totalFamilyMembers',
                        //   text,
                        // );
                      }}
                      value={familyMemberCount?.toString()||values?.householdBasicProfile?.totalFamilyMembers}
                      inputType="numeric"
                      maxLength={3}
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                    />

                    {familyMemberCount > 0 && (
                      <TouchableOpacity
                        style={AnalyaticsStyles.addButton}
                        onPress={() => {
                          handleAddFamilyMember();
                        }}>
                        <Text style={AnalyaticsStyles.PreviousTextStyle}>
                          {t('Add Member')}
                        </Text>
                      </TouchableOpacity>
                    )}
                     {familyMemberCount > 0 && (<Text style={{fontWeight: 'bold'}}>
                      {t('House hold Members')}:
                    </Text>)}
                    {familyMembers?.map((m, i) => (
                      <Text key={i}>
                        {i + 1}. {m.name} | Age: {m.age} | Gender: {m.gender}
                      </Text>
                    ))}
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.totalFamilyMembers}
                    </Text>
                  </View>
                )}
                {currentQuestion === 3 && (
                  <View>
                    <Text refs={threeRef} style={AnalyaticsStyles.TitleStyle}>
                      {'C. ' + t('Social Protection')}
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      15.{' '}
                      {t(
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
                      16.{' '}
                      {t(
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
                    {values.householdBasicProfile.hasRationCard && (
                      <Input
                        title={'18. ' + t('Ration Card number?')}
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
                        inputType={'numeric'}
                        keyboardType="numeric"
                        maxLength={12}
                      />
                    )}
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.rationCardNumber}
                    </Text>
                    <Spacing space={SH(30)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      19.{' '}
                      {t(
                        'What is the source of drinking water for the family?',
                      )}
                    </Text>
                    {/* {renderCheckboxes4()} */}
                    <RadioButton
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
                      type={1}
                    />
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
                          ? values.householdBasicProfile.hasUjjwalaLPGConnection
                          : isLpgConnectionUnderUjjwala
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.hasUjjwalaLPGConnection}
                    </Text>
                    <Spacing space={SH(10)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      21.{' '}
                      {t(
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
                      22.{' '}
                      {t(
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
                    {values.householdEntitlement?.hasMGNREGSJobCard && (
                      <Input
                        title={t(
                          'Mention the Full Job card No (after Revenue Village code)',
                        )}
                        placeholder={t(
                          'Mention the Full Job card No (after Revenue Village code)',
                        )}
                        onChangeText={text => {
                          // ✅ Allow only digits
                          let cleaned = text.replace(/[^0-9]/g, '');

                          // ✅ Restrict max length to 7
                          if (cleaned.length > 7) return;

                          setFieldValue(
                            'householdEntitlement.fullJobCardNumber',
                            cleaned,
                          );
                        }}
                        value={values?.householdEntitlement?.fullJobCardNumber}
                        inputType="numeric"
                        maxLength={7}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                    )}
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.fullJobCardNumber}
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      25.{' '}
                      {t(
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
                      {
                        errors?.householdEntitlement
                          ?.hasIndividualHouseholdLatrine
                      }
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      26.{' '}
                      {t('Whether the household has electricity connection?')}
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
                          ? values.householdEntitlement.hasElectricityConnection
                          : hasElectricityConnection
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.hasElectricityConnection}
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      27.{' '}
                      {t(
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
                      {
                        errors?.householdEntitlement
                          ?.isCoveredUnderAyushmanBharat
                      }
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      28.{' '}
                      {t(
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
                      {
                        errors?.householdEntitlement
                          ?.isEnrolledUnderShramYogiMaandhan
                      }
                    </Text>
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      29.{' '}
                      {t(
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
                          ? values.householdEntitlement.hasJanDhanYojanaAccount
                          : hasJanDhanYojanaAccount
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.hasJanDhanYojanaAccount}
                    </Text>

                    {/* new addition */}
                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      30.{' '}
                      {t(
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
                      31.{' '}
                      {t(
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
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      32.{' '}
                      {t(
                        'Whether all eligible Household members are covered under Atal Pension Yojana?',
                      )}
                    </Text>
                    <RadioButton
                      arrayData={selfHelpData}
                      onChangeText={text => {
                        setIsAtalPensionYojana(text);
                        // Alert.alert("text",JSON.stringify(text));
                        setFieldValue('householdEntitlement.atalPension', text);
                      }}
                      value={
                        editData != undefined
                          ? values.householdEntitlement.atalPension
                          : isAtalPensionYojana
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.atalPension}
                    </Text>

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      33.{' '}
                      {t(
                        'Whether all eligible member above the age of 60 are getting oldage pension ?',
                      )}
                    </Text>
                    <RadioButton
                      arrayData={selfHelpData}
                      onChangeText={text => {
                        setIsOldAgePension(text);
                        setFieldValue(
                          'householdEntitlement.oldagePension',
                          text,
                        );
                      }}
                      value={
                        editData != undefined
                          ? values.householdEntitlement.oldagePension
                          : isOldAgePension
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.oldagePension}
                    </Text>

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      34.{' '}
                      {t(
                        'Whether all eligible member are getting widow pension ?',
                      )}
                    </Text>
                    <RadioButton
                      arrayData={selfHelpData}
                      onChangeText={text => {
                        setIsWidowPension(text);
                        setFieldValue(
                          'householdEntitlement.widowPension',
                          text,
                        );
                      }}
                      value={
                        editData != undefined
                          ? values.householdEntitlement.widowPension
                          : isWidowPension
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.widowPension}
                    </Text>

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      35.{' '}
                      {t(
                        'Whether all eligible person with diability are getting pension ?',
                      )}
                    </Text>
                    <RadioButton
                      arrayData={selfHelpData}
                      onChangeText={text => {
                        setIsDisabilityPension(text);
                        setFieldValue(
                          'householdEntitlement.disabilityPension',
                          text,
                        );
                      }}
                      value={
                        editData != undefined
                          ? values.householdEntitlement.disabilityPension
                          : isDisabilityPension
                      }
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdEntitlement?.disabilityPension}
                    </Text>
                  </View>
                )}
                {/* Three question start */}
                {currentQuestion === 4 && (
                  <View>
                    <Text refs={threeRef} style={AnalyaticsStyles.TitleStyle}>
                      {'D. ' + t('Occupation & Resources')}
                    </Text>

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
                      {
                        errors?.householdOccupationAndLand
                          ?.primaryOccupationOfTheFamily
                      }
                    </Text>
                    {values?.householdOccupationAndLand
                      ?.primaryOccupationOfTheFamily === 'Other User entry' && (
                      <>
                        <Spacing space={SH(15)} />
                        <Input
                          title={t('Others')}
                          placeholder={t('Others')}
                          onChangeText={text => {
                            if (text.length < 3) {
                              return;
                            }
                            setFieldValue(
                              'householdOccupationAndLand.otherPrimaryOccupationDetails',
                              text,
                            );
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
                    <Text style={{color: 'red'}}>
                      {
                        errors?.householdOccupationAndLand
                          ?.otherPrimaryOccupationDetails
                      }
                    </Text>

                    {/* <Spacing space={SH(5)} /> */}
                    {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      37.{' '}
                      {t(
                        'Amount of Land holding under FRA- In Acres ? (If Not a FRA claimant.. Go to next Qn or else go to next to next Qn.)',
                      )}
                    </Text> */}
                    {/* <RadioButton
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
                          ? values.householdOccupationAndLand.fraClaimantStatus
                          : fraClaimantStatus
                      }
                    /> */}
                    {/* <Text style={{color: 'red'}}>
                      {errors?.householdOccupationAndLand?.fraClaimantStatus}
                    </Text> */}
                    {/* {values?.householdOccupationAndLand?.fraClaimantStatus ===
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
                            if ((filtered.match(/\./g) || []).length > 1)
                              return;

                            const value = Number(filtered);

                            // Allow empty input
                            if (filtered === '') {
                              setFieldValue(
                                'householdOccupationAndLand.fra_LandAmountInAcres',
                                '',
                              );
                              return;
                            }

                            // Block values > 5
                            if (value > 5) return;

                            setFieldValue(
                              'householdOccupationAndLand.fra_LandAmountInAcres',
                              value,
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
                    )} */}
                    {/* <Text style={{color: 'red'}}>
                      {
                        errors?.householdOccupationAndLand
                          ?.fra_LandAmountInAcres
                      }
                    </Text> */}

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      37. {t('Whether your family owns Homestead Patta land?')}
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
                      {
                        errors?.householdOccupationAndLand
                          ?.ownsHomesteadPattaLand
                      }
                    </Text>

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      38.{' '}
                      {t('Approximate private land holding of the Household?')}
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
                      type={1}
                    />
                    <Text style={{color: 'red'}}>
                      {
                        errors?.householdOccupationAndLand
                          ?.approximatePrivateLandHolding
                      }
                    </Text>

                    {approximatePrivateLandHolding != 'Landless' && (
                      <Spacing space={SH(5)} />
                    )}
                    {approximatePrivateLandHolding != 'Landless' && (
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        39. {t('Whether irrigation facility available?')}
                      </Text>
                    )}
                    {approximatePrivateLandHolding != 'Landless' && (
                      <RadioButton
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
                      />
                    )}

                    {approximatePrivateLandHolding != 'Landless' && (
                      <Text style={{color: 'red'}}>
                        {
                          errors?.householdOccupationAndLand
                            ?.isIrrigationFacilityAvailable
                        }
                      </Text>
                    )}

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
                      40. {t('Whether involved in livestock activity?')}
                    </Text>
                    {renderCheckboxes3()}
                    <Text style={{color: 'red'}}>
                      {
                        errors?.householdOccupationAndLand
                          ?.involvedInLivestockActivity
                      }
                    </Text>
                    {<Spacing space={SH(5)} />}
                  </View>
                )}

                {/*five question start */}
                {currentQuestion === 5 && (
                  <View>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {'E. ' + t('Additional Information of HH on Migration')}
                    </Text>

                    <Spacing space={SH(5)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      41.{' '}
                      {t(
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
                      {
                        errors?.householdMigrationStatus
                          ?.takenAdvanceForMigrationFromMiddleman
                      }
                    </Text>
                    <Spacing space={SH(5)} />
                    <Input
                      title={
                        '42. ' +
                        t(
                          'No of minor children accompanied during migration? (Less than 18 Yrs of age)',
                        )
                      }
                      // placeholder={t(
                      //   'No of minor children accompanied during migration? (Less than 18 Yrs of age)',
                      // )}
                      placeholder={t('Enter value (0-4 only)')}
                      value={
                        values?.householdMigrationStatus
                          ?.minorChildrenAccompaniedMigration
                      }
                      keyboardType="number-pad"
                      onChangeText={text => {
                        // allow only digits
                        const digitsOnly = text
                          .replace(/[^0-4]/g, '')
                          .slice(0, 1);

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
                      maxLength={1}
                      titleStyle={AnalyaticsStyles.PleaseEnterDate}
                    />

                    <Text style={{color: 'red'}}>
                      {
                        errors?.householdMigrationStatus
                          ?.minorChildrenAccompaniedMigration
                      }
                    </Text>

                    <Spacing space={SH(5)} />
                    <Input
                      title={'43. ' + t('Household contact mobile no.?')}
                      placeholder={t('Household contact mobile no.?')}
                      value={
                        values?.householdMigrationStatus?.familyContactMobileNo
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
                      {errors?.householdMigrationStatus?.familyContactMobileNo}
                    </Text>
                    <Spacing space={SH(10)} />
                    <Text style={AnalyaticsStyles.PleaseEnterDate}>
                      44. {t('Identity of the respondent?')}
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
                      type={1}
                    />
                    <Text style={{color: 'red'}}>
                      {errors?.householdMigrationStatus?.respondentIdentity}
                    </Text>

                    <Spacing space={SH(10)} />
                    <View style={AnalyaticsStyles.PaddingHori}>
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        45. {t('Click on the icon to capture GEO location')}
                      </Text>
                      <View style={{flexDirection:'column'}}>
                                           <View style={AnalyaticsStyles.PaddingHori}>
                                           
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
                                                   {location ? location.coords.latitude : null},
                                                   {location ? location.coords.longitude : null}
                                                  
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
                                             <View>
                                                <Text style={{color: 'black',fontSize: SF(12)}}>
                         Accuracy: {location.coords.accuracy.toFixed(1)} meters 
                         (The actual location is within this radius)
                       </Text>
                                             </View>
                                             </View>
                                           </View>
                    </View>
                    <Text style={{color: 'red'}}>
                      {errors?.householdBasicProfile?.geoLocation}
                    </Text>
                    <Spacing space={SH(5)} />
                    <Input
                      title={'46. ' + t('Surveyor Name')}
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
                      47. {t('Survey Date and Time')}
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
              {/* </KeyboardAwareScrollView> */}
            </KeyboardAwareScrollView>
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
                      {previewData?.householdBasicProfile?.nearestLandmark}
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

                    {/* <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('AADHAR No.')}:
                      </Text>{' '}
                      {previewData?.householdBasicProfile?.aadharNo}
                    </Text> */}
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

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        {t(
                          'Is any Women of the Family covered under Self Help Group(SHG)',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdBasicProfile
                          ?.isWomenCoveredUnderSHG}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether the women  member of the family covered under Subhadra Yojana',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdBasicProfile
                          ?.isWomenCoveredUnderSubhadraYojana}
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
                      {'' + previewData?.householdBasicProfile?.hasRationCard}
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
                      {'' +
                        previewData?.householdBasicProfile
                          ?.hasUjjwalaLPGConnection}
                    </Text>

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
                    </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Whether your family owns Homestead Patta land?')}:
                      </Text>{' '}
                      {'' +
                        previewData?.householdOccupationAndLand
                          ?.ownsHomesteadPattaLand}
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
                      {'' +
                        previewData?.householdOccupationAndLand
                          ?.isIrrigationFacilityAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('What are the sources of Irrigation?')}:
                      </Text>{' '}
                      {
                        previewData?.householdOccupationAndLand
                          ?.sourcesOfIrrigation
                      }
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        {t('Whether involved in livestock activity?')}:
                      </Text>{' '}
                      {'' +
                        previewData?.householdOccupationAndLand
                          ?.involvedInLivestockActivity}
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
                      {'' +
                        previewData?.householdEntitlement?.kishanSchemeCoverage}
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
                      {'' +
                        previewData?.householdEntitlement
                          ?.hasIndividualHouseholdLatrine}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Whether the household has electricity connection?')}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdEntitlement
                          ?.hasElectricityConnection}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether Covered under Pradhan Mantri Ayushman  Jan Arogya Yojana?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdEntitlement
                          ?.isCoveredUnderAyushmanBharat}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is any household member enrolled under Pradhan Mantri Shram Yogi Maandhan pension scheme?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdEntitlement
                          ?.isEnrolledUnderShramYogiMaandhan}
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
                      {'' +
                        previewData?.householdEntitlement?.isCoveredUnderPMJJBY}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether family members between age 18 to 70 years covered under Pradhan Mantri Suraksha Bima Yojana (PMSBY) ?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdEntitlement?.isCoveredUnderPMSBY}
                    </Text>
                    {/* newly added */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether all eligible Household members are covered under Atal Pension Yojana?',
                        )}
                        :
                      </Text>{' '}
                      {'' + previewData?.householdEntitlement?.atalPension}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether all eligible member above the age of 60 are getting oldage pension ?',
                        )}
                        :
                      </Text>{' '}
                      {'' + previewData?.householdEntitlement?.oldagePension}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether all eligible member are getting widow pension ?',
                        )}
                        :
                      </Text>{' '}
                      {'' + previewData?.householdEntitlement?.widowPension}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether all eligible person with disability are getting pension ?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdEntitlement?.disabilityPension}
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
                      {'' +
                        previewData?.householdMigrationStatus
                          ?.takenAdvanceForMigrationFromMiddleman}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Had the family taken any advance from middleman  for migration?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdMigrationStatus
                          ?.takenAdvanceForMigrationFromMiddleman}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether minor children accompanied during migration?',
                        )}
                        :
                      </Text>{' '}
                      {'' +
                        previewData?.householdMigrationStatus
                          ?.minorChildrenAccompaniedMigration}
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
                      <Text style={{color: 'green'}}>
                        {t('Confirm & Submit')}
                      </Text>
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
              {currentQuestion < 5 &&
                isEligibleForNext(
                  currentQuestion,
                  values,
                  involvedWaterSource,
                  involvedInLivestockActivity,
                  selectedSchemes,
                ) && (
                  <TouchableOpacity
                    style={AnalyaticsStyles.PreviousButton}
                    onPress={handleNext}>
                    <Text style={AnalyaticsStyles.PreviousTextStyle}>
                      {t('Survey_Title_48')}
                    </Text>
                  </TouchableOpacity>
                )}
              {currentQuestion == 5 &&
                isEligibleForNext(
                  currentQuestion,
                  values,
                  involvedWaterSource,
                  involvedInLivestockActivity,
                  selectedSchemes,
                ) && (
                  <TouchableOpacity
                    style={AnalyaticsStyles.SubmitButton}
                    onPress={() => {
                      // Alert.alert('errors',JSON.stringify(errors));
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
                      if (involvedWaterSource?.length > 0) {
                        let waterArray = '';
                        involvedWaterSource?.forEach(item => {
                          waterArray =
                            involvedWaterSource.length > 1
                              ? waterArray.concat(item + ', ')
                              : waterArray.concat(item);
                        });
                        //Alert.alert("involvedInLivestockActivity",JSON.stringify(livestockArray));
                        setFieldValue(
                          'householdBasicProfile.drinkingWaterSource',
                          waterArray,
                        );
                        setDrinkingWaterSource(waterArray);
                      }
                      if (selectedSchemes?.length > 0) {
                        let schemaArray = '';
                        selectedSchemes?.forEach(item => {
                          schemaArray =
                            selectedSchemes.length > 1
                              ? schemaArray.concat(item + ', ')
                              : schemaArray.concat(item);
                        });
                        //Alert.alert("involvedInLivestockActivity",JSON.stringify(livestockArray));
                        setFieldValue(
                          'householdEntitlement.kishanSchemeCoverage',
                          schemaArray,
                        );
                        //  setSelectedSchemesArray(schemaArray);
                      }

                      // setFieldValue(
                      //   'householdOccupationAndLand.sourcesOfIrrigation',
                      //   sourcesOfIrrigation,
                      // );

                      //  setFieldValue(
                      //         'householdBasicProfile.drinkingWaterSource',
                      //         text,
                      //       );
                      //       setDrinkingWaterSource(text);

                      setFieldValue(
                        'householdBasicProfile.surveyDate',
                        dateSelectLocal,
                      );
                      let res =
                      (location ? location.coords.latitude : null) +
                      ',' +
                      (location ? location.coords.longitude : null) + ',' + (location ? location.coords.accuracy.toFixed(1) : null);
                   
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
                        AppOkAlert(
                          errors.householdBasicProfile.block,
                          () => {},
                        );
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
                        AppOkAlert(
                          errors.householdBasicProfile.hamlet,
                          () => {},
                        );
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
                      // if (errors && errors?.householdBasicProfile?.aadharNo) {
                      //   AppOkAlert(
                      //     errors.householdBasicProfile.aadharNo,
                      //     () => {},
                      //   );
                      //   return;
                      // }
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
                        errors?.householdBasicProfile
                          ?.hasUjjwalaLPGConnection === false
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
                          errors?.householdMigrationStatus
                            ?.familyContactMobileNo,
                          () => {},
                        );
                        return;
                      }
                      if (
                        errors &&
                        errors?.householdMigrationStatus?.respondentIdentity
                      ) {
                        AppOkAlert(
                          'Please enter Respondent Identity',
                          () => {},
                        );
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
                      // if (
                      //   errors &&
                      //   errors?.householdOccupationAndLand?.fraClaimantStatus
                      // ) {
                      //   AppOkAlert('Please enter FRA Claimant Status', () => {});
                      //   return;
                      // }
                      if (
                        values?.householdOccupationAndLand
                          ?.fraClaimantStatus === 'FRA Claimant' &&
                        errors &&
                        errors?.householdOccupationAndLand
                          ?.fra_LandAmountInAcres
                      ) {
                        AppOkAlert(
                          errors.householdOccupationAndLand
                            .fra_LandAmountInAcres,
                          () => {},
                        );
                        return;
                      }
                      if (
                        errors &&
                        errors?.householdOccupationAndLand
                          ?.ownsHomesteadPattaLand
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

                      setTimeout(() => {
                        //  PubSub.publish('preview', finalValuesPreview);
                        setPreviewData(finalValuesPreview);
                      }, 50);
                      // setPreviewData(finalValuesPreview);

                      setShowConfirmModal(true);

                      //  return;
                      // handleSubmit();
                    }}>
                    <Text style={AnalyaticsStyles.PreviousTextStyle}>
                      {t('Submit')}
                    </Text>
                  </TouchableOpacity>
                )}
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
      {/* <FamilyMemberAlert
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
        // handleMemberChange={handleMemberChange}
        editable={false}
      />  */}
    </View>
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
export default FamilyFormSurveyTab;
