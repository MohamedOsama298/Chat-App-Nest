import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './DTO/signIn.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUser(signInDto.userName);

    if (!(await compare(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, userName: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
