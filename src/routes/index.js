const { Router } = require('express');
const playersRoutes = require('./players');
const lostPlayersRoutes = require('./lostPlayers');
const router = Router();

router.use('/players', playersRoutes);
router.use('/lost-players', lostPlayersRoutes);
module.exports = router;
