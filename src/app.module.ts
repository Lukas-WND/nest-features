import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/config';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
