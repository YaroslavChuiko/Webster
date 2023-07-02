import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string({ required_error: 'Name is required' }).max(15, 'Must be 15 characters or less'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string({ required_error: 'Password is required' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'], // path of error
  });

export type ICreate = z.infer<typeof registerSchema>;
