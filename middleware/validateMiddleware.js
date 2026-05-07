const AppError = require('../utils/AppError');

// Validation middleware that checks request against schema
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (error) {
    // Zod throws ZodError with .errors property
    if (error.errors && Array.isArray(error.errors)) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return res.status(400).json({
        status: 'fail',
        errors
      });
    }
    // If not a Zod validation error, pass to global error handler
    next(new AppError(error.message || 'Validation failed', 400));
  }
};

module.exports = validate;
