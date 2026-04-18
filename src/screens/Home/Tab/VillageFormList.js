import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { Colors, SH, SW, widthPercent } from '../../../utils';
import { Spacing, RecentlyDataView, VectorIcon, RecentlyDataViewVillage } from '../../../components';
import { HomeTabStyle, Style } from '../../../styles';
import { PieChart, LineChart } from 'react-native-chart-kit';
import images from '../../../index';
import { RouteName } from "../../../routes";
import { useTranslation } from "react-i18next";
import { ScrollView } from 'react-native-virtualized-view';
import { useSelector } from 'react-redux';
import api from '../../../api';
import PubSub from 'pubsub-js';
import DeviceHelper from '../../../utils/DeviceHelper';
import Loader from '../../../components/commonComponents/Loader';
import { AppDataSource } from '../../../database/database';
import { VillageSurvey } from '../../../database/entities/VillageSurvey';
import { v4 as uuidv4 } from 'uuid';
import UserProfileCard from '../../../components/commonComponents/UserProfileCard';

const VillageFormList = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { loginData } = useSelector(state => state.DataReducer) || {};
   useEffect(()=>{
  getVillageList();
    },[]);
  const data = [
    { name: t("Home_Title_1"), population: 21500000, color: '#f16c26' },
    { name: t("Home_Title_2"), population: 12000000, color: 'green' },
    { name: t("Home_Title_3"), population: 8538000, color: '#12205d' },
  ];
  const [tabshow, settabshow] = useState(1);
  const LineChartData = {
    labels: [t("Home_Title_22"), t("Home_Title_23"), t("Home_Title_24"), t("Home_Title_25"),],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
    ],
  };
  const RecentlyData = [
    {
      text: 'Side_Title_11',
      imageset: images.Recently_Image_1,
      musicname: 'Home_Title_46',
      TextTwo: 'Home_Title_47',
      TextThree: '144k +',
    },
    {
      text: 'Side_Title_12',
      imageset: images.Recently_Image_2,
      musicname: 'Home_Title_48',
      TextTwo: 'Home_Title_49',
      TextThree: '12M +',
    },
    // {
    //   text: 'Home_Title_8',
    //   imageset: images.Recently_Image_3,
    //   musicname: 'Home_Title_50',
    //   TextTwo: 'Survey_Title_1',
    //   TextThree: '599K +',
    // },
    // {
    //   text: 'Home_Title_10',
    //   imageset: images.Recently_Image_4,
    //   musicname: 'Survey_Title_2',
    //   TextTwo: 'Survey_Title_3',
    //   TextThree: '300K +',
    // },
    // {
    //   text: 'Home_Title_12',
    //   imageset: images.Recently_Image_5,
    //   musicname: 'Survey_Title_4',
    //   TextTwo: 'Survey_Title_5',
    //   TextThree: '98K +',
    // },
    // {
    //   text: 'Home_Title_14',
    //   imageset: images.Recently_Image_1,
    //   musicname: 'Survey_Title_6',
    //   TextTwo: 'Survey_Title_7',
    //   TextThree: '234K +',
    // },
  ];
  const { Colors } = useTheme();
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
   const [villageList,setVillageList]=useState([]);
    const [isConnected, setIsConnected] = useState(true);
      const [loading, setLoading] = useState(false);
       const getOfflineSurveys = async () => {
        const repo = AppDataSource.getRepository(VillageSurvey);
        return await repo.find({
          order: { createdAt: 'DESC' },
        });
      };
      const saveVillageholdsToLocalDB = async (res) => {
        try {
          const repository = AppDataSource.getRepository(VillageSurvey);
      
          const entities = res.map(item => {
            const entity = new VillageSurvey();
      
            entity.localId =
              item?.id ||
              `local-${Date.now()}-${Math.random()}`;
      
            entity.villageholdId =
              item?.id || null;
      
            entity.surveyJson = JSON.stringify(item); // full form data
            entity.imagePath = null;
            entity.status = 'SYNCED';
            entity.createdAt = new Date().toISOString();
      
            return entity;
          });
      
          // ✅ Bulk insert / update
          // await repository.save(entities);
      
          await repository
        .createQueryBuilder()
        .insert()
        .orIgnore()
        .into(VillageSurvey)
        .values(entities)
        .execute();
      
          console.log('Household surveys saved locally');
        } catch (error) {
          console.error('Local DB insert failed:', error);
        }
      };
    const getVillageList =async()=>{
       let token=loginData?.token;
       let isConnected = await DeviceHelper.isConnectedToInternet();
            setIsConnected(isConnected);
             if(!isConnected){
               getOfflineSurveys().then((res)=>{
                 const result=res.map((m)=>{
                   let surveyJson={};
                   try{
                     surveyJson=JSON.parse(m.surveyJson);
                   }catch(e){
                     surveyJson={};
                   }
                   return{
                     text:surveyJson.revenueVillage,
                    imageset: images.village,
                     musicname:surveyJson.respondentName+' ('+surveyJson.identityRole+')',
                   //   TextTwo::m.householdBasicProfile.,
                     TextThree:surveyJson.totalHouseholds,
                     id:surveyJson.localId,
                     item:surveyJson,
                     sync_status:surveyJson.status
         
                   }
               
                 });
                  // Alert.alert("FamilyFormList",JSON.stringify(result));
                 setVillageList(result.reverse());
               });
               return;
             }
         
           const res=await api.user.getMigrationListSurveyData(token);
   
       //      {
       //   text: 'Side_Title_11',
       //   imageset: images.Recently_Image_1,
       //   musicname: 'Home_Title_46',
       //   TextTwo: 'Home_Title_47',
       //   TextThree: '144k +',
       // },
   
       await saveVillageholdsToLocalDB(res);
           
         const result=res.map((m)=>{
           return{
             text:m.revenueVillage,
             imageset: images.village,
             musicname:m.respondentName+' ('+m.identityRole+')',
           //   TextTwo::m.householdBasicProfile.,
             TextThree:m.totalHouseholds,
             item:m,
             sync_status:"synced",
           }
       
         });
       //    Alert.alert("FamilyFormList",JSON.stringify(result));
         setVillageList(result.reverse());
   
     };
      const syncPendingSurveys = async () => {
       const repo = AppDataSource.getRepository(VillageSurvey);
       const pending = await repo.findBy({ status: 'PENDING' });
     
       for (const item of pending) {
         try {
           const formData = new FormData();
     
           formData.append(
             'householdJson',
             JSON.stringify(JSON.parse(item.surveyJson))
           );
     
           if (item.imagePath) {
             formData.append('respondentPhoto', {
               uri: item.imagePath,
               name: 'photo.jpg',
               type: 'image/jpeg',
             });
           }
     
           // Alert.alert("Syncing",JSON.stringify(formData));
     onSavePress(formData);
           // await fetch(API_URL, {
           //   method: 'POST',
           //   headers: {
           //     Authorization: `Bearer ${token}`,
           //   },
           //   body: formData,
           // });
     
           item.status = 'SYNCED';
           await repo.save(item);
     
         } catch (e) {
           item.status = 'FAILED';
           await repo.save(item);
         }
       }
     };
  return (
    <View style={Style.BgColorWhiteAll}>
      <Spacing space={SH(20)} />
      <View style={HomeTabStyles.BackGroundLeft} />
      <View style={HomeTabStyles.BackGroundRight} />
      {/* <Text style={HomeTabStyles.MyDashBoardText}>{t("Home_Title_16")}</Text> */}
      <ScrollView>
        <View style={Style.Container}>
          <View style={Style.MinViewContent}>
            {/* <Spacing space={SH(40)} />
            <View style={HomeTabStyles.FlexDirection}>
              <TouchableOpacity onPress={() => settabshow('1')} style={tabshow == 1 ? HomeTabStyles.WhiteBackground : HomeTabStyles.WhiteBackgroundTwo}>
                <Text style={tabshow == 1 ? HomeTabStyles.MenuTextStyle : HomeTabStyles.MenuTextStyleTwo}>{t("Home_Title_17")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => settabshow('2')} style={tabshow == 2 ? HomeTabStyles.WhiteBackground : HomeTabStyles.WhiteBackgroundTwo}>
                <Text style={tabshow == 2 ? HomeTabStyles.MenuTextStyle : HomeTabStyles.MenuTextStyleTwo}>{t("Home_Title_18")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => settabshow('3')} style={tabshow == 3 ? HomeTabStyles.WhiteBackground : HomeTabStyles.WhiteBackgroundTwo}>
                <Text style={tabshow == 3 ? HomeTabStyles.MenuTextStyle : HomeTabStyles.MenuTextStyleTwo}>{t("Home_Title_19")}</Text>
              </TouchableOpacity>
            </View> */}
            {/* <Spacing space={SH(30)} /> */}
            {/* <View style={HomeTabStyles.PieChartView}> */}
              {/* <PieChart
                data={data}
                width={SW(320)}
                height={SH(200)}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    backgroundColor: 'red'
                  },
                  formatLabelText: (value, name) => `${name}: ${value}`, // Customize label text
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                valueAccessor={({ item }) => item.population}
              /> */}
            {/* </View> */}
            {/* <Spacing space={SH(20)} /> */}
            {/* <LineChart
              data={LineChartData}
              width={widthPercent(100)} // from react-native
              height={SH(290)}
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Text color for labels
                style: {
                  borderRadius: 16,
                  backgroundColor: 'red',
                },
                propsForLabels: {
                  fontSize: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              paddingLeft="0"
            /> */}
            <UserProfileCard
            loginData={loginData}/>
            <Spacing space={SH(10)} />
            <View style={HomeTabStyles.BackGroundShape}>
              <FlatList
                data={villageList}
                numColumns={1}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (<RecentlyDataViewVillage
                  item={item}
                  index={index}
                  type={2}
                  onPress={() =>{ 
                    // Alert.alert("index",JSON.stringify(item));
                    // if(index==0){
                    //   navigation.navigate(RouteName.FAMILY_SURVEY_TAB)
                    // }else if(index==1){
                     PubSub.publish('VillageItem',item) 
                      navigation.navigate(RouteName.VILLAGE_SURVEY_EDIT_TAB)
                    // }
                    // navigation.navigate(RouteName.VIEW_REPORT_SCREEN)
                  }}
                />)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
        <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(RouteName.VILLAGE_SURVEY_TAB)}
      >
        <VectorIcon
          icon="AntDesign"
          name="plus"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
       {isConnected && <TouchableOpacity
        style={styles.fab2}
        onPress={() => syncPendingSurveys()}
      >
        <VectorIcon
          icon="FontAwesome"
          name="refresh"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>}
       <Loader visible={loading}/>
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: SH(25),
    right: SW(20),
    width: SH(56),
    height: SH(56),
    borderRadius: SH(28),
    backgroundColor: Colors.theme_background,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,           // Android shadow
    shadowColor: '#000',    // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
   fab2: {
    position: 'absolute',
    bottom: SH(85),
    right: SW(20),
    width: SH(56),
    height: SH(56),
    borderRadius: SH(28),
    backgroundColor: Colors.theme_background,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,           // Android shadow
    shadowColor: '#000',    // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
});
export default VillageFormList;
