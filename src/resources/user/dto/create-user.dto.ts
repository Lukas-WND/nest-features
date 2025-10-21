import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;