import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";
import { Movie } from "./movie.entity";


@Schema()
export class User {

     _id?: string;

    @Prop({ unique: true, require: true })
    email: string;
    
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: false })
    username: string;

    @Prop({ required: true, default: Date.now })
    joinedDate: Date;

    @Prop({ required: false })
    favoriteGenres: [string];

    @Prop({ required: false })
    bio: string;

    @Prop({ required: false })
    profileImg: string;

    @Prop({ minlength: 6, required: true })
    password?: string;

    @Prop({ required: false })
    favoriteMovies: [string]

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass( User );