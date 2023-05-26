import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { RolesEnum } from '../../common/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  private async verifyPassword(user: User, passwordToVerify: string): Promise<void> {
    const match = await bcrypt.compare(passwordToVerify, user.password);

    if (!match) throw new ForbiddenException('Wrong credentials!');
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = this.userRepository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }
  async login(signInUserDto: LoginUserDto, session: Record<string, any>): Promise<UserDataDto> {
    const user = await this.userRepository.findOne({
      where: { email: signInUserDto.email.toLowerCase() },
    });

    if (!user) throw new ForbiddenException('Wrong credentials!');

    await this.verifyPassword(user, signInUserDto.password);

    const userData: UserDataDto = { email: user.email, role: user.role };

    session.userData = userData;

    return userData;
  }

  async findAll(userData: UserDataDto): Promise<User[]> {
    const { email, role } = userData;

    return role === RolesEnum.Admin
      ? await this.userRepository.find()
      : await this.userRepository.find({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
