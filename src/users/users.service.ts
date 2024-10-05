import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './DTOs/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ){}

    findAll(){
        return this.userModel.find()
    }

    create(createUserDto: CreateUserDto){
        return this.userModel.create(createUserDto)
    }

    getById(id){
        return this.userModel.findById(id)    
    }

    findOne(query){
        console.log(query, "quert")
        return this.userModel.findOne(query)
    }

    findByEmail(query){
        return this.userModel.findOne(query).select('+password')
    }
}
