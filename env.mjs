//file:env.mjs
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),
    
    // Authentication
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    
    // OAuth Providers
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    
    // Email (for notifications and password reset)
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().positive(),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    EMAIL_FROM: z.string().email(),
    
    // Encryption
    ENCRYPTION_KEY: z.string().min(32),
    VAULT_MASTER_KEY: z.string().min(32),
    
    // Node Environment
    NODE_ENV: z.enum(["development", "production", "test"]),
    
    // Rate Limiting
    RATE_LIMIT_MAX: z.coerce.number().positive().default(100),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(60000),
  },

  client: {
    // Public Variables (available in browser)
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string().default("Vaultify"),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
    NEXT_PUBLIC_MAX_VAULT_ITEMS: z.coerce.number().positive().default(1000),
  },

  // For Node.js runtime
  runtimeEnv: {
    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    
    // Authentication
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    
    // OAuth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    
    // Email
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    
    // Encryption
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    VAULT_MASTER_KEY: process.env.VAULT_MASTER_KEY,
    
    // Node Environment
    NODE_ENV: process.env.NODE_ENV,
    
    // Rate Limiting
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    
    // Public Variables
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_MAX_VAULT_ITEMS: process.env.NEXT_PUBLIC_MAX_VAULT_ITEMS,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})