import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../../common/middlewares/guards/roles.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDataDto } from './dto/user-data.dto';
import { AuthGuard } from '../../common/middlewares/guards/auth.guard';
import { UserSessionType } from '../../common/types/common.types';
import { User } from './entities/user.entity';
import { RolesDecorator } from '../../common/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() signInUserDto: LoginUserDto, @Session() session: Record<string, any>): Promise<UserDataDto> {
    console.log('login');
    return this.userService.login(signInUserDto, session);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Session() { userData }: UserSessionType): Promise<User[] | User> {
    return this.userService.findAll(userData);
  }

  @RolesDecorator(RolesEnum.Admin, RolesEnum.Boss)
  @UseGuards(AuthGuard)
  @Patch()
  update(@Session() { userData }: UserSessionType, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userData, updateUserDto);
  }
}
