'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controller/login-controller');

router.post('/', controller.post);


module.exports = router;