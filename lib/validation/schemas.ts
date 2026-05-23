import { z } from 'zod';
export const rightsConfirmation = z.object({ rightsConfirmed: z.literal(true) });
export const submissionSchema = z.object({ email: z.string().email(), type: z.string(), notes: z.string().min(10), rightsConfirmed: z.literal(true) });
