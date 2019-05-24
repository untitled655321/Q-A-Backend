import { Module } from '@nestjs/common';
import { CityService } from './city/city.service';
import { CityController } from './city/city.controller';

@Module({
  providers: [CityService],
  controllers: [CityController]
})
export class GeoModule {}
