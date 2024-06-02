import { IsEmail, IsOptional, IsString} from 'class-validator';

export class UpdateAuthDto{

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    username?: string;
    
    
    @IsOptional()
    @IsString({ each: true })
    favoriteGenres?: [string];

    @IsOptional()
    @IsString({ each: true })
    favoriteMovies?: [string];
    
    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    profileImg?: string;

    @IsOptional()
    __v?: string;

}
