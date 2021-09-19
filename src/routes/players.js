const axios = require('axios').default;
const { Router } = require('express');
const router = Router();
const Player = require('../models/player');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
  let mappedPlayers = [];
  try {
    const { data: playersFromApi } = await axios.get(
      'https://api.sportsdata.io/v3/nfl/scores/json/Players?key=45a345b193aa4c129e2164317a3a4bbc',
    );
    mappedPlayers = playersFromApi.map((p) => ({
      playerId: p.PlayerID,
      team: p.Team,
      firstName: p.FirstName,
      lastName: p.LastName,
      position: p.Position,
      upcomingDraftKingsSalary: p.UpcomingDraftKingsSalary,
      updateDate: new Date(),
    }));
  } catch (e) {
    res
      .status(400)
      .send({ msg: 'something went wrong with the api', error: e.message });
  }

  try {
    await Player.bulkCreate(mappedPlayers, {
      updateOnDuplicate: ['updateDate'],
    });
    res.send({ msg: 'successfully bulk updated players' });
  } catch (e) {
    return res.status(400).send({
      msg: 'something went wrong with create bulk users',
      error: e.message,
    });
  }
});
router.get('/upcomingDraftKingsSalary/:salary', async (req, res) => {
  //Check if Number
  const salary = Number(req.params.salary);
  if (isNaN(salary)) {
    return res.status(400).send({ msg: 'salary must be a number' });
  }
  try {
    const results = await Player.findAll({
      where: { upcomingDraftKingsSalary: { [Op.gte]: salary } },
    });
    res.send(results);
  } catch (e) {
    return res
      .status(400)
      .send({
        msg: 'something went wrong with fetching salary',
        err: e.message,
      });
  }
});
module.exports = router;
