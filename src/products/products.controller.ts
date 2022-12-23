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

@Controller('products')
export class ProductsController {

	@Get()
	// @Redirect('https://google.com', 301)				// code 301 -> redirect to google
	getAll(): string {
		return 'getAll';
	}

	@Get(':id')											// ':id' -> dynamic parameter
	getOne(@Param('id') id: string): string {			// @Param() params -> Object {}. @Param('id) -> return id
		return 'getOne ' + id
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)						// You can specify custom status code HttpStatus -> Enum
	@Header('Cache-Control', 'none')					// Add header for request
	create(@Body() createProductDto: CreateProductDto) {
		return `Title: ${createProductDto.title} Price: ${createProductDto.price} !!`
	}

	@Delete(':id')
	remove(@Param('id') id: string){
		return `Remove ` + id;
	}

	@Put(':id')
	update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
		return `Updated ${id}`;
	}
}
