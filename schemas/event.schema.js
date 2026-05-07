const { z } = require('zod');

const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    location: z.string().optional(),
    attendees: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    location: z.string().optional(),
    attendees: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

module.exports = { createEventSchema, updateEventSchema };
