import React, { useState, useEffect } from 'react';
import RouteName from './RouteName';
import { CustomSidebarMenu, AppHeader, CaLLicon } from '../components';
import { Colors } from '../utils';
import { DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TabNavigator } from '../routes';
import {
  Chatscreen, SettingsScreen, HelpScreen, FAQScreen, ReviewsScreen, NotificationScreen,
  PaymentScreen,
  PaymentSuccessFully,
} from '../screens';
import { Style } from '../styles';

const SideNavigator = (props) => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const { detailsStore } = useSelector(state => state.DataReducer) || { detailsStore };
  const { t } = useTranslation();
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const HeaderArray = {
    headerShown: true,
    headerTintColor: Colors.white_text_color,
    headerShadowVisible: false,
    headerStyle: Style.headerStyle,
  };
  const [colorValue, setColorValue] = useState(MyTheme)
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
  return (
    <Drawer.Navigator theme={colorValue} drawerContent={(props) => <CustomSidebarMenu {...props} />} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={RouteName.TAB_NAVIGATOR} component={TabNavigator} />
     
      <Drawer.Screen
        name={RouteName.HELP_SCREEN} component={HelpScreen}
        options={{
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Help_Text")} />,
          ...HeaderArray,
        }}
      />
      <Drawer.Screen
        name={RouteName.FAQ_SCREEN} component={FAQScreen}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("FAQ_Text")} />,
          ...HeaderArray,
        }}
      />
      <Drawer.Screen
        name={RouteName.NOTIFICTION_SCREEN} component={NotificationScreen}
        options={{
          headerShown: true,
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Notification_Text")} />,
          ...HeaderArray,
        }}
      />
      <Drawer.Screen
        name={RouteName.REVIEWS_SCREEN} component={ReviewsScreen}
        options={{
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Reviews_Screen")} />,
          ...HeaderArray,
        }}
      />
      <Drawer.Screen
        name={RouteName.SETTING_SCREEN} component={SettingsScreen}
        options={{
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Setting_Text")} />,
          ...HeaderArray,
        }}
      />


    </Drawer.Navigator>
  );
}
export default SideNavigator;