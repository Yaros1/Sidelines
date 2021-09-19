const axios = require('axios').default;
const { Router } = require('express');
const router = Router();
const Player = require('../models/player');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  let playerIds;
  try {
    const result = await axios.get(
      'https://api.sportsdata.io/v3/nfl/scores/json/Players?key=45a345b193aa4c129e2164317a3a4bbc',
    );

    playerIds = result.data.map((item) => item.PlayerID);
  } catch (e) {
    return res.status(400).send({
      msg: 'something went wrong accessing players api',
      error: e.message,
    });
  }
  try {
    const lostPlayers = await Player.findAll({
      where: {
        playerId: {
          [Op.notIn]: playerIds,
        },
      },
    });
    return res.send(lostPlayers);
  } catch (e) {
    return res.status(400).send({
      msg: 'something went wrong getting players from database',
      error: e.message,
    });
  }
  //Get All Players from EndPoint
  //Send A Request to Database to bring all players PlayerId Not In
});
module.exports = router;
