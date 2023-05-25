import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @ManyToOne(() => User, (user) => user.subordinates)
  @JoinColumn({ name: 'bossId' })
  boss: User;

  @Column({ nullable: true })
  bossId: string;

  @OneToMany(() => User, (user) => user.boss)
  subordinates: User[];
}
