import {z} from "zod";
import * as process from "node:process";

const envSchema = z.object({
    BACKEND_IP: z.string().min(1)
})

export const env= envSchema.parse(process.env)