import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";


@Schema()
export class Movie {

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
    favoriteMovies: [Movie]

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    roles: string[];
}

export const MovieSchema = SchemaFactory.createForClass( Movie );