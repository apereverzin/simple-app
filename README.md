# easy-app

- Rename `secrets_sample.js` to `secrets.js`
- In `secrets.js` replace all `'******'` entries with valid values (`getProjectId` should return ID of the project in Infura, `getEasyWalletAddress` and `getEasyContractAddress` should return the addresses of the contracts got after deploying `EasyWallet` and `Easy` contracts)
- In the root directory run `npm install`
- Run `node ./src/js/save-admin-private-key.js`
- Run `node ./src/js/save-private-keys.js`
- Run `node ./src/js/increment-count-of-1-by-issuer-safely.js`; using `Remix` ensure that the value of count is incremented after each run of this command
