import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma';

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          return done(null, false, { message: 'Invalid password' })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport
