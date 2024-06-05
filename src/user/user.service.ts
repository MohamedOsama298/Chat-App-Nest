import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly user: User = { Name: 'Mohamed', Age: 30 };

  getUser(): User {
    return this.user;
  }
}
