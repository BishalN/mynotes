import express, { Request, Response } from 'express';
import { validationResult, body, query, param } from 'express-validator';
import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { prismaClient } from '../../context';
import {
  sendForgotPasswordEmail,
  sendVerifyEmail,
} from '../../utils/sendEmail';

const router = express.Router();

export const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const opts: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id: jwtPayload.sub },
      });
      if (!user) done('Invalid Id', null, 'User with given id not found');
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be atleast 6 character long'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;

    const foundUser = await prismaClient.user.findUnique({ where: { email } });
    if (foundUser) {
      return res.status(400).send({
        field: 'email',
        message: 'User with that email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: { email, password: hashedPassword },
    });

    const { password: pass, ...userJson } = user;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    sendVerifyEmail(email, token)
      .then((value) => console.log(value))
      .catch((err) => console.log(err.message));

    res.send(userJson);
  }
);

//verify the email address using the token
router.get(
  '/',
  query('token').isLength({ min: 10 }).withMessage('Token must be a valid'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { token } = req.query;

    try {
      const { userId }: any = jwt.verify(
        token as string,
        process.env.JWT_SECRET
      );

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });
      if (!user) return res.status(404).send({ message: 'user not found' });

      await prismaClient.user.update({
        where: { id: userId },
        data: { localEmailVerified: true },
      });

      res.send({ localEmailVerification: true });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: 'something went wrong',
      });
    }
  }
);

//login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('password must be atleast 6 character long'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //check if the user exist and compare the password
    //if success then send back the token to login
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).send({ field: 'emal', message: 'user not found' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res
        .status(400)
        .send({ field: 'password', message: 'Invalid Password' });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    //send back the token or set the token to the browsers cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    //useful for mobile clients
    res.send({ token });
  }
);

router.get(
  '/resetpassword/:email',
  param('email').isEmail().withMessage('Email must be  valid'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email } = req.params;
    //check to see if the user exists
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .send({ field: 'email', message: 'user not found' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    await sendForgotPasswordEmail(email, token);

    res.send({ messageSent: true });
  }
);

router.post(
  '/changepassword',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be atleast 6 characeter long'),
    body('token').isLength({ min: 6 }).withMessage('Token must be valid'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { token, password } = req.body;

    try {
      const { userId }: any = jwt.verify(
        token as string,
        process.env.JWT_SECRET
      );
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).send('user not found');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      await prismaClient.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
      res.send({ passwordChange: true });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.get(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.user);
    res.send('authenticated succecssfully');
  }
);

export { router };
