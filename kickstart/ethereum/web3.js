import Web3 from "web3";
let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // if running inside the browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/dbd364923d5b4b04af3d6c5ad6868ff2"
    );
    web3 = new Web3(provider);
}


export default web3;