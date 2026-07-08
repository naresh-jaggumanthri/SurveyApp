import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import {useTheme} from '@react-navigation/native';
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
import {Formik} from 'formik';
import {
  VillageFormInitialValues,
  VillageFormValidationSchema,
} from './VillageFormHelper';
import api from '../../../api';
import {useSelector} from 'react-redux';
import PubSub from 'pubsub-js';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import {BackHandler} from 'react-native';
import Loader from '../../../components/commonComponents/Loader';
import DeviceHelper from '../../../utils/DeviceHelper';
import {v4 as uuidv4} from 'uuid';
import {getMasterLocationData} from '../../Authantication/LoginScreen/LoginHelper';
import { getMasterData } from './HomeHelper';
// import { VillageFormSurveyTab } from '.';

const VillageFormSurveyEdit = props => {
   const {t, i18n} = useTranslation();
  const {navigation} = props;

  const stateArray = {
    name: '',
    emailId: '',
    mobileNumber: '',
    QuestionOne: '',
    about: '',
  };
  const {loginData} = useSelector(state => state.DataReducer) || {};
  useEffect(() => {
    loadWaterSourceData();
    getMasterState();
  }, []);
  const [state, setState] = useState(stateArray);

   const [involvedWaterSource, setInvolvedWaterSource] = useState(null);

  const [blocks, setBlocks] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
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
    {label: 'Daughter', value: 'Daughter'},
    {label: 'Daughter-in-law', value: 'Daughter-in-law'},
    {label: 'Sister', value: 'Sister'},
    {label: 'Mother', value: 'Mother'},
    {label: 'Self', value: 'Self'},
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
  const selfHelpData2 = [
    {label: t('Yes'), value: t('Yes')},
    {label: t('No'), value: t('No')},
    {label: t('Partially'), value: t('Partially')},
  ];
  const electricityData = [
    {label: t('Solar'), value: 'Solar'},
    {label: t('Electric'), value: 'Electric'},
  ];
  const privateLandData = [
    {label: t('Landless'), value: 'Landless'},
    {label: t('0-0.5Acr'), value: '0-0.5Acr'},
    {label: t('0.5-1Acr'), value: '0.5-1Acr'},
    {label: t('1-2.5Acr'), value: '1-2.5Acr'},
    {label: t('more than 2.5Acr'), value: 'more than 2.5Acr'},
  ];
  const waterSourceData = [
    {label: t('Yes'), value: 'true'},
    {label: t('No'), value: 'false'},
    {label: t('Partially'), value: 'Partially'},
    // {label: t('Well'), value: t('Well')},
    // {label: t('Tube Well'), value: t('Tube Well')},
    // {label: t('Piped Water Supply'), value: t('Piped Water Supply')},
    // {label: t('Others'), value: t('Others')},
  ];
  const identityData = [
    {label: t('Village Head'), value: 'Village Head'},
    {label: t('Ward Member'), value: 'Ward Member'},
    {label: t('Sarpanch'), value: 'Sarpanch'},
    {label: t('SHG Leader'), value: t('SHG Leader')},
  ];
  const processAdoptedData = [
    {label: t('FGD'), value: 'FGD'},
    {label: t('Individual Interview'), value: 'Individual Interview'},
    {label: t('Meeting With PRI member'), value: 'Meeting With PRI member'},
    {label: t('Community Meeting'), value: t('Community Meeting')},
  ];
  const schemeData = [
    {label: t('PM Kishan'), value: t('PM Kishan')},
    {label: t('CM Kishan'), value: t('CM Kishan')},
    {label: t('Both'), value: t('Both')},
  ];

  const genderData = [
    {label: t('Male'), value: t('Male')},
    {label: t('Female'), value: t('Female')},
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

  const [dateSelectLocal, setDateSelectLocal] = useState(
    moment(new Date(), 'YYYY-MM-DDTHH:mm:ss Z')
      .local()
      .format('DD-MM-YYYY HH:mm'),
  );

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

  //  const [checkboxes4, setCheckboxes4] = useState([
  //     {label: t('Well'), checked: false},
  //     {label: t('Tube Well'), checked: false},
  //     {label: t('Piped Water Supply'), checked: false},
  //     {label: t('Others'), checked: false},

  //     // Add more options as needed
  //   ]);
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
   
    // Alert.alert('waterSources', JSON.stringify(waterSources));
    const result = waterSources.map(waterSource => {
      return {
        id: waterSource.id,
        label:
          currentLanguage === 'en'
            ? waterSource.sourceName
            : waterSource.sourceNameLocal,
        value:
          currentLanguage === 'en'
            ? waterSource.sourceName
            : waterSource.sourceNameLocal,
      };
    }); // Sort alphabetically
  const activeLabels=involvedWaterSource;
   const updatedCheckboxes = result.map(checkbox => ({
    ...checkbox,
    label: checkbox.label,
    checked: activeLabels.includes(checkbox.label)
  }));
    setCheckboxes4(updatedCheckboxes);
  };
  const handleCheckboxChange = index => {
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

  // Your state and other variables...
  const [familyAlertVisible, setFamilyAlertVisible] = useState(false);
  const handleAddFamilyMember = () => {
    // Alert.alert("inn");
    setFamilyAlertVisible(true);
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
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
  const handleCancel = () => {
    //Alert.alert("hello");
    navigation.goBack();
  };
  const [alertVisible, setAlertVisible] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    logout: t('Survey_Title_33'),
  };
  const onoknutton = () => {
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
    Array(9).fill(Colors.light_gray_text_color),
  ); // Initial background colors for 4 views
  const [isConcreteRoads, setIsConcreteRoads] = useState(null);
  const [InternalVillageRoadsRequirement, setInternalVillageRoadsRequirement] =
    useState(null);
  const [InternalDrainsAvailable, setInternalDrainsAvailable] = useState(null);

  const [DrainsProperlyFunctional, setDrainsProperlyFunctional] =
    useState(null);
  const [IsElectrified, setIsElectrified] = useState(null);
  const [StreetLightingAvailable, setStreetLightingAvailable] = useState(null);
  const [StreetLightingType, setStreetLightingType] = useState(null);
  const [VillageConnectedToGP, setVillageConnectedToGP] = useState(null);
  const [GPConnectedToPWDOrHighway, setGPConnectedToPWDOrHighway] =
    useState(null);
  const [DrinkingWaterSource, setDrinkingWaterSource] = useState(null);
  const [AllHouseholdsWithToilets, setAllHouseholdsWithToilets] =
    useState(null);
  const [AnganwadiCentre, setAnganwadiCentre] = useState(null);
  const [PrimarySchoolAvailable, setPrimarySchoolAvailable] = useState(null);
  const [SecondarySchoolWithin3km, setSecondarySchoolWithin3km] =
    useState(null);
  const [SubHealthCentre, setSubHealthCentre] = useState(null);
  const [CommunityCentreAvailable, setCommunityCentreAvailable] =
    useState(null);
  const [CommonShedForWSHG, setCommonShedForWSHG] = useState(null);
  const [PlaygroundAvailable, setPlaygroundAvailable] = useState(null);
  const [MobileNetworkCoverage, setMobileNetworkCoverage] = useState(null);
  const [DigitalConnectivity, setDigitalConnectivity] = useState(null);
  const [DryingYard, setDryingYard] = useState(null);
  const [PDSAvailable, setPDSAvailable] = useState(null);
  const [BankingPostOfficeNearby, setBankingPostOfficeNearby] = useState(null);
  const [WaterFromIrrigationProject, setWaterFromIrrigationProject] =
    useState(null);
  const [
    RepairOrNewDistributionCanalRequired,
    setRepairOrNewDistributionCanalRequired,
  ] = useState(null);
  const [FunctionalLiftIrrigation, setFunctionalLiftIrrigation] =
    useState(null);
  const [ScopeOfNewLiftIrrigation, setScopeOfNewLiftIrrigation] =
    useState(null);
  const [FunctionalCheckDams, setFunctionalCheckDams] = useState(null);
  const [ScopeOfNewCheckDams, setScopeOfNewCheckDams] = useState(null);
  const [FunctionalDistributionCanal, setFunctionalDistributionCanal] =
    useState(null);
  const [IdentityRole, setIdentityRole] = useState(null);
  const [SurveyProcess, setSurveyProcess] = useState(null);
  const [editData, setEditData] = useState(undefined);
  const [previewData, setPreviewData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [location, setLocation] = useState(false);
  const formikRef = useRef(null);
  useLayoutEffect(() => {
    var token = PubSub.subscribe('VillageItem', mySubscriber);
    formikRef.current.resetForm({values: undefined});
  }, []);
  const toggleCheckbox4 = label => {
    const labelsToToggle = label.split(',').map(l => l.trim());
    setCheckboxes4(prev => {
      return prev.map(item => {
        // Case 1: User clicked "None"
        if (label === t('None')) {
          return item.label === t('None')
            ? {...item, checked: !item.checked}
            : {...item, checked: false}; // Uncheck everything else
        }

        // Case 2: User clicked a normal option, but "None" was previously checked
        if (item.label === t('None')) {
          return {...item, checked: false};
        }

        // Case 3: Standard matching logic

        return item.label === label || labelsToToggle.includes(item.label)
          ? {...item, checked: !item.checked}
          : item;
      });
    });
  };
 
  var mySubscriber = function (msg, data) {
    // console.log(msg, data);
    const drinkingWater = data?.item?.drinkingWaterSource || '';
    // Alert.alert("Drinking Water Source",JSON.stringify(drinkingWater));
    toggleCheckbox4(drinkingWater || '');
    const labelsArray2 = drinkingWater.split(',').map(s => s.trim());
    setDrinkingWaterSource(labelsArray2);
   
    setEditData(data);
    if (data && formikRef.current) {
      const resultData = data?.item;
       const apiString = resultData?.drinkingWaterSource || '';
       setInvolvedWaterSource(apiString);
      
      //  toggleCheckboxesFromString(apiString,checkboxes4);
      const resetData = {
        district: resultData.district,
        block: resultData.block,
        gramPanchayat: resultData.gramPanchayat,
        revenueVillage: resultData.revenueVillage,
        totalHouseholds: resultData.totalHouseholds,
        malePopulation: resultData.malePopulation,
        femalePopulation: resultData.femalePopulation,
        // internalVillageRoads: resultData.internalVillageRoads,
        // internalVillageRoadsRequirement:
        //   resultData.internalVillageRoadsRequirement,
        // internalDrainsAvailable: resultData.internalDrainsAvailable,
        // drainsProperlyFunctional: resultData.drainsProperlyFunctional,
        isElectrified: resultData.isElectrified,
        streetLightingAvailable: resultData.streetLightingAvailable,
        streetLightingType: resultData.streetLightingType,
        villageConnectedToGP: resultData.villageConnectedToGP,
        lengthAllWeatherRoadToGP: resultData.lengthAllWeatherRoadToGP,
        gpConnectedToPWDOrHighway: resultData.gpConnectedToPWDOrHighway,
        lengthAllWeatherRoadToHighway: resultData.lengthAllWeatherRoadToHighway,
        menInMigration: resultData.menInMigration,
        womenInMigration: resultData.womenInMigration,
        TotalPersonsInMigration: resultData.totalPersonsInMigration,
        minorChildrenInMigration: resultData.minorChildrenInMigration,
        drinkingWaterSource: resultData.drinkingWaterSource,
        allHouseholdsWithToilets: resultData.allHouseholdsWithToilets,
        anganwadiCentre: resultData.anganwadiCentre,
        primarySchoolAvailable: resultData.primarySchoolAvailable,
        secondarySchoolWithin3km: resultData.secondarySchoolWithin3km,
        subHealthCentre: resultData.subHealthCentre,
        communityCentreAvailable: resultData.communityCentreAvailable,
        commonShedForWSHG: resultData.commonShedForWSHG,
        playgroundAvailable: resultData.playgroundAvailable,
        communityTanks: resultData.communityTanks,
        // MobileNetworkCoverage: resultData.mobileNetworkCoverage,
        digitalConnectivity: resultData.digitalConnectivity,
        // DryingYard: resultData.dryingYard,
        pdsAvailable: resultData.pdsAvailable,
        // DistanceOfPDS: resultData.distanceOfPDS,
        bankingPostOfficeNearby: resultData.bankingPostOfficeNearby,
        waterFromIrrigationProject: resultData.waterFromIrrigationProject,
        // RepairOrNewDistributionCanalRequired:
        //   resultData.repairOrNewDistributionCanalRequired,
        // LengthOfDistributionCanal: resultData.lengthOfDistributionCanal,
        functionalLiftIrrigation: resultData.functionalLiftIrrigation,
        // ScopeOfNewLiftIrrigation: resultData.scopeOfNewLiftIrrigation,
          functionalCheckDams: resultData.functionalCheckDams,
        // ScopeOfNewCheckDams: resultData.scopeOfNewCheckDams,
        // FunctionalDistributionCanal: resultData.functionalDistributionCanal,
        // ScopeOfNewDistributionCanal: resultData.scopeOfNewDistributionCanal,
        respondentName: resultData.respondentName,
        identityRole: resultData.identityRole,
        // SurveyProcess: resultData.surveyProcess,
        respondentMobile: resultData.respondentMobile,
        // MeetingPhotoPath: resultData.meetingPhotoPath,
        geoLocation: resultData.geoLocation,
        enumeratorName: resultData.enumeratorName,
        surveyDate: resultData.surveyDate,
        TotalPopulation: resultData.totalPopulation,
      };
      formikRef.current.resetForm({
        values: {
          ...VillageFormInitialValues(props),
          ...resetData,
        },
      });
      const result = data?.item;
    }
  };

  // Get Districts
  const getMasterState = async () => {
    const token = loginData?.token;
    const districts = await getMasterLocationData('district', null, () =>
      api.master.getDistricts(token),
    );
    setDistrict(
      districts.map(m => ({label: m.districtName, value: m.districtCode})),
    );
  };

  // Get Blocks
  const getBlocks = async districtId => {
    const token = loginData?.token;
    const data = await getMasterLocationData('block', districtId, () =>
      api.master.getBlocksByDistrictId(districtId, token),
    );
    setBlocks(data.map(m => ({label: m.blockName, value: m.blockCode})));
  };

  // Get Panchayats
  const getPanchayats = async blockId => {
    const token = loginData?.token;
    const data = await getMasterLocationData('panchayat', blockId, () =>
      api.master.getGramPanchayats(blockId, token),
    );
    setPanchayats(
      data.map(m => ({
        label: m.panchayatName,
        value: m.panchayatCode,
        blockId: m.blockCode,
      })),
    );
  };

  // Get Villages
  const getVillages = async panchayatId => {
    const token = loginData?.token;
    const data = await getMasterLocationData('village', panchayatId, () =>
      api.master.getVillagesByPanchayatId(panchayatId, token),
    );
    setVillages(
      data.map(m => ({
        label: m.villageName,
        value: m.villageCode,
        panchayatId: m.panchayatCode,
      })),
    );
  };

  const saveSurveyOffline = async (values, imagePath) => {
    const repo = AppDataSource.getRepository(VillageSurvey);

    const survey = repo.create({
      localId: uuidv4(),
      householdId: values.id || null,
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
    const response = await api.user.saveMigrationSurveyData(
      null,
      values,
      token,
      false,
    );
    //Alert.alert("response",JSON.stringify(response));
    //return
    if (response != null && response != undefined) {
      setAlertVisible(true);
      setAlertMessage(t('Survey_Submit_Successfully_village'));
    } else {
      setAlertVisible(true);
      setAlertMessage(t('Something_Went_Wrong_Please_Try_Again_Later'));
    }
  };

  const getLocation = async () => {
    const result = requestLocationPermission();

    result.then(res => {
      console.log('res is:', res);
      if (res) {
        try {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude, accuracy} = position.coords;
              console.log(latitude, longitude, accuracy);

              setLocation(position);
            },
            error => {
              // Alert.alert("latitude, longitude",JSON.stringify(error));
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
      <Formik
        innerRef={formikRef}
        initialValues={VillageFormInitialValues(props)}
        validationSchema={VillageFormValidationSchema(props)}
        onSubmit={values => {
          // Alert.alert("VALUES",JSON.stringify(values));
          //return;

          onSavePress(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
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
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'A. ' + t('Basic Details')}
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
                                         value={values?.district}
                                         placeholder={values?.district || t('Select District')}
                                         onChange={obj => {
                                           // Alert.alert("hellll",JSON.stringify(label));
                                           getBlocks(obj.value);
                                           setFieldValue('district', obj.label);
                                         }}
                                       />
                                       <Text style={{color: 'red'}}>{errors?.district}</Text>
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
                                         value={values?.block}
                                         placeholder={values?.block || t('Select Block')}
                                         onChange={obj => {
                                           getPanchayats(obj.value);
                                           setFieldValue('block', obj.label);
                                         }}
                                       />
                                       <Text style={{color: 'red'}}>{errors?.block}</Text>
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
                                         value={values?.gramPanchayat}
                                         placeholder={
                                           values?.gramPanchayat || t('Select Gram Panchayat')
                                         }
                                         onChange={obj => {
                                           getVillages(obj.value);
                                           setFieldValue('gramPanchayat', obj.label);
                                         }}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.gramPanchayat}
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
                                         value={values?.revenueVillage}
                                         placeholder={
                                           values?.revenueVillage || t('Select Revenue Village')
                                         }
                                         onChange={obj => {
                                           setFieldValue('revenueVillage', obj.label);
                                         }}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.revenueVillage}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={'5. ' + t('Total number of households')}
                                         placeholder={t('Total number of households')}
                                         onChangeText={text => {
                                           // Allow only digits
                                           let filtered = text.replace(/[^0-9]/g, '');
                                           // If the first character is '0', remove it
                                           if (filtered.startsWith('0')) {
                                             filtered = filtered.substring(1);
                                           }
                                           const number = Number(filtered);
                 
                                           // Block 0 and values > 1500
                                           if (number > 1500) return;
                 
                                           // Allow empty (while typing)
                                           if (filtered === '') {
                                             setFieldValue('totalHouseholds', '');
                                             return;
                                           }
                 
                                           setFieldValue('totalHouseholds', filtered);
                                           // setFieldValue('totalHouseholds', text)
                                         }}
                                         value={values?.totalHouseholds}
                                         inputType={'numeric'}
                                         keyboardType={'number-pad'}
                                         maxLength={4}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.totalHouseholds}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={'6. ' + t('Male')}
                                         placeholder={t('Male')}
                                         onChangeText={text => {
                                           let filtered = text.replace(/[^0-9]/g, '');
                                           if (filtered.startsWith('0')) {
                                             filtered = filtered.substring(1);
                                           }
                                           // Allow empty (while typing)
                                           if (filtered === '') {
                                             setFieldValue('malePopulation', '');
                                             return;
                                           }
                                           const number = Number(filtered);
                                           // Block 0 and values > 1500
                                           if (number < 1 || number > 4000) return;
                                           const male = number || 0;
                                           setFieldValue('malePopulation', number || 0);
                                           const female = Number(values?.femalePopulation) || 0;
                                           setFieldValue('TotalPopulation', male + female);
                                         }}
                                         value={String(values?.malePopulation ?? '')}
                                         inputType={'numeric'}
                                         maxLength={8}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.malePopulation}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={'7. ' + t('Female')}
                                         placeholder={t('Female')}
                                         onChangeText={text => {
                                           // Allow only digits
                                           let filtered = text.replace(/[^0-9]/g, '');
                                           if (filtered.startsWith('0')) {
                                             filtered = filtered.substring(1);
                                           }
                                           if (filtered === '') {
                                             setFieldValue('femalePopulation', '');
                                             return;
                                           }
                                           const number = Number(filtered);
                                           if (number < 1 || number > 4000) return;
                 
                                           setFieldValue('femalePopulation', number || 0);
                                           const male = Number(values?.malePopulation) || 0;
                                           const female = number || 0;
                 
                                           setFieldValue('TotalPopulation', male + female);
                                         }}
                                         value={String(values?.femalePopulation ?? '')}
                                         inputType={'numeric'}
                                         maxLength={8}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.femalePopulation}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={'8. ' + t('Total Population')}
                                         placeholder={String(values?.TotalPopulation ?? 0)}
                                         value={String(values?.TotalPopulation ?? 0)}
                                         inputType={'numeric'}
                                         disabled={true}
                                         maxLength={8}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                     </View>
                                   )}
                                   {/* Two question start */}
                                   {currentQuestion === 2 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'B. ' + t('Basic Infrastructure & Amenities')}
                                       </Text>
                                      
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         9. {t('Is the village electrified?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setIsElectrified(text);
                                           setFieldValue('isElectrified', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.isElectrified
                                             : IsElectrified
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.isElectrified}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         10. {t('Is street lighting available?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setStreetLightingAvailable(text);
                                           setFieldValue('streetLightingAvailable', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.streetLightingAvailable
                                             : StreetLightingAvailable
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.streetLightingAvailable}
                                       </Text>
                                       {(values?.streetLightingAvailable ||
                                         StreetLightingAvailable) && <Spacing space={SH(5)} />}
                                       {(values?.streetLightingAvailable ||
                                         StreetLightingAvailable) && (
                                         <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                           10.1 {t('What type of street lighting is provided?')}
                                         </Text>
                                       )}
                                       {(values?.streetLightingAvailable ||
                                         StreetLightingAvailable) && (
                                         <RadioButton
                                           arrayData={electricityData}
                                           onChangeText={text => {
                                             setStreetLightingType(text);
                                             setFieldValue('streetLightingType', text);
                                           }}
                                           value={
                                             editData != undefined
                                               ? values?.streetLightingType
                                               : StreetLightingType
                                           }
                                         />
                                       )}
                                       {(values?.streetLightingAvailable ||
                                         StreetLightingAvailable) && (
                                         <Text style={{color: 'red'}}>
                                           {errors?.streetLightingType}
                                         </Text>
                                       )}
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         11.{' '}
                                         {t(
                                           'Is the village connected to the GP headquarters by an all weather road?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData2}
                                         onChangeText={text => {
                                           //  Alert.alert("text",text);
                                           setVillageConnectedToGP(text);
                 
                                           setFieldValue('villageConnectedToGP', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.villageConnectedToGP
                                             : VillageConnectedToGP
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.villageConnectedToGP}
                                       </Text>
                                       {(VillageConnectedToGP == 'No' ||
                                         values?.villageConnectedToGP == 'Partially') && (
                                         <Spacing space={SH(2)} />
                                       )}
                 
                                       <Spacing space={SH(15)} />
                                       {(VillageConnectedToGP == 'No' ||
                                         values?.villageConnectedToGP == 'Partially' ||
                                         values?.villageConnectedToGP == 'No' ||
                                         VillageConnectedToGP == 'Partially') && (
                                         <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                           12.
                                           {t(
                                             ' What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?',
                                           )}
                                         </Text>
                                       )}
                                       {(VillageConnectedToGP == 'No' ||
                                         values?.villageConnectedToGP == 'Partially' ||
                                         values?.villageConnectedToGP == 'No' ||
                                         VillageConnectedToGP == 'Partially') && (
                                         <SafeAreaView
                                           style={{flex: 1, justifyContent: 'center'}}>
                                           <StepSlider
                                             minValue={100}
                                             maxValue={4000}
                                             step={100}
                                             initialValue={100}
                                             onValueChange={val => console.log('Selected:', val)}
                                           />
                                         </SafeAreaView>
                                       )}
                                       <Text style={{color: 'red'}}>
                                         {errors?.lengthAllWeatherRoadToHighway}
                                       </Text>
                                     </View>
                                   )}
                                   {/* Three question start */}
                                   {currentQuestion === 3 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'C. ' + t('Information Related to Migration')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Input
                                         title={'13. ' + t('No of men currently in migration?')}
                                         placeholder={t('No of men currently in migration?')}
                                         onChangeText={text => {
                                           setFieldValue('menInMigration', Number(text) || 0);
                                           const men = Number(text) || 0;
                                           const women = Number(values?.womenInMigration) || 0;
                                           const children =
                                             Number(values?.minorChildrenInMigration) || 0;
                 
                                           const total = men + women + children;
                 
                                           setFieldValue(
                                             'TotalPersonsInMigration',
                                             JSON.stringify(total),
                                           );
                                         }}
                                         value={values?.menInMigration}
                                         inputType={'numeric'}
                                         maxLength={6}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.menInMigration}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Input
                                         title={
                                           '14. ' + t('No of women currently in migration?')
                                         }
                                         inputType={'numeric'}
                                         maxLength={6}
                                         placeholder={t('No of women currently in migration?')}
                                         onChangeText={text => {
                                           setFieldValue('womenInMigration', Number(text) || 0);
                                           const men = Number(values?.menInMigration) || 0;
                                           const women = Number(text) || 0;
                                           const children =
                                             Number(values?.minorChildrenInMigration) || 0;
                 
                                           const total = men + women + children;
                 
                                           setFieldValue(
                                             'TotalPersonsInMigration',
                                             JSON.stringify(total),
                                           );
                                         }}
                                         value={values?.womenInMigration}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.womenInMigration}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Input
                                         title={
                                           '15. ' +
                                           t(
                                             'No of minor children below 18 yrs age currently in migration?',
                                           )
                                         }
                                         placeholder={t(
                                           'No of minor children below 18 yrs age currently in migration?',
                                         )}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'minorChildrenInMigration',
                                             Number(text) || 0,
                                           );
                                           const men = Number(values?.menInMigration) || 0;
                                           const women = Number(values?.womenInMigration) || 0;
                                           const children = Number(text) || 0;
                 
                                           const total = men + women + children;
                 
                                           setFieldValue(
                                             'TotalPersonsInMigration',
                                             JSON.stringify(total),
                                           );
                                         }}
                                         value={values?.minorChildrenInMigration}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                         inputType={'numeric'}
                                         maxLength={6}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.minorChildrenInMigration}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={
                                           '16. ' +
                                           t('Total No. of person currently in migration?')
                                         }
                                         placeholder={String(
                                           values?.TotalPersonsInMigration ?? 0,
                                         )}
                                         onChangeText={text => {
                                           setFieldValue(
                                             'TotalPersonsInMigration',
                                             Number(text) || 0,
                                           );
                                         }}
                                         value={String(values?.TotalPersonsInMigration ?? 0)}
                                         disabled={true}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                         inputType={'numeric'}
                                         maxLength={6}
                                       />
                                     </View>
                                   )}
                                   {currentQuestion === 4 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'D.' + t('Water Supply & Sanitation')}
                                       </Text>
                                       <Spacing space={SH(10)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         17. {t('Main source of drinking water?')}
                                       </Text>
                                       {renderCheckboxes4()}
                                       <Text style={{color: 'red'}}>
                                         {errors?.drinkingWaterSource}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         18. {t('Are all households having toilets?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setAllHouseholdsWithToilets(text);
                                           setFieldValue('allHouseholdsWithToilets', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.allHouseholdsWithToilets
                                             : AllHouseholdsWithToilets
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.allHouseholdsWithToilets}
                                       </Text>
                                     </View>
                                   )}
                                   {currentQuestion === 5 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'E. ' + t('Education & Health Facilities')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         19. {t('Is there a functioning Anganwadi Centre?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('anganwadiCentre', text);
                                           setAnganwadiCentre(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.anganwadiCentre
                                             : AnganwadiCentre
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.anganwadiCentre}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         20.{' '}
                                         {t('Is Primary school available within the village?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('primarySchoolAvailable', text);
                                           setPrimarySchoolAvailable(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.primarySchoolAvailable
                                             : PrimarySchoolAvailable
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.primarySchoolAvailable}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         21. {t('Is Secondary school within 3 km distance?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('secondarySchoolWithin3km', text);
                                           setSecondarySchoolWithin3km(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.secondarySchoolWithin3km
                                             : SecondarySchoolWithin3km
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.secondarySchoolWithin3km}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         22. {t('Is there a Sub Health Centre in the village?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('subHealthCentre', text);
                                           setSubHealthCentre(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.subHealthCentre
                                             : SubHealthCentre
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.subHealthCentre}
                                       </Text>
                                     </View>
                                   )}
                                   {currentQuestion === 6 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'F. ' + t('Community & Social Infrastructure')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         23. {t('Community Centre available?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('communityCentreAvailable', text);
                                           setCommunityCentreAvailable(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.communityCentreAvailable
                                             : CommunityCentreAvailable
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.communityCentreAvailable}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         24. {t('Common shed for WSHG available?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('commonShedForWSHG', text);
                                           setCommonShedForWSHG(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.commonShedForWSHG
                                             : CommonShedForWSHG
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.commonShedForWSHG}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         25. {t('Availability of playground in the village?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('playgroundAvailable', text);
                                           setPlaygroundAvailable(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.playgroundAvailable
                                             : PlaygroundAvailable
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.playgroundAvailable}
                                       </Text>
                                       <Spacing space={SH(15)} />
                                       <Input
                                         title={
                                           '26. ' +
                                           t('No. of community tanks available in the village?')
                                         }
                                         placeholder={t(
                                           'No. of community tanks available in the village?',
                                         )}
                                         onChangeText={text => {
                                           let filtered = text.replace(/[^0-9]/g, '');
                 
                                           if (filtered === '') {
                                             setFieldValue('communityTanks', '');
                                             return;
                                           }
                                           const number = Number(filtered);
                                           if (number > 30) return;
                                           setFieldValue('communityTanks', number);
                                         }}
                                         value={values?.communityTanks}
                                         inputType={'numeric'}
                                         maxLength={2}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.communityTanks}
                                       </Text>
                                     </View>
                                   )}
                                   {currentQuestion === 7 && (
                                     <View>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'G. ' + t('Livelihood & Service Infrastructure')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         27.{' '}
                                         {t(
                                           'Is Digital last mile connectivity (internet facility) available?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setDigitalConnectivity(text);
                                           setFieldValue('digitalConnectivity', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values.digitalConnectivity
                                             : DigitalConnectivity
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.digitalConnectivity}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         28. {t('Is there a PDS (ration shop) in the village?')}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setPDSAvailable(text);
                                           setFieldValue('pdsAvailable', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.pdsAvailable
                                             : PDSAvailable
                                         }
                                       />
                                       <Text style={{color: 'red'}}>{errors?.pdsAvailable}</Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         29.{' '}
                                         {t(
                                           'Whether banking or post office or KIOSK or mini bank services are available within 3 km distance from the village?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setBankingPostOfficeNearby(text);
                                           setFieldValue('bankingPostOfficeNearby', text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.bankingPostOfficeNearby
                                             : BankingPostOfficeNearby
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.bankingPostOfficeNearby}
                                       </Text>
                                     </View>
                                   )}
                 
                                   {/* Four question start */}
                                   {currentQuestion === 8 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'H. ' + t('Water Resource & Irrigation Structures')}
                                       </Text>
                                       <Spacing space={SH(10)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         30.{' '}
                                         {t(
                                           'Is water from any mega, medium or minor irrigation project available to the village?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('waterFromIrrigationProject', text);
                                           setWaterFromIrrigationProject(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.waterFromIrrigationProject
                                             : WaterFromIrrigationProject
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.waterFromIrrigationProject}
                                       </Text>
                 
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         31.{' '}
                                         {t(
                                           'Availability of functional Check Dams in the village?',
                                         )}
                                       </Text>
                                       <RadioButton
                                         arrayData={selfHelpData}
                                         onChangeText={text => {
                                           setFieldValue('functionalCheckDams', text);
                                           setFunctionalCheckDams(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.functionalCheckDams
                                             : FunctionalCheckDams
                                         }
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.functionalCheckDams}
                                       </Text>
                 
                                       <Spacing space={SH(5)} />
                                     </View>
                                   )}
                                   {/*five question start */}
                                   {currentQuestion === 9 && (
                                     <View>
                                       <Text style={AnalyaticsStyles.TitleStyle}>
                                         {'I. ' + t('Respondent Details')}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Input
                                         title={'32. ' + t('Respondent Name')}
                                         placeholder={t('Respondent Name')}
                                         onChangeText={text => {
                                           // [^a-zA-Z.] means: "Match anything that is NOT a letter or a dot"
                                           // The 'g' flag replaces all occurrences
                                          const filtered = text.replace(/[^a-zA-Z.\s]/g, '');
                 
                                           setFieldValue('respondentName', filtered);
                                         }}
                                         onFocus={() => {
                                           scrollRef.current?.scrollTo({y: 0, animated: true});
                                         }}
                                         value={values?.respondentName}
                                         maxLength={200}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.respondentName}
                                       </Text>
                                       <Spacing space={SH(5)} />
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         33. {t('Identity')}
                                       </Text>
                                       <RadioButton
                                         arrayData={identityData}
                                         onChangeText={text => {
                                           setFieldValue('identityRole', text);
                                           setIdentityRole(text);
                                         }}
                                         value={
                                           editData != undefined
                                             ? values?.identityRole
                                             : IdentityRole
                                         }
                                         type={1}
                                       />
                                       <Text style={{color: 'red'}}>{errors?.identityRole}</Text>
                 
                                       <Spacing space={SH(1)} />
                                       <Input
                                         title={'34. ' + t('Respondent contact mobile no.?')}
                                         placeholder={t('Respondent contact mobile no.?')}
                                         onChangeText={text => {
                                           setFieldValue('respondentMobile', text);
                                         }}
                                         value={values?.respondentMobile}
                                         inputType="numeric"
                                         maxLength={10}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.respondentMobile}
                                       </Text>
                                       {/* <Spacing space={SH(10)} /> */}
                                       {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         49. {t('Capture a photo of the meeting/FGD')}
                                       </Text> */}
                                       {/* <Spacing space={SH(10)} /> */}
                                       {/*<View style={AnalyaticsStyles.FlexRow}>
                                       
                                         <ImagePicker
                                           value={values.MeetingPhotoPath}
                                           onChange={img =>
                                             setFieldValue('MeetingPhotoPath', img)
                                           }
                                           showdata={true}
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
                                       </View>*/}
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
                                       <Spacing space={SH(5)} />
                                       <View style={{flexDirection: 'column'}}>
                                         <View style={AnalyaticsStyles.PaddingHori}>
                                           <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                             35. {t('Click on the icon to capture GEO location')}
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
                                                 {location ? location.coords.latitude : null},
                                                 {location ? location.coords.longitude : null}
                                               </Text>
                                             </TouchableOpacity>
                                           </View>
                                           <View>
                                             <Text style={{color: 'black', fontSize: SF(12)}}>
                                               Accuracy: {location?.coords?.accuracy.toFixed(1)}{' '}
                                               meters (The actual location is within this radius)
                                             </Text>
                                           </View>
                                         </View>
                                       </View>
                                       <Spacing space={SH(10)} />
                                       <Input
                                         title={'36. ' + t('Enumerator Name')}
                                         placeholder={t('Enumerator Name')}
                                         onChangeText={text =>
                                           setFieldValue('enumeratorName', text)
                                         }
                                         value={values?.enumeratorName}
                                         maxLength={200}
                                         titleStyle={AnalyaticsStyles.PleaseEnterDate}
                                       />
                                       <Text style={{color: 'red'}}>
                                         {errors?.enumeratorName}
                                       </Text>
                 
                                       <Text style={AnalyaticsStyles.PleaseEnterDate}>
                                         37. {t('Survey Date and Time')}
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
                      <Text style={{fontWeight: 'bold'}}>District:</Text>{' '}
                      {previewData?.district}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Block:</Text>{' '}
                      {previewData?.block}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Gram Panchayat')}:
                      </Text>{' '}
                      {previewData?.gramPanchayat}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Revenue Village')}:
                      </Text>{' '}
                      {previewData?.revenueVillage}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total number of households')}:
                      </Text>{' '}
                      {previewData?.totalHouseholds}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Male')}:</Text>{' '}
                      {previewData?.malePopulation}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Female')}:</Text>{' '}
                      {previewData?.femalePopulation}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total Population')}:
                      </Text>{' '}
                      {previewData?.totalPopulation}
                    </Text>

                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Are internal village roads pucca (concrete)?')}:
                                 </Text>{' '}
                                 {previewData?.InternalVillageRoads}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'If No or Partially, requirement of internal village pucca roads (in RMT)?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.InternalVillageRoadsRequirement}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Are internal drains available?')}:
                                 </Text>{' '}
                                 {previewData?.InternalDrainsAvailable}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('If Yes, Are drains properly functional?')}:
                                 </Text>{' '}
                                 {previewData?.DrainsProperlyFunctional}
                               </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is the village electrified?')}:
                      </Text>{' '}
                      {previewData?.isElectrified}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is street lighting available?')}:
                      </Text>{' '}
                      {previewData?.streetLightingAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('What type of street lighting is provided?')}:
                      </Text>{' '}
                      {previewData?.streetLightingType}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is the village connected to the GP headquarters by an all weather road?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.villageConnectedToGP}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.lengthAllWeatherRoadToGP}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is the GP head quarter connected to any PWD road or State highway or Nation Highway by an all weather road?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.gpConnectedToPWDOrHighway}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.lengthAllWeatherRoadToHighway}
                    </Text>

                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Information Related to Migration')}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No of men currently in migration?')}:
                      </Text>{' '}
                      {previewData?.menInMigration}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No of women currently in migration?')}:
                      </Text>{' '}
                      {previewData?.womenInMigration}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'No of minor children below 18 yrs age currently in migration?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.minorChildrenInMigration}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total No. of person currently in migration?')}:
                      </Text>{' '}
                      {JSON.stringify(
                        parseInt(previewData?.menInMigration) +
                          parseInt(previewData?.womenInMigration) +
                          parseInt(previewData?.minorChildrenInMigration),
                      )}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Water Supply & Sanitation')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Main source of drinking water?')}:
                      </Text>{' '}
                      {previewData?.drinkingWaterSource}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Are all households having toilets?')}:
                      </Text>{' '}
                      {previewData?.allHouseholdsWithToilets}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Education & Health Facilities')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is there a functioning Anganwadi Centre?')}:
                      </Text>{' '}
                      {previewData?.anganwadiCentre}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is Primary school available within the village?')}:
                      </Text>{' '}
                      {previewData?.primarySchoolAvailable}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is Secondary school within 3 km distance?')}:
                      </Text>{' '}
                      {previewData?.secondarySchoolWithin3km}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        {t('Is there a Sub Health Centre in the village?')}:
                      </Text>{' '}
                      {previewData?.subHealthCentre}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Community & Social Infrastructure')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Community Centre available?')}:
                      </Text>{' '}
                      {previewData?.communityCentreAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Common shed for WSHG available?')}:
                      </Text>{' '}
                      {previewData?.commonShedForWSHG}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Availability of playground in the village?')}:
                      </Text>{' '}
                      {previewData?.playgroundAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No. of community tanks available in the village?')}:
                      </Text>{' '}
                      {previewData?.communityTanks}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Livelihood & Service Infrastructure')}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Is mobile network coverage available?')}:
                                 </Text>{' '}
                                 {previewData?.MobileNetworkCoverage}
                               </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is Digital last mile connectivity (internet facility) available?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.digitalConnectivity}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Is there a drying yard available?')}:
                                 </Text>{' '}
                                 {previewData?.DryingYard}
                               </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is there a PDS (ration shop) in the village?')}:
                      </Text>{' '}
                      {previewData?.pdsAvailable}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {' '}
                                   {t(
                                     'If No, distance of PDS (ration shop) from the village (in km)?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.DistanceOfPDS}
                               </Text> */}

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether banking or post office or KIOSK or mini bank services are available within 3 km distance from the village?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.bankingPostOfficeNearby}
                    </Text>

                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Water Resource & Irrigation Structures')}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is water from any mega, medium or minor irrigation project available to the village?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.waterFromIrrigationProject}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'If Yes, Whether repair or construction of a new distribution canal is required?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.RepairOrNewDistributionCanalRequired}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'If Yes, Length of distribution canal requiring repair or new construction in RMT?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.LengthOfDistributionCanal}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'Is there functional lift irrigation project available?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.FunctionalLiftIrrigation}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Scope of new lift irrigation project?')}:
                                 </Text>{' '}
                                 {previewData?.ScopeOfNewLiftIrrigation}
                               </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Availability of functional Check Dams in the village?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.functionalCheckDams}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Scope of new Check Dams in the village?')}:
                                 </Text>{' '}
                                 {previewData?.ScopeOfNewCheckDams}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'Availability of functional distribution canal in the village in RMT?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.FunctionalDistributionCanal}
                               </Text> */}
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t(
                                     'If Yes, Scope of new distribution canal in the village in RMT?',
                                   )}
                                   :
                                 </Text>{' '}
                                 {previewData?.ScopeOfNewDistributionCanal}
                               </Text> */}
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Respondent Details')}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Respondent Name')}:
                      </Text>{' '}
                      {previewData?.respondentName}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Identity')}:</Text>{' '}
                      {previewData?.identityRole}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Process Adopted for Survey')}:
                                 </Text>{' '}
                                 {previewData?.SurveyProcess}
                               </Text> */}
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Respondent contact mobile no.?')}:
                      </Text>{' '}
                      {previewData?.respondentMobile}
                    </Text>
                    {/* <Text>
                                 <Text style={{fontWeight: 'bold'}}>
                                   {t('Capture a photo of the meeting/FGD')}:
                                 </Text>{' '}
                                 {previewData?.MeetingPhotoPath}
                               </Text> */}

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Location')}:</Text>{' '}
                      {previewData?.geoLocation}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Enumerator Name')}:
                      </Text>{' '}
                      {previewData?.enumeratorName}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Survey Date and Time')}:
                      </Text>{' '}
                      {previewData?.surveyDate}
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

              {currentQuestion < 9 && (
                <TouchableOpacity
                  style={AnalyaticsStyles.PreviousButton}
                  onPress={handleNext}>
                  <Text style={AnalyaticsStyles.PreviousTextStyle}>
                    {t('Survey_Title_48')}
                  </Text>
                </TouchableOpacity>
              )}
              {currentQuestion == 9 && (
                <TouchableOpacity
                  style={AnalyaticsStyles.SubmitButton}
                  onPress={() => {
                    setFieldValue('SurveyDate', dateSelectLocal);
                    // Alert.alert("errors",JSON.stringify(dateSelectLocal));
                    // return;
                    let res =
                      (location ? location?.coords?.latitude : null) +
                      ',' +
                      (location ? location?.coords?.longitude : null) +
                      ',' +
                      (location ? location?.coords?.accuracy.toFixed(1) : null);
                    setFieldValue('GeoLocation', res);

                      if (involvedWaterSource?.length > 0) {
                        let waterArray = '';
                        involvedWaterSource?.forEach(item => {
                          waterArray =
                            involvedWaterSource.length > 1
                              ? waterArray.concat(item + ', ')
                              : waterArray.concat(item);
                        });
                        //Alert.alert("involvedInLivestockActivity",JSON.stringify(livestockArray));
                        setFieldValue('drinkingWaterSource', waterArray);
                        setDrinkingWaterSource(waterArray);
                      }

                    let finalValuesPreview = {
                      ...values,
                      SurveyDate: dateSelectLocal,
                    };

                    // if (errors && errors?.District) {
                    //   AppOkAlert(errors.District, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.Block) {
                    //   AppOkAlert(errors.Block, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.GramPanchayat) {
                    //   AppOkAlert(errors.GramPanchayat, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.RevenueVillage) {
                    //   AppOkAlert(errors.RevenueVillage, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.TotalHouseholds) {
                    //   AppOkAlert(errors.TotalHouseholds, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.MalePopulation) {
                    //   AppOkAlert(errors.MalePopulation, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.FemalePopulation) {
                    //   AppOkAlert(errors.FemalePopulation, () => {});
                    //   return;
                    // }

                    if (
                      values?.InternalVillageRoads === false &&
                      errors &&
                      errors?.InternalVillageRoadsRequirement
                    ) {
                      AppOkAlert(
                        errors.InternalVillageRoadsRequirement,
                        () => {},
                      );
                      return;
                    }

                    // if (
                    //   values?.VillageConnectedToGP === false &&
                    //   errors &&
                    //   errors?.LengthAllWeatherRoadToGP
                    // ) {
                    //   AppOkAlert(errors.LengthAllWeatherRoadToGP, () => {});
                    //   return;
                    // }

                    // if (
                    //   values?.GPConnectedToPWDOrHighway === true &&
                    //   errors &&
                    //   errors?.LengthAllWeatherRoadToHighway
                    // ) {
                    //   AppOkAlert(
                    //     errors.LengthAllWeatherRoadToHighway,
                    //     () => {},
                    //   );
                    //   return;
                    // }

                    // if (errors && errors?.DrinkingWaterSource) {
                    //   AppOkAlert(errors.DrinkingWaterSource, () => {});
                    //   return;
                    // }

                    if (
                      values?.PDSAvailable === false &&
                      errors &&
                      errors?.DistanceOfPDS
                    ) {
                      AppOkAlert(errors.DistanceOfPDS, () => {});
                      return;
                    }

                    if (
                      values?.WaterFromIrrigationProject === true &&
                      errors &&
                      errors?.LengthOfDistributionCanal
                    ) {
                      AppOkAlert(errors.LengthOfDistributionCanal, () => {});
                      return;
                    }

                    if (
                      values?.WaterFromIrrigationProject === true &&
                      errors &&
                      errors?.ScopeOfNewDistributionCanal
                    ) {
                      AppOkAlert(errors.ScopeOfNewDistributionCanal, () => {});
                      return;
                    }

                    // if (errors && errors?.RespondentName) {
                    //   AppOkAlert(errors.RespondentName, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.IdentityRole) {
                    //   AppOkAlert(errors.IdentityRole, () => {});
                    //   return;
                    // }

                    // if (errors && errors?.SurveyProcess) {
                    //   AppOkAlert(errors.SurveyProcess, () => {});
                    //   return;
                    // }

                    if (errors && errors?.RespondentMobile) {
                      AppOkAlert(errors.RespondentMobile, () => {});
                      return;
                    }
                    if (errors && errors?.EnumeratorName) {
                      AppOkAlert(errors.EnumeratorName, () => {});
                      return;
                    }

                    setPreviewData(finalValuesPreview);
                    setShowConfirmModal(true);
                    // handleSubmit();
                  }}>
                  <Text style={AnalyaticsStyles.PreviousTextStyle}>
                    {t('Submit')}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={AnalyaticsStyles.CancelButton}
                onPress={handleCancel}>
                <Text style={AnalyaticsStyles.PreviousTextStyle}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
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
        message={alertMessage}
        modalVisible={familyAlertVisible}
        setModalVisible={setFamilyAlertVisible}
        onPress={() => {
          setFamilyAlertVisible(!familyAlertVisible), onoknutton();
        }}
        buttonminview={Style.ButtonCenter}
        iconVisible={true}
        buttonText={t('Ok')}
      /> */}
      <Loader visible={loading} />
    </View>
  );
};
export default VillageFormSurveyEdit;
