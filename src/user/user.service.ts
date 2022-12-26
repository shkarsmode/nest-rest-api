import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';



@Injectable()
export class UserService {
	constructor(
		@InjectModel('User') private readonly userModel: Model<IUser>
	) {}

	async getAllUsers(): Promise<IUser[]> {
		return await this.userModel.find().exec();
		// * without .exec() it returns "thenable"
	}

	async createUser(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(createUserDto.password, salt);

		const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }));
		return await createdUser.save();
		// * .save() return promise
	}

	async findUser(id: string): Promise<IUser> {
		return await this.userModel.findById(id).exec();
		// * We recommend using .exec() because that gives you better stack traces.
	}

	async updateUser(id: string, user: IUser): Promise<IUser> {
		return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
		// * { new: true } returns updated object
	}

	async getSuggestedUsersName(name: string): Promise<string[]> {
		const users: IUser[] = await this.userModel.find({firstName: {$regex: `^${name}`, $options:'i'} }).exec();
		return users.map(user => user.firstName);
	}


}
