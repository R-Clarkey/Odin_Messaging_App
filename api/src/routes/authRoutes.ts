import { Router, Request, Response } from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router()

router.post('/register', authController.register);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login-failed',
  }),
  authController.login
)

router.get('/login-failed', (req: Request, res: Response) => {
  res.status(401).json({ error: 'Login failed' });
});

router.get('/logout', authController.logout);

router.get('/me', requireAuth, authController.getCurrentUser);

export default router;
