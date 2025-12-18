import NetInfo from '@react-native-community/netinfo';
// import { useState } from 'react';
import {Linking, Platform, Share} from 'react-native';
// import { PayUBiz } from "../nativeModule/NativeModule";
import { AppOkAlert } from "./AlertHelper";
//const [status,setStatus]=useState(undefined);
let status=false;

const DeviceHelper = {
  isConnectedToInternet: async function () {
    try {
      //PubSub.subscribe("ONLINE_INITIATED", getInternetStatus);
      let state = await NetInfo.fetch();
      console.log('state.isConnected :- ', state.isConnected);
      //status=state.isConnected;
      return state.isConnected;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export  let INTERNET_STATUS=status;

export const makeCall = (number) => {
  let numberURL;
  if(Platform.OS != 'android'){
      numberURL = `telprompt:${number}`;
  }else {
      numberURL = `tel:${number}`;
  }
  Linking.openURL(numberURL)
      .then(supported => {
          if(!supported){
              AppOkAlert("Phone number is not available",
                   () => {}, "OK", "Invalid Number")
          }else {
              return Linking.openURL(numberURL);
          }
      }).catch(err => console.log(err))
 
}

export const ShareToOtherApp = async (title, message) => {
  try {
    const result = await Share.share({
      message: message,
      title: title,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // AppOkAlert("Please try again after sometime.", () => {});
  }
};

export const OpenLinkToOtherApp = link => {
 
  Linking.openURL(link).then(supported => {
    if (supported) {
      Linking.openURL(link);
    } else {
      console.log("Don't know how to open URI: " + this.props.url);
    }
  });
};

// export const secureOpenURL = (url) => {
//   const allowedSchemes = ['https', 'tel', 'mailto']; // Define allowed URL schemes
//   try {
//     const parsedUrl = new URL(url);
//     if (allowedSchemes.includes(parsedUrl.protocol.replace(':', ''))) {
//       Linking.openURL(url);
//     } else {
//       console.warn('Blocked untrusted URL:', url);
//     }
//   } catch (error) {
//     console.error('Invalid URL:', url);
//   }
// };

export default DeviceHelper;
