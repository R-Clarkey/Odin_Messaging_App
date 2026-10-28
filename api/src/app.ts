import express, { Express } from 'express';
import session from 'express-session';
import passport from './config/passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './db/prisma'

import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"

import { globalErrorHandler } from './middleware/errorMiddleware';

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

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use("/api/users", userRoutes)

app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  res.json(req.user)
})

app.use(globalErrorHandler)

export default app
