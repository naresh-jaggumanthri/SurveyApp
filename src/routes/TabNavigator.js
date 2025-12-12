import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, SurveyFormTab, WishiList } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Style } from '../styles';
import { ColorPicker, CustomSidebarMenu, HeaderLeftMenuIcon, VectorIcon, AppHeader } from '../components';
import RouteName from '../routes/RouteName';
import { Colors, SH, SF } from '../utils';
import { useTranslation } from "react-i18next";
import FamilyFormSurveyTab from '../screens/Home/Tab/FamilyFormSurveyTab';
import VillageFormSurveyTab from '../screens/Home/Tab/VillageFormSurveyTab';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HeaderArray = {
  headerShown: true,
  headerTitleStyle: Style.headerTitleStyle,
  headerShadowVisible: false,
};
function DrawerSidebarScreen(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <CustomSidebarMenu {...props} />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScsreenTabAll" drawerContent={props => <DrawerSidebarScreen {...props} />}>
      <Drawer.Screen name="HomeScsreenTabAll"
        options={{ headerShown: false }}
        component={HomeScsreenTabAll} />
    </Drawer.Navigator>
  );
}
function Root() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="Homese" component={HomeScsreenTabAll}
        options={{
          title: '',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
export default Root;

function HomeTabScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={t("Side_Title_1")}
        component={Home}
        title="Home"
        options={{
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function SurveyFormScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Offers">
      <Stack.Screen
        name={t("Side_Title_3")}
        component={SurveyFormTab}
        options={{
          ...HeaderArray,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FamilySurveyFormScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Offers">
      <Stack.Screen
        name={t("Side_Title_11")}
        component={FamilyFormSurveyTab}
        options={{
          ...HeaderArray,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function VillageSurveyFormScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Offers">
      <Stack.Screen
        name={t("Side_Title_12")}
        component={VillageFormSurveyTab}
        options={{
          ...HeaderArray,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name={t("Side_Title_7")}
        component={Profile}
        options={{
          ...HeaderArray,
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function HomeScsreenTabAll() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Homes"
      screenOptions={{ headerShown: false,
        tabBarActiveTintColor: Colors.theme_background,
        tabBarInactiveTintColor: Colors.gray_text_color,
        labeled: true,
        labelStyle: {
        },
        tabStyle: {
          height: SH(60),
          backgroundColor: Colors.white_text_color,
          paddingBottom: SH(10),
        },
      }}
    >
      <Tab.Screen
        name={RouteName.HOME_TAB}
        component={HomeTabScreenStack}
        options={{
          tabBarLabel: t("Side_Title_1"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="home"
              icon="AntDesign"
              size={SF(25)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.FAMILY_SURVEY_TAB}
        component={FamilySurveyFormScreenStack}
        options={{
          tabBarLabel: t("Side_Title_11"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="form"
              icon="AntDesign"
              size={SF(25)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.VILLAGE_SURVEY_TAB}
        component={VillageSurveyFormScreenStack}
        options={{
          tabBarLabel: t("Side_Title_12"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="form"
              icon="AntDesign"
              size={SF(25)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.PROFILE_TAB}
        component={ProfileScreenStack}
        options={{
          tabBarLabel: t("Profile_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="user-circle"
              icon="FontAwesome"
              size={SF(20)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
