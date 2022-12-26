import { Controller, Get, Post, Param } from '@nestjs/common';
import { Body, Put } from '@nestjs/common/decorators';

import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Get()
	getAllUsers(): Promise<IUser[]> {
		return this.userService.getAllUsers();
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
		return this.userService.createUser(createUserDto, createUserDto.roles);
	}

	@Get(':id')
	getUserById(@Param('id') id: string): Promise<IUser> {
		return this.userService.findUser(id);
	}

	@Put(':id')
	updateUserById(@Param('id') id: string, @Body() user: IUser): Promise<IUser> {
		return this.userService.updateUser(id, user);
	}

	@Get('suggested/:name')
	getSuggestedNames(@Param('name') name: string): Promise<string[]> {
		return this.userService.getSuggestedUsersName(name);
	}
}
