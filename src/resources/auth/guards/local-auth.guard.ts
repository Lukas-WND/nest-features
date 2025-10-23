import {
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInSchema } from '../dto/sign-in.dto';
import { ZodError } from 'zod';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const parsed = SignInSchema.parse(request.body);
      request.body = parsed;
      return request;
    } catch (error) {
      if (error instanceof ZodError) {
        // Formatar mensagens de erro do Zod
        const messages = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          messages: issue.message,
        }));

        const formatted = messages
          .map((msg) => `${msg.path}: ${msg.messages}`)
          .join(' | ');

        throw new BadRequestException('Invalid Payload', {
          description: formatted,
        });
      }
      // Para outros erros não relacionados ao Zod, manter genérico
      throw new BadRequestException('Bad Request', {
        description: error.message,
      });
    }
  }
}
