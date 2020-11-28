const path = require('path');
const createError = require('http-errors');

const wallet_api = require(path.join('..', 'web3-wrap'));

exports.send_get = function(req, res, next) {
   
    var address = req.session.user.address;
    // init 
    wallet_api.init(address);

    res.render(path.join('wallet', 'send'), { pageName: 'send' });
};

exports.send_post = function(req, res, next) {
    var type = req.body.type;
    var toAddress = req.body.toAddress;
    var amount = req.body.amount;
    var password = req.body.password;

    var api_res = wallet_api.sendTransaction(type, toAddress, amount, password);
    
    if(api_res.result) {
        res.json(api_res);
    } else {
        res.json(api_res);
    }
}

exports.send_balance_post = function(req, res, next) {
    var type = req.body.type;

    if(type) {
        var balance = wallet_api.getBalance(type);
        balance = balance.toString();
        
        res.json({balance: balance});
    } else {
        res.json({balance: 0});
    }

}

exports.receive_get = function(req, res, next) {
    var address = req.session.user.address;

    res.render(path.join('wallet', 'receive'), { pageName: 'receive_get', address: address});
};

exports.history_get = function(req, res, next) {
    var address = req.session.user.address;

    res.render(path.join('wallet', 'history'), { pageName: 'history', address: address});
};

exports.prikey_get = function(req, res, next) {
    var prikey = wallet_api.getPrivateKey();

    res.render(path.join('wallet', 'prikey'), { pageName: 'prikey_get', prikey: prikey});
};
