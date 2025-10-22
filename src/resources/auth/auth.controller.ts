import { Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-out')
  async signOut(@Request() req) {
    return req.logout();
  }
}
