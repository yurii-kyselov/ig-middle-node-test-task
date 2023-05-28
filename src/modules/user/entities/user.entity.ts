import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { RolesEnum } from '../../../common/enums/roles.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  bossId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: RolesEnum })
  role: RolesEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.subordinates)
  @JoinColumn({ name: 'bossId' })
  boss: User;

  @OneToMany(() => User, (user) => user.boss)
  subordinates: User[];

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
    this.role = this.role || RolesEnum.User;
  }
}
