const { z } = require("zod");

const contactSchemaValidation = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  message: z
    .string({ required_error: "Message is required" })
    .min(5, { message: "Message must be at least 5 characters" }),
});

module.exports = { contactSchemaValidation };
