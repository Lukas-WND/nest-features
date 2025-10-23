import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { instanceToPlain } from 'class-transformer';
import { compare } from 'src/utils/crypto/compare';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findOneRaw(username);
      const confirm: boolean = user
        ? await compare(password, user.password)
        : false;

      if (!confirm) {
        throw new UnauthorizedException('Invalid Credentials!');
      }

      return instanceToPlain(user);
    } catch (e) {
      throw new UnauthorizedException('Access Denied!');
    }
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
