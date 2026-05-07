const { z } = require('zod');

const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).optional()
  }).strict()
});

module.exports = { createProjectSchema, updateProjectSchema };
