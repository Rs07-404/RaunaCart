import { z } from 'zod';

export const LoginFormSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;