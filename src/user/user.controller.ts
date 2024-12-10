import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './DTO/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  find(userName: string): Promise<User> {
    return this.userService.getUser(userName);
  }

  @Post()
  create(@Body() userDto: CreateUserDto): void {
    this.userService.create(userDto);
  }

  @Get('/searchUsers')
  searchUsers(
    @Query() query: { searchQuery: string },
    @Req() req,
  ): Promise<User[]> {
    const { searchQuery } = query;
    console.log(searchQuery, 'here');
    return this.userService.searchUsers(searchQuery, req.user.userName);
  }

  @Post('/addFriend')
  addFriend(@Body() body, @Req() req) {
    console.log(body.friend, req.user.userName);
    return this.userService.addFriend(body.friend, req.user.userName);
  }
}
