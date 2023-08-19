import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string({ required_error: 'email is a required field' })
    .email({ message: 'invalid email address' }),

  username: z.string({
    required_error: 'username is a required field',
    invalid_type_error: 'username must be a string',
  }),

  password: z.string({
    required_error: 'password is a required field',
    invalid_type_error: 'password must be a string',
  }),
});

export interface User extends z.infer<typeof userSchema> {
  id: number,
}
