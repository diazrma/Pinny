 'use strict';

 const express = require('express');
 const router = express.Router();
 const controller = require('../Controller/customer-controller');
 const authService = require('../Services/authenticate');

 router.post('/', authService.authorize, controller.post);
 router.delete('/', authService.authorize, controller.delete);

 module.exports = router;