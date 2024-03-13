import {IsEmail,IsString} from '@nestjs/class-validator';

export class OpenAccountCommand {
    @IsEmail({},{message: "incorrect email address"})
    public email: string;

    @IsString({message: 'Должно быть строкой'})
    public name: string;
  }  