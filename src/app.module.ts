import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Connection} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { GeoModule } from './geo/geo.module';


@Module({
imports:[ TypeOrmModule.forRoot(), AuthModule, GeoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection:Connection){}
}
