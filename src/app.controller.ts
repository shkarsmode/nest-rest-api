import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) {}

    @Get()
    getHello() {
        return this.appService.getHello();
    }

    @Post()
    setData(@Body() car) {
        return this.appService.setData(car);
    }

}
