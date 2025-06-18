// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check for Zod validation errors
  if (err.name === "ZodError") {
    const errorMessages = err.errors.map((e) => e.message);
    return res.status(422).json({ errors: errorMessages });
  }

  // Check for validation errors from other sources (e.g., mongoose)
  if (err.name === "ValidationError") {
    return res.status(400).json({ errors: [err.message] });
  }

  // Handle other errors
  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred",
  });
};

module.exports = errorHandler;
