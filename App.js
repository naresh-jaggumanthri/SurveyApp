import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import { PermissionsAndroid } from 'react-native';
import { AppDataSource } from './src/database/database';
import InternetStatusModal from './src/components/InternetStatusModal';
import JailMonkey from 'jail-monkey';
import { Alert, BackHandler,NativeModules } from 'react-native';

const App = () => {
useEffect(()=>{
  
  AppDataSource.initialize().then(() => console.log('DB initialized')).catch(err => console.log(err));

requestLocationPermission();
checkDeviceSecurity();
checkRootNative();
},[]);
const { RootDetection } = NativeModules;
const checkRootNative = async () => {
  
  try {
    const isRooted = await RootDetection.isDeviceRooted();
   
    if (isRooted) {
      console.warn('Rooted device detected!');
      Alert.alert('Rooted Device Detected');
      BackHandler.exitApp();
      // Handle blocked state
    }else{
      // Alert.alert('Non-Rooted Device', 'This is not a rooted device.');
    }
  } catch (error) {
    console.error('Failed to run root check:', error);
    Alert.alert('Root Check Failed');
  }
};
const checkDeviceSecurity = () => {
 
  // Check if device is rooted
  const isRooted = JailMonkey.isJailBroken();

  
  // Optionally check if the app is running in an emulator or debug mode
  const isRealDevice = !JailMonkey.isOnExternalStorage();
 
  if (!isRealDevice) {
    Alert.alert(
      'Security Alert',
      'This app cannot run on an emulator or debug mode for security reasons.',
      [
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return false;
  } 
  // Alert.alert('isRealDevice', isRealDevice.toString());

  if (isRooted) {
    Alert.alert(
      'Security Alert',
      'This app cannot run on a rooted device for security reasons.',
      [
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return false;
  }

  return true;
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
    <Provider store={store}>
      <InternetStatusModal/>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};
export default App;