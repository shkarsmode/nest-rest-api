import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';


@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument> 
    ) {}

    async getAllProducts(): Promise<Product[]> {        
        return this.productModel.find().exec();
        // * find() find all the documents and return Query
        // * exec() execute and return promise with searched elements
    }

    async getProductById(id: string): Promise<Product> {
        return this.productModel.findById(id); 
    }

    async createProduct(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto);
        return newProduct.save();

        // * save() save new element to DataBase
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id);
    }

    async update(id: string, productDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true });      
        // * options: {new: true} if element wasn't found, It'll create new!
    }

}
