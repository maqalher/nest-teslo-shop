
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from '../guards/use-role/use-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected( ...roles),
    UseGuards(AuthGuard(), UseRoleGuard),
  );
}
