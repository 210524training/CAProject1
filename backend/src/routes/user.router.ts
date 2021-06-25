import express, { Router } from 'express';
import userService from '../services/user.service';
import User from '../models/user';

const userRouter = Router();

userRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(
    await userService.getByUsername(username),
  );
});

userRouter.post('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.register(req.body),
  );
});

userRouter.put('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.updateUser(req.body),
  );
});


export default userRouter;
