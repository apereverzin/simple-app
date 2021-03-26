var Web3 = require('web3');
var secrets = require('./secrets/secrets.js');
var util = require('./util.js');

var projectId = secrets.getProjectId();
var connection = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));

var adminAccount = secrets.getAdminAccount();
var adminPrivateKey = secrets.getAdminPrivateKey();
var password = secrets.getPassword();
var encryptedAdminPrivateKey = connection.eth.accounts.encrypt(adminPrivateKey, password);

var easyWalletAddress = secrets.getEasyWalletAddress();
const easyWalletFile = './build/contracts/EasyWallet.json';
const easyWalletAbi = util.getContractAbi(easyWalletFile);
var easyWalletContract = util.getContract(connection, easyWalletAbi, easyWalletAddress);

util.callContractMethod(
        adminAccount,
        adminPrivateKey,
        connection,
        easyWalletAbi,
        easyWalletAddress,
        'setValue',
        [adminAccount, JSON.stringify(encryptedAdminPrivateKey)]
);
