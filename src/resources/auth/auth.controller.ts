import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PublicRoute } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('sign-out')
  @UseGuards(LocalAuthGuard)
  async signOut(@Request() req) {
    return req.logout();
  }
}
