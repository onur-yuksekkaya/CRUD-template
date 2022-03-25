import db from '../config/db';
export const getPatchableProps = (reqObject) => {
  const result = {};

  for (let prop in reqObject) {
    if (reqObject[prop]) result[prop] = reqObject[prop];
  }

  return result;
};

export const getEventbyId = async (id) => {
  const nominess = await db.events.findOne({
    where: {
      id: id,
    },
  });
  return nominess.dataValues;
};
