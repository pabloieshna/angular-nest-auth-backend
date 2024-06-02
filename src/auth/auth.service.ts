import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; 

import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterUserDto } from './dto/index';
import { User } from './entities/user.entity';
import { JtwPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response'


@Injectable()
export class AuthService {

  
  constructor( 
    @InjectModel( User.name ) 
    private userModel: Model<User>,
    private jtwService: JwtService,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
 
    try {
  
      const { password, ...userData} = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync( password, 10),
        ...userData
      });
      
      await newUser.save();
      const { password:_, ...user } = newUser.toJSON();
   
      return user;



    } catch (error) {
      if( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } ya existe`)
      }

      throw new InternalServerErrorException('Ha habido algun error interno')
    }

  }

  async register(registerDto: RegisterUserDto): Promise<LoginResponse> {

    const user = await this.create( registerDto);

    return{
      user: user,
      token: this.getJWT({ id: user._id })
    }
  }

  async login( loginDto: LoginDto ): Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if( !user ){
      throw new UnauthorizedException('No se encontró ningún usuario con ese correo')
    }

    if (!bcryptjs.compareSync( password, user.password ) ) {
      throw new UnauthorizedException('La contraseña no es valida')
    }

    const { password:_, ...rest } = user.toJSON();


    return{
      user: rest,
      token: this.getJWT({ id: user.id}),
    }


  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById ( id: string ) {
    const user = await this.userModel.findById( id );
    const { password, ...rest } = user.toJSON();
    return rest;  
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.userModel.findByIdAndUpdate( id, updateAuthDto )
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWT(payload: JtwPayload){
    const token = this.jtwService.sign(payload);
    return token;
  }

  
}
