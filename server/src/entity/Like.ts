import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Toilet } from "./Toilet";
import { User } from "./User";

@Entity("like")
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toiletId: number;

  @Column()
  userId: number;

  @Column()
  check: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Toilet, (toilet) => toilet.id)
  toilet: Toilet;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
