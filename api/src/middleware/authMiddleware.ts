import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  next()
}

export const requireNotAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({ error: 'Already authenticated' })
  }
  next()
}
