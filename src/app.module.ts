import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

const environment = process.env.NODE_ENV || 'development';


@Module({
    imports: [
        ProductsModule,

        ConfigModule.forRoot({
            envFilePath: `.env.${environment}`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNTECTION_STRING, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
