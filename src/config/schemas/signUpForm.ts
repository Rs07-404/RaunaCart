import { z } from 'zod';

export const SignUpFormSchema = z.object({
    displayName: z.string().min(2, "Display name must be at least 2 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;