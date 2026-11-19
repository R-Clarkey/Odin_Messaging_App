import express, { type Express } from 'express';
import session from 'express-session';
import passport from './config/passport.ts';
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './db/prisma.ts'
import cors from "cors";


import authRoutes from "./routes/authRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import conversationRoutes from "./routes/conversationRoutes.ts"

import { globalErrorHandler } from './middleware/errorMiddleware.ts';

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new PrismaSessionStore(
	prisma, 
	{
		checkPeriod: 2 * 60 * 1000
	}
)

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

const corsOrigins = process.env.CORS_ORIGINS

if (!corsOrigins) {
	throw new Error("CORS_ORIGINS must be set")
}

const allowedOrigins = corsOrigins
	.split(",")
	.map(origin => origin.trim())
	.filter(Boolean)

app.use(
	cors({
		origin: allowedOrigins,
    credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/conversations", conversationRoutes)

app.use(globalErrorHandler)

export default app
