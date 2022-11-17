const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // constructor
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }

// // executed before each it function
// let car;
// beforeEach(() => {
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });
//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });

let accounts;
let inbox;
const INITIAL_MSG = 'Hi There!!'

beforeEach(async () => {
    // Get all the accounts
    accounts = await web3.eth.getAccounts()
        // .then(fetchedAccounts => {
        //     console.log(fetchedAccounts);
        // })
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MSG] })
        .send({
            from: accounts[0],
            gas: '1000000'
        })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address)
    })
    it('create new contract to get default msg', async () => {
        const msg = await inbox.methods.message().call();
        assert.equal(msg, INITIAL_MSG);
    })
    it('change the message', async () => {
        await inbox.methods.setMessage('bye there!!').send({ from: accounts[0] });
        const msg = await inbox.methods.message().call();
        assert.equal(msg, 'bye there!!')
    })
})