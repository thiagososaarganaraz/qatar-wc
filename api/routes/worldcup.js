'use strict'

const express = require('express');
const router = express.Router();
const wcController = require('../controllers/worldcup');

router.get('/teams', wcController.getTeams);
router.get('/matches', wcController.getMatches);
router.get('/standings', wcController.getStandings);

module.exports = router;