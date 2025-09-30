import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: Role } }>();
    const user = request.user;

    // Permite o acesso se o usuário existir e tiver a role de ADMIN
    return !!user && user.role === Role.ADMIN;
  }
}
