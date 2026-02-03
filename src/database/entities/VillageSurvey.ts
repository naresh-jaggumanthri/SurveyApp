import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('village_survey')
export class VillageSurvey {

  @PrimaryColumn({ type: 'text' })
  localId: string;

  @Column({ type: 'text' })
  villageholdId: string;

  @Column({ type: 'text' })
  surveyJson: string; // full Formik JSON (JSON.stringify)

  @Column({ type: 'text', nullable: true })
  imagePath?: string;

  @Column({ type: 'text' })
  status: 'PENDING' | 'SYNCED' | 'FAILED';

  @Column({ type: 'datetime' })
  createdAt: string; // ISO string recommended
}



