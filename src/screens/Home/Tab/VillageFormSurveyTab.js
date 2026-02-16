import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
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
import {AppDataSource} from '../../../database/database';
import DeviceHelper from '../../../utils/DeviceHelper';
import Loader from '../../../components/commonComponents/Loader';
import {v4 as uuidv4} from 'uuid';
import {VillageSurvey} from '../../../database/entities/VillageSurvey';
// import { VillageFormSurveyTab } from '.';

const VillageFormSurveyTab = props => {
  const {t} = useTranslation();
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
    getMasterState();
  }, []);
  const [state, setState] = useState(stateArray);

  const [blocks, setBlocks] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [involvedWaterSource, setInvolvedWaterSource] =
      useState(null);

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
    {label: t('Yes'), value: 'true'},
    {label: t('No'), value: 'false'},
    {label: t('Partially'), value: 'Partially'},
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
   const [checkboxes4, setCheckboxes4] = useState([
      {label: t('Well'), checked: false},
      {label: t('Tube Well'), checked: false},
      {label: t('Piped Water Supply'), checked: false},
      {label: t('Others'), checked: false},
  
      // Add more options as needed
    ]);
  const handleCheckboxChange = index => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
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
  const [alertVisible, setAlertVisible] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    logout: t('Survey_Title_33'),
  };
  const onoknutton = () => {
    navigation.navigate(RouteName.ANALYTICS_SCREEN);
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
  useEffect(() => {
    getLocation();
  }, []);
  var mySubscriber = function (msg, data) {
    // console.log(msg, data);
    //  Alert.alert("Data",JSON.stringify(data?.item));
    setEditData(data);
    if (data && formikRef.current) {
      const resultData = data?.item;
      const resetData = {
        District: resultData.district,
        Block: resultData.block,
        GramPanchayat: resultData.gramPanchayat,
        RevenueVillage: resultData.revenueVillage,
        TotalHouseholds: resultData.totalHouseholds,
        MalePopulation: resultData.malePopulation,
        FemalePopulation: resultData.femalePopulation,
        InternalVillageRoads: resultData.internalVillageRoads,
        InternalVillageRoadsRequirement:
          resultData.internalVillageRoadsRequirement,
        InternalDrainsAvailable: resultData.internalDrainsAvailable,
        DrainsProperlyFunctional: resultData.drainsProperlyFunctional,
        IsElectrified: resultData.isElectrified,
        StreetLightingAvailable: resultData.streetLightingAvailable,
        StreetLightingType: resultData.streetLightingType,
        VillageConnectedToGP: resultData.villageConnectedToGP,
        LengthAllWeatherRoadToGP: resultData.lengthAllWeatherRoadToGP,
        GPConnectedToPWDOrHighway: resultData.gpConnectedToPWDOrHighway,
        LengthAllWeatherRoadToHighway: resultData.lengthAllWeatherRoadToHighway,
        MenInMigration: resultData.menInMigration,
        WomenInMigration: resultData.womenInMigration,
        TotalPersonsInMigration: resultData.totalPersonsInMigration,
        MinorChildrenInMigration: resultData.minorChildrenInMigration,
        DrinkingWaterSource: resultData.drinkingWaterSource,
        AllHouseholdsWithToilets: resultData.allHouseholdsWithToilets,
        AnganwadiCentre: resultData.anganwadiCentre,
        PrimarySchoolAvailable: resultData.primarySchoolAvailable,
        SecondarySchoolWithin3km: resultData.secondarySchoolWithin3km,
        SubHealthCentre: resultData.subHealthCentre,
        CommunityCentreAvailable: resultData.communityCentreAvailable,
        CommonShedForWSHG: resultData.commonShedForWSHG,
        PlaygroundAvailable: resultData.playgroundAvailable,
        CommunityTanks: resultData.communityTanks,
        MobileNetworkCoverage: resultData.mobileNetworkCoverage,
        DigitalConnectivity: resultData.digitalConnectivity,
        DryingYard: resultData.dryingYard,
        PDSAvailable: resultData.pdsAvailable,
        DistanceOfPDS: resultData.distanceOfPDS,
        BankingPostOfficeNearby: resultData.bankingPostOfficeNearby,
        WaterFromIrrigationProject: resultData.waterFromIrrigationProject,
        RepairOrNewDistributionCanalRequired:
          resultData.repairOrNewDistributionCanalRequired,
        LengthOfDistributionCanal: resultData.lengthOfDistributionCanal,
        FunctionalLiftIrrigation: resultData.functionalLiftIrrigation,
        ScopeOfNewLiftIrrigation: resultData.scopeOfNewLiftIrrigation,
        FunctionalCheckDams: resultData.functionalCheckDams,
        ScopeOfNewCheckDams: resultData.scopeOfNewCheckDams,
        FunctionalDistributionCanal: resultData.functionalDistributionCanal,
        ScopeOfNewDistributionCanal: resultData.scopeOfNewDistributionCanal,
        RespondentName: resultData.respondentName,
        IdentityRole: resultData.identityRole,
        SurveyProcess: resultData.surveyProcess,
        RespondentMobile: resultData.respondentMobile,
        MeetingPhotoPath: resultData.meetingPhotoPath,
        GeoLocation: resultData.geoLocation,
        EnumeratorName: resultData.enumeratorName,
        SurveyDate: resultData.surveyDate,
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
      setLoading(false);
      setAlertVisible(true);
      setAlertMessage(t('Survey_Submit_Successfully_village'));
    } else {
      setLoading(false);
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
              const {latitude, longitude} = position.coords;
              console.log(latitude, longitude);

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
                  {/* First question start */}
                  {/* <Text style={AnalyaticsStyles.TitleStyle}>{t("Basic Details")}</Text> */}
                  {currentQuestion === 1 && (
                    <View>
                      {/* District */}
                      <Text style={AnalyaticsStyles.TitleStyle}>
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
                        value={values?.District}
                        placeholder={values?.District || t('Select District')}
                        onChange={obj => {
                          // Alert.alert("hellll",JSON.stringify(label));
                          getBlocks(obj.value);
                          setFieldValue('District', obj.label);
                        }}
                      />
                      <Text style={{color: 'red'}}>{errors?.District}</Text>
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
                        value={values?.Block}
                        placeholder={values?.Block || t('Select Block')}
                        onChange={obj => {
                          getPanchayats(obj.value);
                          setFieldValue('Block', obj.label);
                        }}
                      />
                      <Text style={{color: 'red'}}>{errors?.Block}</Text>
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
                        value={values?.GramPanchayat}
                        placeholder={
                          values?.GramPanchayat || t('Select Gram Panchayat')
                        }
                        onChange={obj => {
                          getVillages(obj.value);
                          setFieldValue('GramPanchayat', obj.label);
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.GramPanchayat}
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
                        value={values?.RevenueVillage}
                        placeholder={
                          values?.RevenueVillage || t('Select Revenue Village')
                        }
                        onChange={obj => {
                          setFieldValue('RevenueVillage', obj.label);
                        }}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.RevenueVillage}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={'5. ' + t('Total number of households')}
                        placeholder={t('Total number of households')}
                        onChangeText={text => {
                          // Allow only digits
                          const filtered = text.replace(/[^0-9]/g, '');

                          // Allow empty (while typing)
                          if (filtered === '') {
                            setFieldValue('TotalHouseholds', '');
                            return;
                          }

                          const number = Number(filtered);

                          // Block 0 and values > 1500
                          if (number < 1 || number > 1500) return;

                          setFieldValue('TotalHouseholds', filtered);
                          // setFieldValue('TotalHouseholds', text)
                        }}
                        value={values?.TotalHouseholds}
                        inputType={'numeric'}
                        maxLength={4}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.TotalHouseholds}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={'6. ' + t('Male')}
                        placeholder={t('Male')}
                        onChangeText={(text) => {
                          const filtered = text.replace(/[^0-9]/g, '');
                          // Allow empty (while typing)
                          if (filtered === '') {
                            setFieldValue('MalePopulation', '');
                            return;
                          }
                          const number = Number(filtered);
                          // Block 0 and values > 1500
                          if (number < 1 || number > 4000) return;
                          const male = number || 0;
                          setFieldValue('MalePopulation', number || 0);
                          const female = Number(values?.FemalePopulation) || 0;
                          setFieldValue('TotalPopulation', male + female);
                        }}
                        value={String(values?.MalePopulation ?? '')}
                        inputType={'numeric'}
                        maxLength={8}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.MalePopulation}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={'7. ' + t('Female')}
                        placeholder={t('Female')}
                        onChangeText={(text) => {
                            // Allow only digits
                          const filtered = text.replace(/[^0-9]/g, '');
                            if (filtered === '') {
                            setFieldValue('FemalePopulation', '');
                            return;
                          }
                           const number = Number(filtered);
                             if (number < 1 || number > 4000) return;

                          setFieldValue('FemalePopulation', number || 0);
                          const male = Number(values?.MalePopulation) || 0;
                          const female = number || 0;

                          setFieldValue('TotalPopulation', male + female);
                        }}
                        value={String(values?.FemalePopulation ?? '')}
                        inputType={'numeric'}
                        maxLength={8}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.FemalePopulation}
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
                        {t('Basic Infrastructure & Amenities')}
                      </Text>
                      {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        9. {t('Are internal village roads pucca (concrete)?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('InternalVillageRoads', text);
                          setIsConcreteRoads(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.InternalVillageRoads
                            : isConcreteRoads
                        }
                      /> */}
                      {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Survey_Title_39")}</Text>
                {renderCheckboxes()} */}
                      {/* <Spacing space={SH(5)} /> */}
                      {/* <Text style={{color: 'red'}}>
                        {errors?.InternalVillageRoads}
                      </Text> */}
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        10.{' '}
                        {t(
                          'If No or Partially, requirement of internal village pucca roads (in RMT)?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={waterSourceData}
                        onChangeText={text => {
                          setFieldValue(
                            'InternalVillageRoadsRequirement',
                            text,
                          );
                          setInternalVillageRoadsRequirement(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.InternalVillageRoadsRequirement
                            : InternalVillageRoadsRequirement
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.InternalVillageRoadsRequirement}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        11. {t('Are internal drains available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('InternalDrainsAvailable', text);
                          setInternalDrainsAvailable(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.InternalDrainsAvailable
                            : InternalDrainsAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.InternalDrainsAvailable}
                      </Text>
                      {(values?.InternalDrainsAvailable||InternalDrainsAvailable)&&<Spacing space={SH(5)} />}
                      {(values?.InternalDrainsAvailable||InternalDrainsAvailable)&&<Text style={AnalyaticsStyles.PleaseEnterDate}>
                        {t('If Yes, Are drains properly functional?')}
                      </Text>}
                      {(values?.InternalDrainsAvailable||InternalDrainsAvailable)&&<RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setDrainsProperlyFunctional(text);
                          setFieldValue('DrainsProperlyFunctional', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.DrainsProperlyFunctional
                            : DrainsProperlyFunctional
                        }
                      />}
                      {(values?.InternalDrainsAvailable||InternalDrainsAvailable)&&<Text style={{color: 'red'}}>
                        {errors?.DrainsProperlyFunctional}
                      </Text>} */}
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        9. {t('Is the village electrified?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setIsElectrified(text);
                          setFieldValue('IsElectrified', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.IsElectrified
                            : IsElectrified
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.IsElectrified}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        10. {t('Is street lighting available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setStreetLightingAvailable(text);
                          setFieldValue('StreetLightingAvailable', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.StreetLightingAvailable
                            : StreetLightingAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.StreetLightingAvailable}
                      </Text>
                      {(values?.StreetLightingAvailable||StreetLightingAvailable)&&<Spacing space={SH(5)} />}
                       {(values?.StreetLightingAvailable||StreetLightingAvailable)&&<Text style={AnalyaticsStyles.PleaseEnterDate}>
                        {t('What type of street lighting is provided?')}
                      </Text>}
                      {(values?.StreetLightingAvailable||StreetLightingAvailable)&&<RadioButton
                        arrayData={electricityData}
                        onChangeText={text => {
                          setStreetLightingType(text);
                          setFieldValue('StreetLightingType', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.StreetLightingType
                            : StreetLightingType
                        }
                      />}
                      {(values?.StreetLightingAvailable||StreetLightingAvailable)&&<Text style={{color: 'red'}}>
                        {errors?.StreetLightingType}
                      </Text>}
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
                          // Alert.alert("text",text);
                          setVillageConnectedToGP(text);
                          setFieldValue('VillageConnectedToGP', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.VillageConnectedToGP
                            : VillageConnectedToGP
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.VillageConnectedToGP}
                      </Text>
                      {(VillageConnectedToGP=="false"||values?.VillageConnectedToGP=="Partially")&&<Spacing space={SH(2)} />}
                      {(VillageConnectedToGP=="false"||values?.VillageConnectedToGP=="Partially")&&<Input
                        title={t(
                            'If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?',
                          )
                        }
                        placeholder={t(
                          'If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?',
                        )}
                        onChangeText={text => {
                          setFieldValue('LengthAllWeatherRoadToGP', text);
                        }}
                        value={values?.LengthAllWeatherRoadToGP}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />}
                      {/* <Text style={{color: 'red'}}>{errors?.LengthAllWeatherRoadToGP}</Text> */}

                      <Spacing space={SH(9)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        12.{' '}
                        {t(
                          'Is the GP head quarter connected to any PWD road or State highway or Nation Highway by an all weather road?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData2}
                        onChangeText={text => {
                          setGPConnectedToPWDOrHighway(text);
                          setFieldValue('GPConnectedToPWDOrHighway', text);
                        }}
                        value={
                          editData != undefined
                            ? values.GPConnectedToPWDOrHighway
                            : GPConnectedToPWDOrHighway
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.GPConnectedToPWDOrHighway}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={
                          '13. ' +
                          t(
                            'What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?',
                          )
                        }
                        placeholder={t(
                          'What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?',
                        )}
                        onChangeText={text => {
                          setFieldValue('LengthAllWeatherRoadToHighway', text);
                        }}
                        value={values?.LengthAllWeatherRoadToHighway}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.LengthAllWeatherRoadToHighway}
                      </Text>
                    </View>
                  )}
                  {/* Three question start */}
                  {currentQuestion === 3 && (
                    <View>
                      <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Information Related to Migration')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={'14. ' + t('No of men currently in migration?')}
                        placeholder={t('No of men currently in migration?')}
                        onChangeText={text => {
                          setFieldValue('MenInMigration', Number(text) || 0);
                          const men = Number(text) || 0;
                          const women = Number(values?.WomenInMigration) || 0;
                          const children =
                            Number(values?.MinorChildrenInMigration) || 0;

                          const total = men + women + children;

                          setFieldValue(
                            'TotalPersonsInMigration',
                            JSON.stringify(total),
                          );
                        }}
                        value={values?.MenInMigration}
                        inputType={'numeric'}
                        maxLength={6}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.MenInMigration}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={
                          '15. ' + t('No of women currently in migration?')
                        }
                        inputType={'numeric'}
                        maxLength={6}
                        placeholder={t('No of women currently in migration?')}
                        onChangeText={text => {
                          setFieldValue('WomenInMigration', Number(text) || 0);
                          const men = Number(values?.MenInMigration) || 0;
                          const women = Number(text) || 0;
                          const children =
                            Number(values?.MinorChildrenInMigration) || 0;

                          const total = men + women + children;

                          setFieldValue(
                            'TotalPersonsInMigration',
                            JSON.stringify(total),
                          );
                        }}
                        value={values?.WomenInMigration}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.WomenInMigration}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={
                          '16. ' +
                          t(
                            'No of minor children below 18 yrs age currently in migration?',
                          )
                        }
                        placeholder={t(
                          'No of minor children below 18 yrs age currently in migration?',
                        )}
                        onChangeText={text => {
                          setFieldValue(
                            'MinorChildrenInMigration',
                            Number(text) || 0,
                          );
                          const men = Number(values?.MenInMigration) || 0;
                          const women = Number(values?.WomenInMigration) || 0;
                          const children = Number(text) || 0;

                          const total = men + women + children;

                          setFieldValue(
                            'TotalPersonsInMigration',
                            JSON.stringify(total),
                          );
                        }}
                        value={values?.MinorChildrenInMigration}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        inputType={'numeric'}
                        maxLength={6}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.MinorChildrenInMigration}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={
                          '17. ' +
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

                      

                      


                      

                      

                      {/* <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("What are the sources of Irrigation?")}</Text>
                {renderCheckboxes2()}
                {<Spacing space={SH(5)}/>}


                <Text style={AnalyaticsStyles.PleaseEnterDate}>{t("Whether involved in livestock activity?")}</Text>
                {renderCheckboxes3()}
                {<Spacing space={SH(5)}/>} */}
                    </View>
                  )}
                  {currentQuestion === 4 && (<View>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Water Supply & Sanitation')}
                      </Text>
                      <Spacing space={SH(10)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        18. {t('Main source of drinking water?')}
                      </Text>
                       {renderCheckboxes4()}
                      {/* <RadioButton
                        arrayData={waterSourceData}
                        onChangeText={text => {
                          setFieldValue('DrinkingWaterSource', text);
                          setDrinkingWaterSource(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.DrinkingWaterSource
                            : DrinkingWaterSource
                        }
                      /> */}
                      <Text style={{color: 'red'}}>
                        {errors?.DrinkingWaterSource}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        19. {t('Are all households having toilets?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setAllHouseholdsWithToilets(text);
                          setFieldValue('AllHouseholdsWithToilets', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.AllHouseholdsWithToilets
                            : AllHouseholdsWithToilets
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.AllHouseholdsWithToilets}
                      </Text>
                  </View>)}
                   {currentQuestion === 5 && (<View>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Education & Health Facilities')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        20. {t('Is there a functioning Anganwadi Centre?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('AnganwadiCentre', text);
                          setAnganwadiCentre(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.AnganwadiCentre
                            : AnganwadiCentre
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.AnganwadiCentre}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        21.{' '}
                        {t('Is Primary school available within the village?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('PrimarySchoolAvailable', text);
                          setPrimarySchoolAvailable(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.PrimarySchoolAvailable
                            : PrimarySchoolAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.PrimarySchoolAvailable}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        22. {t('Is Secondary school within 3 km distance?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('SecondarySchoolWithin3km', text);
                          setSecondarySchoolWithin3km(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.SecondarySchoolWithin3km
                            : SecondarySchoolWithin3km
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.SecondarySchoolWithin3km}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        23. {t('Is there a Sub Health Centre in the village?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('SubHealthCentre', text);
                          setSubHealthCentre(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.SubHealthCentre
                            : SubHealthCentre
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.SubHealthCentre}
                      </Text>
                   </View>)}
                    {currentQuestion === 6 && (<View>
                      <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Community & Social Infrastructure')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        24. {t('Community Centre available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('CommunityCentreAvailable', text);
                          setCommunityCentreAvailable(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.CommunityCentreAvailable
                            : CommunityCentreAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.CommunityCentreAvailable}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        25. {t('Common shed for WSHG available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('CommonShedForWSHG', text);
                          setCommonShedForWSHG(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.CommonShedForWSHG
                            : CommonShedForWSHG
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.CommonShedForWSHG}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        26. {t('Availability of playground in the village?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('PlaygroundAvailable', text);
                          setPlaygroundAvailable(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.PlaygroundAvailable
                            : PlaygroundAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.PlaygroundAvailable}
                      </Text>
                      <Spacing space={SH(15)} />
                      <Input
                        title={
                          '27. ' +
                          t('No. of community tanks available in the village?')
                        }
                        placeholder={t(
                          'No. of community tanks available in the village?',
                        )}
                        onChangeText={text =>
                          setFieldValue('CommunityTanks', text)
                        }
                        value={values?.CommunityTanks}
                        inputType={'numeric'}
                        maxLength={6}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.CommunityTanks}
                      </Text>

                    </View>)}
                     {currentQuestion === 7 &&  (<View>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Livelihood & Service Infrastructure')}
                      </Text>
                     {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        33. {t('Is mobile network coverage available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setMobileNetworkCoverage(text);
                          setFieldValue('MobileNetworkCoverage', text);
                        }}
                        value={
                          editData != undefined
                            ? values.MobileNetworkCoverage
                            : MobileNetworkCoverage
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.MobileNetworkCoverage}
                      </Text> */}
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        28.{' '}
                        {t(
                          'Is Digital last mile connectivity (internet facility) available?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setDigitalConnectivity(text);
                          setFieldValue('DigitalConnectivity', text);
                        }}
                        value={
                          editData != undefined
                            ? values.DigitalConnectivity
                            : DigitalConnectivity
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.DigitalConnectivity}
                      </Text>
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        35. {t('Is there a drying yard available?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setDryingYard(text);
                          setFieldValue('DryingYard', text);
                        }}
                        value={
                          editData != undefined ? values.DryingYard : DryingYard
                        }
                      />
                      <Text style={{color: 'red'}}>{errors?.DryingYard}</Text> */}
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        29. {t('Is there a PDS (ration shop) in the village?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setPDSAvailable(text);
                          setFieldValue('PDSAvailable', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.PDSAvailable
                            : PDSAvailable
                        }
                      />
                      <Text style={{color: 'red'}}>{errors?.PDSAvailable}</Text>
                      <Spacing space={SH(15)} />
                      {values?.PDSAvailable == false && (
                        <Input
                          title={t(
                            'If No, distance of PDS (ration shop) from the village (in km)?',
                          )}
                          placeholder={t(
                            'If No, distance of PDS (ration shop) from the village (in km)?',
                          )}
                          onChangeText={text => {
                            setFieldValue('DistanceOfPDS', text);
                          }}
                          value={values?.DistanceOfPDS}
                          maxLength={6}
                          inputType={'numeric'}
                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        />
                      )}
                      <Text style={{color: 'red'}}>
                        {errors?.DistanceOfPDS}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        30.{' '}
                        {t(
                          'Whether banking or post office or KIOSK or mini bank services are available within 3 km distance from the village?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setBankingPostOfficeNearby(text);
                          setFieldValue('BankingPostOfficeNearby', text);
                        }}
                        value={
                          editData != undefined
                            ? values?.BankingPostOfficeNearby
                            : BankingPostOfficeNearby
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.BankingPostOfficeNearby}
                      </Text>


                     </View>)}
                     

                  {/* Four question start */}
                  {currentQuestion === 8 && (
                    <View>
                      <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Water Resource & Irrigation Structures')}
                      </Text>
                      <Spacing space={SH(10)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        31.{' '}
                        {t(
                          'Is water from any mega, medium or minor irrigation project available to the village?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('WaterFromIrrigationProject', text);
                          setWaterFromIrrigationProject(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.WaterFromIrrigationProject
                            : WaterFromIrrigationProject
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.WaterFromIrrigationProject}
                      </Text>
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        {t(
                          'If Yes, Whether repair or construction of a new distribution canal is required?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue(
                            'RepairOrNewDistributionCanalRequired',
                            text,
                          );
                          setRepairOrNewDistributionCanalRequired(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.RepairOrNewDistributionCanalRequired
                            : RepairOrNewDistributionCanalRequired
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.RepairOrNewDistributionCanalRequired}
                      </Text> */}
                      {RepairOrNewDistributionCanalRequired && (
                        <Spacing space={SH(5)} />
                      )}
                      {/* {RepairOrNewDistributionCanalRequired && (
                        <Input
                          title={
                            '40. ' +
                            t(
                              'If Yes, Length of distribution canal requiring repair or new construction in RMT?',
                            )
                          }
                          placeholder={t(
                            'If Yes, Length of distribution canal requiring repair or new construction in RMT?',
                          )}
                          onChangeText={text => {
                            setFieldValue('LengthOfDistributionCanal', text);
                          }}
                          value={values?.LengthOfDistributionCanal}
                          inputType="numeric"
                          maxLength={10}
                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        />
                      )} */}
                      {/* <Text style={{color: 'red'}}>
                        {errors?.LengthOfDistributionCanal}
                      </Text> */}
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        40.{' '}
                        {t(
                          'Is there functional lift irrigation project available?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('FunctionalLiftIrrigation', text);
                          setFunctionalLiftIrrigation(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.FunctionalLiftIrrigation
                            : FunctionalLiftIrrigation
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.FunctionalLiftIrrigation}
                      </Text> */}
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        41. {t('Scope of new lift irrigation project?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('ScopeOfNewLiftIrrigation', text);
                          setScopeOfNewLiftIrrigation(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.ScopeOfNewLiftIrrigation
                            : ScopeOfNewLiftIrrigation
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.ScopeOfNewLiftIrrigation}
                      </Text> */}
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        32.{' '}
                        {t(
                          'Availability of functional Check Dams in the village?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('FunctionalCheckDams', text);
                          setFunctionalCheckDams(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.FunctionalCheckDams
                            : FunctionalCheckDams
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.FunctionalCheckDams}
                      </Text>
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        43. {t('Scope of new Check Dams in the village?')}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('ScopeOfNewCheckDams', text);
                          setScopeOfNewCheckDams(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.ScopeOfNewCheckDams
                            : ScopeOfNewCheckDams
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.ScopeOfNewCheckDams}
                      </Text> */}
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        44.{' '}
                        {t(
                          'Availability of functional distribution canal in the village in RMT?',
                        )}
                      </Text>
                      <RadioButton
                        arrayData={selfHelpData}
                        onChangeText={text => {
                          setFieldValue('FunctionalDistributionCanal', text);
                          setFunctionalDistributionCanal(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.FunctionalDistributionCanal
                            : FunctionalDistributionCanal
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.FunctionalDistributionCanal}
                      </Text> */}
                      <Spacing space={SH(5)} />
                      {values.FunctionalDistributionCanal == true && (
                        <Input
                          title={t(
                            'If Yes, Scope of new distribution canal in the village in RMT?',
                          )}
                          placeholder={t(
                            'If Yes, Scope of new distribution canal in the village in RMT?',
                          )}
                          onChangeText={text => {
                            setFieldValue('ScopeOfNewDistributionCanal', text);
                          }}
                          value={values?.ScopeOfNewDistributionCanal}
                          titleStyle={AnalyaticsStyles.PleaseEnterDate}
                        />
                      )}

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
                /> */}
                    </View>
                  )}
                  {/*five question start */}
                  {currentQuestion === 9 && (
                    <View>
                      <Text style={AnalyaticsStyles.TitleStyle}>
                        {t('Respondent Details')}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Input
                        title={'33. ' + t('Respondent Name')}
                        placeholder={t('Respondent Name')}
                        onChangeText={text => {
                          setFieldValue('RespondentName', text);
                        }}
                        value={values?.RespondentName}
                        maxLength={200}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.RespondentName}
                      </Text>
                      <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        34. {t('Identity')}
                      </Text>
                      <RadioButton
                        arrayData={identityData}
                        onChangeText={text => {
                          setFieldValue('IdentityRole', text);
                          setIdentityRole(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.IdentityRole
                            : IdentityRole
                        }
                      />
                      <Text style={{color: 'red'}}>{errors?.IdentityRole}</Text>
                      {/* <Spacing space={SH(5)} />
                      <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        47. {t('Process Adopted for Survey')}
                      </Text>
                      <RadioButton
                        arrayData={processAdoptedData}
                        onChangeText={text => {
                          setFieldValue('SurveyProcess', text);
                          setSurveyProcess(text);
                        }}
                        value={
                          editData != undefined
                            ? values?.SurveyProcess
                            : SurveyProcess
                        }
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.SurveyProcess}
                      </Text> */}
                      <Spacing space={SH(1)} />
                      <Input
                        title={'35. ' + t('Respondent contact mobile no.?')}
                        placeholder={t('Respondent contact mobile no.?')}
                        onChangeText={text => {
                          setFieldValue('RespondentMobile', text);
                        }}
                        value={values?.RespondentMobile}
                        inputType="numeric"
                        maxLength={10}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.RespondentMobile}
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
                      <View style={AnalyaticsStyles.PaddingHori}>
                         <Text style={AnalyaticsStyles.PleaseEnterDate}>
                        36. {t('Click on the icon to capture GEO location')}
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
                      <Spacing space={SH(10)} />
                      <Input
                        title={'37. ' + t('Enumerator Name')}
                        placeholder={t('Enumerator Name')}
                        onChangeText={text =>
                          setFieldValue('EnumeratorName', text)
                        }
                        value={values?.EnumeratorName}
                        maxLength={200}
                        titleStyle={AnalyaticsStyles.PleaseEnterDate}
                      />
                      <Text style={{color: 'red'}}>
                        {errors?.EnumeratorName}
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
                        38. {t('Survey Date and Time')}
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
                      {previewData?.District}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Block:</Text>{' '}
                      {previewData?.Block}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Gram Panchayat')}:
                      </Text>{' '}
                      {previewData?.GramPanchayat}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Revenue Village')}:
                      </Text>{' '}
                      {previewData?.RevenueVillage}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total number of households')}:
                      </Text>{' '}
                      {previewData?.TotalHouseholds}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Male')}:</Text>{' '}
                      {previewData?.MalePopulation}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Female')}:</Text>{' '}
                      {previewData?.FemalePopulation}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total Population')}:
                      </Text>{' '}
                      {previewData?.TotalPopulation}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Are internal village roads pucca (concrete)?')}:
                      </Text>{' '}
                      {previewData?.InternalVillageRoads}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If No or Partially, requirement of internal village pucca roads (in RMT)?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.InternalVillageRoadsRequirement}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Are internal drains available?')}:
                      </Text>{' '}
                      {previewData?.InternalDrainsAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('If Yes, Are drains properly functional?')}:
                      </Text>{' '}
                      {previewData?.DrainsProperlyFunctional}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is the village electrified?')}:
                      </Text>{' '}
                      {previewData?.IsElectrified}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is street lighting available?')}:
                      </Text>{' '}
                      {previewData?.StreetLightingAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('What type of street lighting is provided?')}:
                      </Text>{' '}
                      {previewData?.StreetLightingType}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is the village connected to the GP headquarters by an all weather road?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.VillageConnectedToGP}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If No/partial, What is the length of all weather road required to connect the village with GP headquarters in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.LengthAllWeatherRoadToGP}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is the GP head quarter connected to any PWD road or State highway or Nation Highway by an all weather road?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.GPConnectedToPWDOrHighway}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'What is the length of all weather road required to connect the GP headquarter with the existing PWD road or State Highway or National Highway in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.LengthAllWeatherRoadToHighway}
                    </Text>

                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Information Related to Migration')}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No of men currently in migration?')}:
                      </Text>{' '}
                      {previewData?.MenInMigration}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No of women currently in migration?')}:
                      </Text>{' '}
                      {previewData?.WomenInMigration}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'No of minor children below 18 yrs age currently in migration?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.MinorChildrenInMigration}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Total No. of person currently in migration?')}:
                      </Text>{' '}
                      {JSON.stringify(
                        parseInt(previewData?.MenInMigration) +
                          parseInt(previewData?.WomenInMigration) +
                          parseInt(previewData?.MinorChildrenInMigration),
                      )}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Water Supply & Sanitation')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Main source of drinking water?')}:
                      </Text>{' '}
                      {previewData?.DrinkingWaterSource}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Are all households having toilets?')}:
                      </Text>{' '}
                      {previewData?.AllHouseholdsWithToilets}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Education & Health Facilities')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is there a functioning Anganwadi Centre?')}:
                      </Text>{' '}
                      {previewData?.AnganwadiCentre}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is Primary school available within the village?')}:
                      </Text>{' '}
                      {previewData?.PrimarySchoolAvailable}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is Secondary school within 3 km distance?')}:
                      </Text>{' '}
                      {previewData?.SecondarySchoolWithin3km}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        {t('Is there a Sub Health Centre in the village?')}:
                      </Text>{' '}
                      {previewData?.SubHealthCentre}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Community & Social Infrastructure')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Community Centre available?')}:
                      </Text>{' '}
                      {previewData?.CommunityCentreAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Common shed for WSHG available?')}:
                      </Text>{' '}
                      {previewData?.CommonShedForWSHG}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Availability of playground in the village?')}:
                      </Text>{' '}
                      {previewData?.PlaygroundAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('No. of community tanks available in the village?')}:
                      </Text>{' '}
                      {previewData?.CommunityTanks}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Livelihood & Service Infrastructure')}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is mobile network coverage available?')}:
                      </Text>{' '}
                      {previewData?.MobileNetworkCoverage}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is Digital last mile connectivity (internet facility) available?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.DigitalConnectivity}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is there a drying yard available?')}:
                      </Text>{' '}
                      {previewData?.DryingYard}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Is there a PDS (ration shop) in the village?')}:
                      </Text>{' '}
                      {previewData?.PDSAvailable}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        {t(
                          'If No, distance of PDS (ration shop) from the village (in km)?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.DistanceOfPDS}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Whether banking or post office or KIOSK or mini bank services are available within 3 km distance from the village?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.BankingPostOfficeNearby}
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
                      {previewData?.WaterFromIrrigationProject}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If Yes, Whether repair or construction of a new distribution canal is required?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.RepairOrNewDistributionCanalRequired}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If Yes, Length of distribution canal requiring repair or new construction in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.LengthOfDistributionCanal}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Is there functional lift irrigation project available?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.FunctionalLiftIrrigation}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Scope of new lift irrigation project?')}:
                      </Text>{' '}
                      {previewData?.ScopeOfNewLiftIrrigation}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Availability of functional Check Dams in the village?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.FunctionalCheckDams}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Scope of new Check Dams in the village?')}:
                      </Text>{' '}
                      {previewData?.ScopeOfNewCheckDams}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'Availability of functional distribution canal in the village in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.FunctionalDistributionCanal}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t(
                          'If Yes, Scope of new distribution canal in the village in RMT?',
                        )}
                        :
                      </Text>{' '}
                      {previewData?.ScopeOfNewDistributionCanal}
                    </Text>
                    <Text style={AnalyaticsStyles.TitleStyle}>
                      {t('Respondent Details')}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Respondent Name')}:
                      </Text>{' '}
                      {previewData?.RespondentName}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Identity')}:</Text>{' '}
                      {previewData?.IdentityRole}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Process Adopted for Survey')}:
                      </Text>{' '}
                      {previewData?.SurveyProcess}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Respondent contact mobile no.?')}:
                      </Text>{' '}
                      {previewData?.RespondentMobile}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Capture a photo of the meeting/FGD')}:
                      </Text>{' '}
                      {previewData?.MeetingPhotoPath}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>{t('Location')}:</Text>{' '}
                      {previewData?.GeoLocation}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Enumerator Name')}:
                      </Text>{' '}
                      {previewData?.EnumeratorName}
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {t('Survey Date and Time')}:
                      </Text>{' '}
                      {previewData?.SurveyDate}
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
                      (location ? location.coords.latitude : null) +
                      ',' +
                      (location ? location.coords.longitude : null);
                    setFieldValue('GeoLocation', res);

                    let finalValuesPreview = {
                      ...values,
                      SurveyDate: dateSelectLocal,
                    };

                    setPreviewData(finalValuesPreview);
                    setShowConfirmModal(true);
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
                        'DrinkingWaterSource',
                        waterArray,
                      );
                       setDrinkingWaterSource(waterArray);
                    }
                   
                    // handleSubmit();
                  }}>
                  <Text style={AnalyaticsStyles.PreviousTextStyle}>
                    {t('Submit')}
                  </Text>
                </TouchableOpacity>
              )}
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
        message={alertMessage}
        modalVisible={familyAlertVisible}
        setModalVisible={setFamilyAlertVisible}
        onPress={() => {
          setFamilyAlertVisible(!familyAlertVisible), onoknutton();
        }}
        buttonminview={Style.ButtonCenter}
        iconVisible={true}
        buttonText={t('Ok')}
      />
      <Loader visible={loading} />
    </View>
  );
};
export default VillageFormSurveyTab;
