import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Comment } from "./Comment";
import { Like } from "./Like";

@Entity("toilet")
export class Toilet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  toiletName: string;

  @Column()
  roadName: string;

  @Column({ nullable: true })
  lotName: string;

  @Column()
  isUnisex: boolean;

  @Column({ default: 0 })
  maleClosetCount: number;

  @Column({ default: 0 })
  urinalCount: number;

  @Column({ default: 0 })
  handiMaleClosetCount: number;

  @Column({ default: 0 })
  handiUrinalCount: number;

  @Column({ default: 0 })
  boyClosetCount: number;

  @Column({ default: 0 })
  boyUrinalCount: number;

  @Column({ default: 0 })
  femaleClosetCount: number;

  @Column({ default: 0 })
  handiFemaleClosetCount: number;

  @Column({ default: 0 })
  girlClosetCount: number;

  @Column({ nullable: true })
  agency: string;

  @Column({ nullable: true })
  agencyNumber: string;

  @Column({ nullable: true })
  openTime: string;

  @Column({ nullable: true })
  builtTime: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ nullable: true })
  ownType: string;

  @Column({ nullable: true })
  locationType: string;

  @Column({ nullable: true })
  processType: string;

  @Column({ nullable: true })
  hasAlarm: boolean;

  @Column({ nullable: true })
  hasCctv: boolean;

  @Column({ nullable: true })
  hasDiaperTable: boolean;

  @Column({ nullable: true })
  lastUpdate: String;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.toiletId)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.toiletId)
  likes: Like[];
}
