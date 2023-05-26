import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import { RolesEnum } from '../enums/roles.enum';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const entityManager = dataSource.createEntityManager();

    const users: User[] = [];

    await entityManager.save(
      entityManager.create(User, {
        email: `admin@mail.com`,
        password: 'admin',
        role: RolesEnum.Admin,
      }),
    );

    for (let i = 1; i <= 10; i++) {
      users.push(
        entityManager.create(User, {
          email: `user${i}@mail.com`,
          password: '123qwerty',
        }),
      );
    }

    await entityManager.save<User>(users);

    users[0].role = RolesEnum.Boss;
    users[1].role = RolesEnum.Boss;

    for (let i = 1; i < 10; i++) {
      users[i].bossId = i < 5 ? users[0].id : users[1].id;
    }

    await entityManager.save<User>(users);
  }
}
