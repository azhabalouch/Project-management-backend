const { z } = require('zod');

const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    isCompleted: z.boolean().default(false),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

module.exports = { createTodoSchema, updateTodoSchema };
