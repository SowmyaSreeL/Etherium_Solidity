const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'disease fury man field social divorce music among inspire hip where witness',
    'https://goerli.infura.io/v3/dbd364923d5b4b04af3d6c5ad6868ff2'
);
const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account:', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        })
        .catch(e => {
            console.log(e)
        })
    console.log('contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();