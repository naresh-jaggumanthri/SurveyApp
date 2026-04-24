import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { HouseholdSurvey } from './entities/HouseholdSurvey';
import { VillageSurvey } from './entities/VillageSurvey';
import { MasterSurvey } from './entities/MasterSurvey';

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'survey.db',
  location: 'default',
  synchronize: true,   // auto create tables (dev)
  logging: false,
  entities: [HouseholdSurvey,VillageSurvey,MasterSurvey],
});