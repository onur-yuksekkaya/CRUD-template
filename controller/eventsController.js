import db from '../config/db';
import { getEventbyId, getPatchableProps } from './utils';
export const allEvents = async (req, res) => {
  const { page } = req.body;
  const rowCount = 6;
  const eventCount = await db.events.count();
  const allEvents = await db.events.findAll({
    limit: rowCount || 2,
    offset: page * rowCount - rowCount || 0,
  });

  res.send({
    result: 'OK',
    eventList: allEvents,
    pageList: Math.ceil(eventCount / rowCount),
    eventsCount: eventCount,
    hasNextPage: page * rowCount < eventCount,
  });
};

export const createEvent = async (req, res) => {
  console.log('req.body', req.body);
  const { name, winner, image } = req.body;

  await db.events.create({
    name,
    winner,
    image,
    points: 0,
  });
  res.send({ result: 'OK' });
};

export const deleteEvent = async (req, res) => {
  const result = await db.events.destroy({
    where: {
      id: req.body.id,
    },
  });

  if (result === 1)
    res.send({ result: 'OK', message: 'general_events_deleted_text' });
  if (result === 0)
    res.send({
      result: 'OK',
      message: 'general_events_already_deleted_text',
    });
};

export const updateEventPoint = async (req, res) => {
  console.log('req.body', req.body);
  const { id, type } = req.body;
  const tournament = await getEventbyId(id);
  console.log('tournament', tournament.points);
  switch (type) {
    case 'increase':
      tournament.points += 1;
      break;
    case 'decrease':
      tournament.points -= 1;
      break;
    default:
      break;
  }

  console.log('tournament2', tournament.points);

  await db.events.update(getPatchableProps(tournament), {
    where: { id: tournament.id },
  });
  res.send({ result: 'OK' });
};
