import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from './signup/signup.controller';
import { LoginController } from './login/login.controller';


@Module({

  controllers: [AppController, SignupController, LoginController],
  providers: [AppService],
})
export class AppModule {}
