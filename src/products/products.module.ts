import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsService } from './services/products/products.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductSchema}
        ])
    ]
})
export class ProductsModule {}
