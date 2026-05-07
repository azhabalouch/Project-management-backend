const { z } = require('zod');

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
    isCompleted: z.boolean().default(false),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
    projectId: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
    isCompleted: z.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
    projectId: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

module.exports = { createTaskSchema, updateTaskSchema };
