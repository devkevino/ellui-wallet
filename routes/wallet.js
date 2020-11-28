const express = require('express');
const router = express.Router();
const path = require('path');

const wallet_controller = require(path.join('..', 'controllers','walletController'));

router.get('/send', wallet_controller.send_get);

router.post('/send', wallet_controller.send_post);

router.post('/send/balance', wallet_controller.send_balance_post);

router.get('/receive', wallet_controller.receive_get);

router.get('/history', wallet_controller.history_get);

router.get('/prikey', wallet_controller.prikey_get);

module.exports = router;