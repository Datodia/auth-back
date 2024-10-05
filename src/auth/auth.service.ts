import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/DTOs/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './Dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    getAllUser(){
        return this.usersService.findAll()
    }

    async signUp(createUserDto: CreateUserDto){
        const { email, name, password} = createUserDto
        const user = await this.usersService.findOne({email})
        if(user) throw new BadRequestException('User already exists')
        const hashedPass = await bcrypt.hash(password, 10)
        await this.usersService.create({email, name, password: hashedPass})
        return {success: true, message: 'User Registerd succesfully'}
    }


    async signIn(singInDto: SignInDto){
        const {email, password, rememberMe} = singInDto
        const user = await this.usersService.findByEmail({email})
        if(!user) throw new BadRequestException('Invalid Credentials')
        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual) throw new BadRequestException('Invalid Credentials')
        const payload = {
            sub: user._id
        }
        const expire = rememberMe ? '7d' : '1h'

        return {
            accessToken: await this.jwtService.signAsync(payload, {expiresIn: expire})
        }
    }


    getCurrentUser(req){
        console.log(req.userId, "userId")
        return this.usersService.getById(req.userId)
    }
}
