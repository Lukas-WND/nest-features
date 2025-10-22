import z from "zod";

export const SignInSchema = z.object({
    username: z.string().min(1, { error: 'Username is required!' }),
    password: z.string().min(1, { error: 'Password is required!' })
})

export type SignInDTO = z.infer<typeof SignInSchema>;