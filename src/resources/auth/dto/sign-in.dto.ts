import z from 'zod';

export const SignInSchema = z.object({
  username: z
    .string({error: 'Username must be a string!' })
    .min(1, { error: 'Username is required!' })
    .max(50, { error: 'Username must be at most 50 characters long!' }),
  password: z
    .string({ error: 'Password must be a string!' })
    .min(1, { error: 'Password is required!' })
    .max(50, { error: 'Password must be at most 50 characters long!' }),
});

export type SignInDTO = z.infer<typeof SignInSchema>;
