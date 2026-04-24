import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('master_survey')
export class MasterSurvey {

  @PrimaryColumn({ type: 'text' })
  localId: string;

  @Column({ type: 'text' })
  masterJson: string; // full Formik JSON (JSON.stringify)

  @Column({ type: 'text' })
  status: 'PENDING' | 'SYNCED' | 'FAILED';

  @Column({ type: 'datetime' })
  createdAt: string; // ISO string recommended
}