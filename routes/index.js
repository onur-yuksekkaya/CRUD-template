import { Router } from 'express';
import {
  allEvents,
  createEvent,
  deleteEvent,
  updateEventPoint,
} from '../controller/eventsController';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hey There Ozi');
});

routes.get('/list', allEvents);

routes.post('/create', createEvent);

routes.post('/delete', deleteEvent);

routes.post('/update', updateEventPoint);

export default routes;
