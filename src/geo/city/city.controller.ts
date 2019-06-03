import {Body, Controller, Post} from '@nestjs/common';
import {CityService} from "./city.service";
import {User} from "../../auth/user.entity";
import {Coor} from "../coor.entity";

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService){

    }
    @Post('country')
    async getCity(@Body() coordinates: Coor): Promise<any> {
        console.log(coordinates);
        return this.cityService.getCity(coordinates);
    }

}
