import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
