const ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
ethUtil.scrypt = require('scryptsy');
const Web3 = require('web3');
const fs = require('fs');
let server_url = "http://18.222.241.101:7732";
//let server_url = "http://localhost:7732";

let W3 = {
	web3:"", // web3 API 객체
	address:"", // 로그인 계정의 지갑 주소
	ethBalance:"", // 이더 잔고
	ercBalance:"", // 토큰 잔고
	erc:"", // 컨트랙트 객체
	decimals:18, // 토큰 소수점

	privateKey:"",
	
	/**
	 * init 초기화
	 * 노드접속 및 address 저장
	 * ERC20 컨트랙트 deploy
	 */
	init: function(address){
		this.web3 = new Web3(new Web3.providers.HttpProvider(server_url));

		this.address = address;

		//defaultAccount
		this.web3.eth.defaultAccount = this.address;
		
		//contract info
		let contractAddress = "0x358b2f19bcbad11e1e076247df5552c2a5f0272c";
		let byteCode="0x60806040523480156200001157600080fd5b5060405162001776380380620017768339810180604052810190808051906020019092919080518201929190602001805182019291906020018051906020019092919050505033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360008190555083600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508260039080519060200190620000fb9291906200013a565b508160059080519060200190620001149291906200013a565b5080600460006101000a81548160ff021916908360ff16021790555050505050620001e9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017d57805160ff1916838001178555620001ae565b82800160010185558215620001ae579182015b82811115620001ad57825182559160200191906001019062000190565b5b509050620001bd9190620001c1565b5090565b620001e691905b80821115620001e2576000816000905550600101620001c8565b5090565b90565b61157d80620001f96000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016557806318160ddd146101ca57806323b872dd146101f5578063313ce5671461027a57806366188463146102ab57806370a08231146103105780638da5cb5b1461036757806395d89b41146103be578063a3262e571461044e578063a56793ae1461047b578063a9059cbb146104a8578063d73dd6231461050d578063dd62ed3e14610572575b600080fd5b3480156100e157600080fd5b506100ea6105e9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012a57808201518184015260208101905061010f565b50505050905090810190601f1680156101575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017157600080fd5b506101b0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610687565b604051808215151515815260200191505060405180910390f35b3480156101d657600080fd5b506101df610815565b6040518082815260200191505060405180910390f35b34801561020157600080fd5b50610260600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061081e565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f610ba2565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102b757600080fd5b506102f6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bb5565b604051808215151515815260200191505060405180910390f35b34801561031c57600080fd5b50610351600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d65565b6040518082815260200191505060405180910390f35b34801561037357600080fd5b5061037c610dae565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103ca57600080fd5b506103d3610dd4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104135780820151818401526020810190506103f8565b50505050905090810190601f1680156104405780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561045a57600080fd5b5061047960048036038101908080359060200190929190505050610e72565b005b34801561048757600080fd5b506104a66004803603810190808035906020019092919050505061103a565b005b3480156104b457600080fd5b506104f3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061118a565b604051808215151515815260200191505060405180910390f35b34801561051957600080fd5b50610558600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611373565b604051808215151515815260200191505060405180910390f35b34801561057e57600080fd5b506105d3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611493565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561067f5780601f106106545761010080835404028352916020019161067f565b820191906000526020600020905b81548152906001019060200180831161066257829003601f168201915b505050505081565b600080821415801561071657506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b15610724576000905061080f565b81600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b60008054905090565b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561086e57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156108f957600080fd5b61094b82600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461151a90919063ffffffff16565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a1d82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461151a90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610aef82600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461153390919063ffffffff16565b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600460009054906101000a900460ff1681565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610cc6576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d5a565b610cd9838261151a90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b600191505092915050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e6a5780601f10610e3f57610100808354040283529160200191610e6a565b820191906000526020600020905b815481529060010190602001808311610e4d57829003601f168201915b505050505081565b3373ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610ece57600080fd5b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610f1c57600080fd5b610f6e81600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461151a90919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610fc68160005461151a90919063ffffffff16565b6000819055507fcdde0dbc79a6de0cf58f8d27809fcd6d0ec807c02d3a4990ed57b626582d4d843382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150565b3373ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561109657600080fd5b6110e881600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461153390919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506111408160005461153390919063ffffffff16565b6000819055507f1b42dee23da8f8d867691009a0e904c7ed4ea919f2de072193bc5eab748761ca81600054604051808381526020018281526020019250505060405180910390a150565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156111da57600080fd5b61122c82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461151a90919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506112c182600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461153390919063ffffffff16565b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050611408838261153390919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600191505092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600082821115151561152857fe5b818303905092915050565b600080828401905083811015151561154757fe5b80915050929150505600a165627a7a723058202019f36122d951eca7a7208ff95f1de0f6e226c8cba7dc0fe001f25dfda8f8770029000000000000000000000000000000000000000004d8c55aefb8c05b5c000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000005454c4c55490000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003454c550000000000000000000000000000000000000000000000000000000000";
		let abi=[{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenOwner","type": "address"},{"name": "spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenOwner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "value","type": "uint256"}],"name": "burnCoin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "tokenOwner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "tokens","type": "uint256"}],"name": "Approval","type": "event"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "value","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "a_amount","type": "uint256"},{"indexed": false,"name": "a_totalSupply","type": "uint256"}],"name": "EventAddCoin","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "a_burnAddress","type": "address"},{"indexed": false,"name": "a_amount","type": "uint256"}],"name": "EventBurnCoin","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "tokens","type": "uint256"}],"name": "Transfer","type": "event"},{"constant": false,"inputs": [{"name": "value","type": "uint256"}],"name": "addCoin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "addedValue","type": "uint256"}],"name": "increaseApproval","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "value","type": "uint256"}],"name": "approve","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "subtractedValue","type": "uint256"}],"name": "decreaseApproval","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "a_totalSupply","type": "uint256"},{"name": "a_tokenName","type": "string"},{"name": "a_tokenSymbol","type": "string"},{"name": "a_decimals","type": "uint8"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "value","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"}];

		//contract deploy
		this.erc = this.web3.eth.contract(abi).at(contractAddress);

		//ether balance
		this.ethBalance = this.web3.fromWei(this.web3.eth.getBalance(this.address),'ether');
		//erc balance
		this.ercBalance = this.erc.balanceOf(this.address).div(10**this.decimals).toString();
	},

	/**
	 * 계정 생성
	 * password -> account 생성 및 keystore 생성 됨.
	 * keystore data 리턴
	 */
	newAccount: function(password){
		var res = {};
		res.result = false;
		this.web3 = new Web3(new Web3.providers.HttpProvider(server_url));
		//계정 생성
		var newAddress = this.web3.personal.newAccount(password);

		//생성된 keystore 파일
		var keystoreDir = "/home/ubuntu/.ethereum/keystore/";
		var keystoreFile="";
		var files = fs.readdirSync(keystoreDir); // 디렉토리를 읽어온다
		
		console.log(newAddress);
		console.log(newAddress.substring(2, 42));
    
		newAddress = newAddress.substring(2, 42);

		//해당 주소의 파일명 찾기
		for(var i in files){
			if(files[i].indexOf(newAddress) != -1){
				keystoreFile = files[i]; //해당 주소의 keystore 파일
				break;
			}
		}
		console.log(keystoreFile);

		res.result = true;
		res.fname = keystoreFile;
		res.fcontent = fs.readFileSync(keystoreDir+keystoreFile, 'utf8');
		//keystore 파일 return
		return res;
	},

	newAccountTest: function(password){
		var res = {};
		res.result = false;
		//this.web3 = new Web3(new Web3.providers.HttpProvider(server_url));

		//계정 생성
		//var newAddress = this.web3.personal.newAccount(password);

		res.result = true;
		res.fname = "dumy_keystore"+Math.random()*10000000000000000;
		res.fcontent = "test123test123test123test123123jdasfpm";
		//keystore 파일 return
		return res;
	},

	loadAccount: function(keystore, password){
		var res = {};
		res.result=false;
		var json = (typeof keystore === 'undefined' ? 'undefined' : typeof(keystore)) === 'object' ? keystore : JSON.parse(keystore.toLowerCase());
	    if (json.version !== 3) {
			res.message='Not a V3 wallet';
			return res;
	    }
	    var derivedKey;
	    var kdfparams;
	    if (json.crypto.kdf === 'scrypt') {
	        kdfparams = json.crypto.kdfparams;
	        derivedKey = ethUtil.scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
	    } else if (json.crypto.kdf === 'pbkdf2') {
	        kdfparams = json.crypto.kdfparams;
	        if (kdfparams.prf !== 'hmac-sha256') {
				res.message='Unsupported parameters to PBKDF2';
				return res;
	        }
	        derivedKey = ethUtil.crypto.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
	    } else {
			res.message='Unsupported key derivation scheme';
			return res;
	    }
	    var ciphertext = new Buffer(json.crypto.ciphertext, 'hex');
	    var mac = ethUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));
	    if (mac.toString('hex') !== json.crypto.mac) {
			res.message='Key derivation failed - possibly wrong passphrase';
			return res;
		}

		//privatekey 추출, 저장
		var decipher = ethUtil.crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'));
		var seed = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

		while (seed.length < 32) {
    		var nullBuff = new Buffer([0x00]);
			seed = Buffer.concat([nullBuff, seed]);
		}
		this.privateKey = seed.toString('hex');
		
		try{
			this.web3 = new Web3(new Web3.providers.HttpProvider(server_url));
			this.web3.personal.importRawKey(this.privateKey, password);
		}catch(err){
		}

		res.message = 'Sign in Success';
		res.address = '0x'+json.address;
		res.result = true;
		
		return res;
	},

	/**
	 * 잔액 조회
	 * type = eth : 이더리움
	 * type = erc : erc20
	 */
	getBalance: function(type) {
		switch(type){
			case "eth" :
			return this.web3.fromWei(this.web3.eth.getBalance(this.address),"ether");
			case "erc" :
			return this.erc.balanceOf(this.address).div(10**this.decimals).toString();
		}
	},
	 /**
	 * 전송 하기
	 * type = eth : 이더리움
	 * type = erc : erc20
	 * 
	 */
	sendTransaction: function(type, toAddress, amount, password) {
		var res = {};
		res.result = false;
		res.message = 'invalid address or password';
		var lock;
		try{
			lock = this.web3.personal.unlockAccount(this.address, password);
		}catch(err){
			res.message = err.message;
			return res;
		}
		switch(type){
			case "eth" :			
			if(lock){
				try{
					var tx = this.web3.eth.sendTransaction({from: this.address, to:toAddress, value:this.web3.toWei(amount, "ether")});
				}catch(err){
					res.message = err.message;
					this.web3.personal.lockAccount(this.address);
					return res;
				}
				res.message = tx;
				res.result = true;
			}
			break;

			case "erc" :
			if(lock){
				try{
					var tx = this.erc.transfer( toAddress, amount*(10**this.decimals) );
				}catch(err){
					res.message = err.message;
					this.web3.personal.lockAccount(this.address);
					return res;
				}
				res.message = tx;
				res.result = true;
			}
			break;
		}
		this.web3.personal.lockAccount(this.address);
		return res;
	},
	lockAccount: function(){
		this.web3.personal.lockAccount(this.address);
	},
	unlockAccount: function(password){
		this.web3.personal.unlockAccount(this.address, password);
	},

	/**
	 * block count
	 * return count
	 */
	getBlockCount: function() {
		this.web3.eth.blockNumber;
	},


	/**
	 * 거래 내역 조회
	 */
	getTransactionList: function(){
		let n = this.web3.eth.blockNumber;
		let txsFrom = []; //보낸 tx
		let txsTo = []; //받은 tx
		for(let i = 0; i < n; i++) {
		    let block = this.web3.eth.getBlock(i, true);
		    for(let j = 0; j < block.transactions.length; j++) {
		        if( block.transactions[j].from == this.address ){
		            txsFrom.push(block.transactions[j]);
		        }else if(block.transactions[j].to == this.address ){
		        	txsTo.push(block.transactions[j]);
		        }
		    }
		}		
	},

	/**
	 * private key get
	 */
	getPrivateKey: function(){
		return this.privateKey;
	},

	test: function(amount) {
	}
	
}

module.exports = W3;

