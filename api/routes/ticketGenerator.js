const express = require('express');
const { generateTicket } = require('../controllers/ticketGenerator');

const router = express.Router();

router.post('/', generateTicket);

module.exports = router;
