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

var investorAccount = secrets.getInvestorAccount();
var investorPrivateKey = secrets.getInvestorPrivateKey();
var encryptedInvestorPrivateKey = connection.eth.accounts.encrypt(investorPrivateKey, password);

var issuerAccount = secrets.getIssuerAccount();
var issuerPrivateKey = secrets.getIssuerPrivateKey();
var encryptedIssuerPrivateKey = connection.eth.accounts.encrypt(issuerPrivateKey, password);

var adminAccount = secrets.getAdminAccount();
var adminPrivateKey;

async function savePrivateKeys() {
    var res = await easyWalletContract.methods.getValue(adminAccount).call();
    var encryptedAdminPrivateKey = JSON.parse(res);
    adminPrivateKey = connection.eth.accounts.decrypt(encryptedAdminPrivateKey, password).privateKey.substring(2);

    console.log('Saving investor key');
    await util.callContractMethod(
            adminAccount,
            adminPrivateKey,
            connection,
            easyWalletAbi,
            easyWalletAddress,
            'setValue',
            [investorAccount, JSON.stringify(encryptedInvestorPrivateKey)]
    );

    console.log('Saving issuer key');
    res1 = await util.callContractMethod(
            adminAccount,
            adminPrivateKey,
            connection,
            easyWalletAbi,
            easyWalletAddress,
            'setValue',
            [issuerAccount, JSON.stringify(encryptedIssuerPrivateKey)]
    );
}

savePrivateKeys();
