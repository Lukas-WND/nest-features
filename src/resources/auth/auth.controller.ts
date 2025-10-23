import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('sign-out')
  @UseGuards(LocalAuthGuard)
  async signOut(@Request() req) {
    return req.logout();
  }
}
