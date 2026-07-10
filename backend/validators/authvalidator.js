const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    orgName: z.string().min(2),
    role: z.string().optional()
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

module.exports={
registerSchema,
loginSchema
};