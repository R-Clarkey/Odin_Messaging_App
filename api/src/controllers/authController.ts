import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, confirmPassword } = req.body

    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email or username already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    })

    res.status(201).json({
      message: 'User registered successfully',
      user,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
}

export const login = async (req: Request, res: Response) => {
  res.json({
    message: 'Logged in successfully',
    user: req.user
  })
}

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' })
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session destruction failed' })
      }
      res.clearCookie('connect.sid')
      res.json({ message: 'Logged out successfully' })
    })
  })
}

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  res.json(req.user)
}
