import express, { Router } from 'express';
import Application from '../models/application';
import applicationService from '../services/application.service';

const applicationRouter = Router();

applicationRouter.get('/', async (req, res) => {
  res.json(
    await applicationService.getAll(),
  );
});

applicationRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await applicationService.getById(id),
  );
});

applicationRouter.post('/', async (req: express.Request<unknown, unknown, Application, unknown, {}>, res) => {
  res.json(
    await applicationService.add(req.body),
  );
});

applicationRouter.put('/', async (req: express.Request<unknown, unknown, Application, unknown, {}>, res) => {
  res.json(
    await applicationService.update(req.body),
  );
});

applicationRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await applicationService.delete(id),
  );
});

applicationRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(
    await applicationService.getByUsername(username),
  )
})

export default applicationRouter;
