import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './DTO/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  find(userName): Promise<User> {
    return this.userService.getUser(userName);
  }

  @Post()
  create(@Body() userDto: CreateUserDto): void {
    this.userService.create(userDto);
  }
}
