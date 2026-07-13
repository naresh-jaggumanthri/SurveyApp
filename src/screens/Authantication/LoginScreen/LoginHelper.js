import {Alert} from 'react-native';
import * as Yup from 'yup';
import {decode as atob} from 'base-64';
import api from '../../../api';
import {AppDataSource} from '../../../database/database';
import {MasterSurvey} from '../../../database/entities/MasterSurvey';
import PubSub from 'pubsub-js';
export const LoginFormInitialValues = (username, password) => {
  return {
    username: username || '',
    password: password || '',
  };
};

export const LoginValidationSchema = (username, password) => {
  return Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(7, 'Too Long!')
      .required('Password is Required'),
  });
};

export async function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Now atob will work!
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Decoding failed:', error);
    return null;
  }
}

export const saveMasters = async token => {
  const masters = [
    {key: 'relationship', value: t => api?.master?.getRelationship(t)},
    {key: 'gender', value: t => api?.master?.getGender(t)},
    {key: 'education', value: t => api?.master?.getEducation(t)},
    {key: 'socialCategory', value: t => api?.master?.getSocialCategory(t)},
    {
      key: 'drinkingWaterSource',
      value: t => api?.master?.getDrinkingWaterSource(t),
    },
    {
      key: 'respondentIdentity',
      value: t => api?.master?.getRespondentIdentity(t),
    },
    {key: 'migrationSector', value: t => api?.master?.getMigrationSector(t)},
    {key: 'migrationPeriod', value: t => api?.master?.getMigrationPeriod(t)},
    {key: 'irrigationSource', value: t => api?.master?.getIrrigationSource(t)},
    {
      key: 'primaryOccupation',
      value: t => api?.master?.getPrimaryOccupation(t),
    },
    {key: 'landHolding', value: t => api?.master?.getLandHolding(t)},
    {
      key: 'livestockActivity',
      value: t => api?.master?.getLivestockActivity(t),
    },
    {key: 'kishanScheme', value: t => api?.master?.getKishanScheme(t)},
  ];

  console.log('🚀 Starting Parallel Sync...');

  const results = await Promise.allSettled(
    masters.map(async (m, index) => {
      // EXECUTE the function directly. No JSON.parse needed.
      const response = await m.value(token);

      // Extract the actual data (usually response.data in Axios)
      const data = response?.data || response;

      if (!data) throw new Error(`No data for ${m.key}`);

      // Save to local DB
      await saveLocally(m.key, data, index);

      return m.key;
    }),
  );

  // Filter results to see what worked and what failed
  const succeeded = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected');

  console.log('✅ Sync Finished. Succeeded:', succeeded.length);
  if (failed.length > 0) console.error('❌ Failed:', failed.length);
};

const saveLocally = async (key, data, index) => {
  const repo = AppDataSource.getRepository(MasterSurvey);

  // Check if it already exists to avoid duplicates
  let master = await repo.findOneBy({localId: index + 1});

  if (master) {
    master.masterJson = JSON.stringify(data);
    master.status = 'SYNCED';
  } else {
    master = repo.create({
      localId: index + 1,
      masterJson: JSON.stringify(data),
      status: 'SYNCED',
      createdAt: new Date().toISOString(),
    });
  }

  await repo.save(master);
  console.log(`💾 Stored/Updated ${key}`);
};

import NetInfo from '@react-native-community/netinfo';

export const getMasterLocationData = async (type, parentId, apiCall) => {
  const state = await NetInfo.fetch();
  const repo = AppDataSource.getRepository(MasterSurvey);

  // Create a unique key like "village_panchayat_102"
  const storageKey = `${type}_${parentId || 'root'}`;

  // 1. ONLINE PATH
  if (state.isConnected && state.isInternetReachable) {
    try {
      const res = await apiCall();
//  Alert.alert('Success11',JSON.stringify(res));
      // Upsert into Local DB (Update if exists, else Create)
      let master = await repo.findOneBy({localId:storageKey});
      //master=undefined;
      
      if (master==undefined) {
        master = repo.create({
          localId: storageKey,
          masterJson: JSON.stringify(res),
          status: 'SYNCED',
          createdAt: new Date().toISOString(),
        });
       
      } else {
        master.masterJson = JSON.stringify(res);
        master.status = 'SYNCED';
      }
       await repo.save(master);
     
      // Optional success alert

      return res;
    } catch (error) {
      console.warn(
        `API failed for ${storageKey}, checking local fallback...`,
        error,
      );
    }
  }

  // 2. OFFLINE PATH
  const localData = await repo.findOneBy({localId: storageKey});
  if (localData) {
    console.log(`📂 Loaded ${storageKey} from local storage`);
    return JSON.parse(localData.masterJson);
  }

  // 3. NO DATA PATH
  console.warn(`No local data found for ${storageKey}`);
  return [];
};


export const getVillageMembersCount = async (finalValues) => {
    
    // Implementation for getting village members count
    // api//Member/filter?districtName=BOLANGIR&blockName=KHAPRAKHOL&panchayatName=BHANPUR&villageName=BRAMHANI
    const params = {
      districtName: finalValues?.district,
      blockName: finalValues?.block,
      panchayatName: finalValues?.gp,
      villageName: finalValues?.village[0],
    };
   
    const token = finalValues?.token; // Assuming you have the token available

    
    try {
     
      const response = await api.user.getVillageMembersCount(params,token);
      // Alert.alert('Village Members Count', JSON.stringify(response), [{text: 'OK'}]);
      PubSub.publish('VILLAGE_MEMBERS_COUNT', response || []);
    } catch (error) {
      console.error('Error fetching village members count:', error);
    } 

  };
