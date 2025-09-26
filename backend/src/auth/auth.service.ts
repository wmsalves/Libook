import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerUserDto: RegisterUserDto) {
    // 1. Verificar se o email já está em uso
    const existingUser = await this.usersService.findByEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Este email já está em uso.');
    }

    // 2. Fazer o hash da senha antes de salvar
    const hashedPassword = await argon2.hash(registerUserDto.password);

    // 3. Criar o usuário no banco de dados
    const user = await this.usersService.create({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashedPassword,
    });

    // 4. Remover a senha do objeto de retorno por segurança
    const { password, ...result } = user;
    return result;
  }
}
