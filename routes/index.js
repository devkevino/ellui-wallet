var express = require('express');
var router = express.Router();
var path = require('path');

const wallet_api = require(path.join('..', 'web3-wrap'));

router.get('/', (req, res, next) => {

    // session 에서 값 가져와서 이닛 시키는 공용함수만들기
    var address = req.session.user.address;

    // init 
    wallet_api.init(address);

    var eth_balance = wallet_api.getBalance('eth');
    var erc_balance = wallet_api.getBalance('erc');

    var data = {};
    data.pageName = 'index';
    data.eth_balance = eth_balance.toString();
    data.erc_balance = erc_balance;

    res.render(path.join('main', 'index'), data);
   
});


module.exports = router;
