import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async use(req, res: Response, next: NextFunction) {
    console.log('Request...', req.headers);
    const authHeader: string = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token: string = authHeader.split(' ')[1];
    try {
      const userName = this.jwtService.verify(token).userName;
      const user = await this.userService.getUser(userName);
      req.user = user;
    } catch (err) {
      res.status(401).send({ message: 'Invalid Token' });
    }
    next();
  }
}
