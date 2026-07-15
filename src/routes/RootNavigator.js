import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from "react-redux";
import { Colors, Fonts, SF } from '../utils';

const Stack = createNativeStackNavigator();

import { RouteName, SideNavigator } from '../routes';

import {
  LoginScreen, RegisterScreen, OtpVeryfiveScreen,
  SplashScreen, RegistrationSuccessful,
  Swiperscreen,
  TranslationScreen, ForgotPassword, PaymentSuccessFully, MapScreen, EditProfileScreen,
  AllServeyScreen,
  ThankyouScreen,
  EditLocationScreen,
  ViewSurveyReportScreen,
  FamilyFormSurveyEdit,
  VillageFormSurveyEdit
} from '../screens';
import FamilyFormList from '../screens/Home/Tab/FamilyFormList';
import VillageFormList from '../screens/Home/Tab/VillageFormList';
import { Style } from '../styles';
import HeaderLeftMenuIcon from '../components/commonComponents/HeaderLeftMenuIcon';
import ColorPicker from '../components/commonComponents/ColorPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login_data_action } from '../redux/action/DataAction';
import { Alert } from 'react-native';


const RootNavigator = props => {

  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const [colorValue, setColorValue] = useState(MyTheme);
  const HeaderArray = {
    headerShown: true,
    headerTitleStyle: Style.headerTitleStyle,
    headerShadowVisible: false,
  };
  useEffect(() => {
    if (Colors.length != 0 && colorrdata != "") {
      Colors.theme_background = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew)
    }
  }, [colorrdata, Colors])
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const session = await AsyncStorage.getItem('user_session');
        if (session !== null) {
          const parsedSession = JSON.parse(session);
          // Restore the data back into your Redux store
          dispatch(login_data_action(parsedSession));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error reading session", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // if (isLoading) {
  //   return <Loader visible={true} />; // or a splash screen
  // }

  return (
    <NavigationContainer theme={colorValue}>
     <Stack.Navigator key={isLoggedIn ? "user-app" : "guest-app"} screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
           <>
        <Stack.Screen name={RouteName.HOME_SCREEN} component={SideNavigator} />
         <Stack.Screen name={RouteName.REGIATRAION_SUCCESSFULL} component={RegistrationSuccessful} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVeryfiveScreen} />
        <Stack.Screen name={RouteName.SWIPER_SCREEN} component={Swiperscreen} />
        <Stack.Screen name={RouteName.SELECT_LANGUAGE} component={TranslationScreen} />
        <Stack.Screen name={RouteName.FORGOT_PASSWORD} component={ForgotPassword} />
           <Stack.Screen
      name={RouteName.FAMILY_SURVEY_EDIT_TAB}
      component={FamilyFormSurveyEdit}
      />
       <Stack.Screen
      name={RouteName.VILLAGE_SURVEY_EDIT_TAB}
      component={VillageFormSurveyEdit}
      />
       <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
       </>
      ) : ( 
        <>
         <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={RouteName.REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={RouteName.HOME_SCREEN} component={SideNavigator} />
        <Stack.Screen name={RouteName.REGIATRAION_SUCCESSFULL} component={RegistrationSuccessful} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVeryfiveScreen} />
        <Stack.Screen name={RouteName.SWIPER_SCREEN} component={Swiperscreen} />
        <Stack.Screen name={RouteName.SELECT_LANGUAGE} component={TranslationScreen} />
        <Stack.Screen name={RouteName.FORGOT_PASSWORD} component={ForgotPassword} />
           <Stack.Screen
      name={RouteName.FAMILY_SURVEY_EDIT_TAB}
      component={FamilyFormSurveyEdit}
      />
       <Stack.Screen
      name={RouteName.VILLAGE_SURVEY_EDIT_TAB}
      component={VillageFormSurveyEdit}
      />
      </>

       
      )}
       
       </Stack.Navigator>
        {/* <Stack.Screen name={RouteName.SPLSH} component={SplashScreen} /> */}
       

      
          {/* <Stack.Screen name={RouteName.FAMILY_LIST_TAB} component={FamilyFormList} />
          <Stack.Screen name={RouteName.VILLAGE_LIST_TAB} component={VillageFormList} /> */}
        {/* <Stack.Screen
          options={{
            headerShown: true,
            title: "All Survey",
            headerTintColor: Colors.white_text_color,
            headerTitleStyle: {
              fontFamily: Fonts.Poppins_Medium,
              color: Colors.white_text_color
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.theme_background,
            }
          }}
          name={RouteName.ALL_SERVEY_SCREEN} component={AllServeyScreen} />
        <Stack.Screen name={RouteName.EDIT_PROFILE_SCREEN} options={{
          headerShown: true,
          title: "Edit Profile",
          headerTintColor: Colors.white_text_color,
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Medium,
            color: Colors.white_text_color
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          }
        }} component={EditProfileScreen} />
        <Stack.Screen name={RouteName.THANK_YOU_SCREEN} component={ThankyouScreen} />
        <Stack.Screen name={RouteName.MAP_SCREEN} options={{
          headerShown: true,
          title: "Map",
          headerTintColor: Colors.white_text_color,
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Medium,
            color: Colors.white_text_color
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          }
        }} component={MapScreen} />
        <Stack.Screen name={RouteName.EDIT_LOCATION_SCREEN} options={{
          headerShown: true,
          title: "Edit Location",
          headerTintColor: Colors.white_text_color,
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Medium,
            color: Colors.white_text_color
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          }
        }} component={EditLocationScreen} />
        <Stack.Screen name={RouteName.VIEW_REPORT_SCREEN} options={{
          headerShown: true,
          title: "View Report",
          headerTintColor: Colors.white_text_color,
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Medium,
            color: Colors.white_text_color
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          }
        }} component={ViewSurveyReportScreen} /> */}
           {/* <Stack.Screen
        name={"House Hold Schedule-Migration Survey List"}
        component={FamilyFormList}
        options={{
          ...HeaderArray,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerTitleStyle:{
            fontWeight:"bold",
            fontSize:SF(20),
            color:"white"

          },
          // headerLeft: () => (
          //   <HeaderLeftMenuIcon {...props} />
          // ),
          // headerRight: () => (
          //   <ColorPicker />
          // ),
        }}
      /> */}

    
     
    </NavigationContainer>
  );
}
export default RootNavigator;