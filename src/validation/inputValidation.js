// src/validation/inputValidation.js
const { z } = require('zod');

const validationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 character long" })
    .max(20, { message: "Password can not be more than 20 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

module.exports = validationSchema;
