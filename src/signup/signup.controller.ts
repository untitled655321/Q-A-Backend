import {Controller, Get} from '@nestjs/common';

@Controller('signup')
export class SignupController {
    @Get()
    findAll(): string{
        return "signup response!";
    }

}
