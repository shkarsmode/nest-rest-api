import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Redirect,
	HttpCode,
	HttpStatus,
	Header
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { ProductsService } from './services/products/products.service';


// * Nest parse Promise automatically by itself *

@Controller('products')
export class ProductsController {

	constructor(
		private productsService: ProductsService
	) {}

	@Get()
	// @Redirect('https://google.com', 301)				// code 301 -> redirect to google
	getAll(): Promise<Product[]>{
		return this.productsService.getAllProducts();
	}

	@Get(':id')											// ':id' -> dynamic parameter
	getOne(@Param('id') id: string): Promise<Product> {			// @Param() params -> Object {}. @Param('id) -> return id
		return this.productsService.getProductById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)						// You can specify custom status code HttpStatus -> Enum
	@Header('Cache-Control', 'none')					// Add header for request
	create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productsService.createProduct(createProductDto);
		
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Product>{
		return this.productsService.remove(id);
	}

	@Put(':id')
	update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
		return this.productsService.update(id, updateProductDto);
	}
}
