pragma solidity ^0.4.17;
contract Inbox {
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}

// Lottery example practiced i9n Remix UI
// contract Lottery {
//     address public manager;
//     address[] public players;

//     // constructor
//     function Lottery() public {
//         manager = msg.sender;
//     }

//     // pay some ether when we call a function
//     function enter() public payable {
//         require(msg.value > .01 ether); // .01 Ether
//         players.push(msg.sender);
//     }

//     // Generation psudo random number
//     function random() private view returns (uint) {
//         return uint(keccak256(block.difficulty, now, players)); // we can use sha3 also here instead of keccak256
//     }

//     // getting the player based on random number by random % players length
//     function pickWinner() public {
//         uint index = random() % players.length;
//         players[index].transfer(this. balance); // If we pass 1 to transfer then it will transfer 1 Wei
//     }
// }