import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/DTOs/create-user.dto';
import { SignInDto } from './Dtos/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('sign-up')
  signUp(@Body() craeteUserDto: CreateUserDto){
    return this.authService.signUp(craeteUserDto)
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto)
  }

  @Get('users')
  getAllUsers(){
    return this.authService.getAllUser()
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req){
    return this.authService.getCurrentUser(req)
  }

  @Get('Create')
  @UseGuards(AuthGuard)
  create(@User() id){
    console.log(id, "userId")
    return ''
  }

}
