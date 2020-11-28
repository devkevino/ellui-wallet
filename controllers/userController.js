const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const createError = require('http-errors');

const wallet_api = require(path.join('..', 'web3-wrap'));

exports.uploadOption = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    }),
});

exports.login_get = function(req, res, next) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.render('login', { title: 'Express' });
    }
};

exports.login_post = function(req, res, next) {
    var data = fs.readFileSync(req.file.path, 'utf-8');
    fs.unlinkSync(req.file.path)

    var pwd = req.body.pwd;
    var keystore = data;
    var api_res = wallet_api.loadAccount(keystore, pwd);

    if(api_res.result) {

        // 로그인 성공 시 세션 저장!!
        var session = req.session;
        session.user = {
            'address' : api_res.address,
        };

        var minute = 60000;
        req.session.cookie.expires = new Date(Date.now() + (minute * 10));
        req.session.cookie.maxAge = minute * 10;

        res.json(api_res);

    } else {
        res.json(api_res);
    }
};

exports.logout_post = function(req, res, next) {
    if(req.session.user) {
        req.session.destroy((err) => {
            if(err) {
                res.json({'result':'fail'});
            } else {
                res.json({'result':'ok'});
                // res.redirect('/');
            }
        });
    } else {
        res.json({'result':'fail'});
        // res.redirect('/');
    }
}

exports.register_get = function(req, res, next) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.render('register');
    }
}

exports.register_post = function(req, res, next) {
    var pwd = req.body.password;
    if (pwd) {
        // 암호화 파일 만들기 태스트용
        //generate(req.body.password, res, next);
        var api_res = wallet_api.newAccount(pwd);
        if(api_res.result) {
            res.json(api_res);
        } else {
            res.json({'result': false});
        }
    } else {
        res.json({'result': 'check password attribute'});
    }
}


function generate(password, res, next) {
    // 암호화 및, JSON 포맷 객체 만들깅....
  
    crypto.randomBytes(256, (err, buf) => {
        if (err) res.json({'result': 'fail', 'info' : 'randomBytesError'});

        let pwd = password;
        let salt = buf.toString('base64');
        let cyperText;
        console.log('salt', salt)

        //crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
             if (err) res.json({'result': 'fail', 'info' : 'pbkdf2 error'});

            console.log("derivedKey : ", derivedKey.toString('base64'));
            cyperText = derivedKey.toString('base64');

            let fName = new Date().valueOf()+".txt";

            let cryptoObj = {
                Crypto: {
                    salt: '',
                    cyperText: '',
                    plainText: '',
                }
            };
            cryptoObj.Crypto.salt = salt;
            cryptoObj.Crypto.cyperText = cyperText;
            cryptoObj.Crypto.plainText = password;

            console.log(fName);
            console.log(cryptoObj);

            res.json({'result': 'generate-success', 'fileName': fName, 'data': JSON.stringify(cryptoObj)});
        
            // fs.writeFile(path.join(__dirname, '../', 'uploads', fName), JSON.stringify(cryptoObj), 'utf8', (err) => {
            //     if (err) res.json({'result': 'fail', 'info' : 'writeFile error'});
            //     //next(createError(500, 'generate file fail!!!!'));
            //     console.log('The file has been saved!');
            //     res.json({'result': 'generate-success', 'fileName': fName, 'data': JSON.stringify(cryptoObj)});
            // });

        });
    });

}