var Web3 = require('web3');
var secrets = require('./secrets/secrets.js');
var util = require('./util.js');

var projectId = secrets.getProjectId();
var connection = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));

var password = secrets.getPassword();

var easyWalletAddress = secrets.getEasyWalletAddress();
var easyWalletFile = './build/contracts/EasyWallet.json';
var easyWalletAbi = util.getContractAbi(easyWalletFile);
var easyWalletContract = util.getContract(connection, easyWalletAbi, easyWalletAddress);

var easyContractAddress = secrets.getEasyContractAddress();
var easyContractFile = './build/contracts/Easy.json';
var easyContractAbi = util.getContractAbi(easyContractFile);
var easyContractContract = util.getContract(connection, easyContractAbi, easyContractAddress);

var issuerAccount = secrets.getIssuerAccount();
var issuerPrivateKey = secrets.getIssuerPrivateKey();
var encryptedIssuerPrivateKey = connection.eth.accounts.encrypt(issuerPrivateKey, password);

var issuerAccount = secrets.getIssuerAccount();
var issuerPrivateKey;

async function incrementKey() {
    var res = await easyWalletContract.methods.getValue(issuerAccount).call();
    var encryptedIssuerPrivateKey = JSON.parse(res);
    issuerPrivateKey = connection.eth.accounts.decrypt(encryptedIssuerPrivateKey, password).privateKey;
    util.callContractMethod(
            issuerAccount,
            issuerPrivateKey.substring(2),
            connection,
            easyContractAbi,
            easyContractAddress,
            'incrementCount',
            ["1"]
    );
}

incrementKey();
