import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type ICreate = z.infer<typeof createSchema>;
