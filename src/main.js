var Web3 = require('web3');
const wem = '0x1883772154a66b78f31aec1094d5f46f7e647b17';
const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'));
let ABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "left", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "minter", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address", "name": "tokenOwner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "balance", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" } ];
var contract = new web3.eth.Contract(ABI, wem);
if (typeof window.web3 !== 'undefined') {
    console.log('MetaMask is installed!');
    
    
  }
  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    return account
  }

async function main(){
  const account = await getAccount();
  const wemBal = await contract.methods.balanceOf(account).call();


  document.getElementById("show").innerHTML = account;
  document.getElementById("BNB-bal").innerHTML =   web3.utils.fromWei((await web3.eth.getBalance(account)).toString(), 'ether');
  document.getElementById("WEM-bal").innerHTML =  wemBal;
  
}


window.onload= async function(){

  if (typeof window.web3 !== 'undefined') {
    console.log('MetaMask is installed!');
    main();
  }
  else{
    document.getElementById("error").innerHTML = "Please install metamask"
  }

  document.getElementById("addWem").addEventListener("click", async function() {
    console.log('clicked');
    const wasAdded = await ethereum.request({method: 'wallet_watchAsset',params: {type: 'ERC20', options: {address: wem, symbol: 'WEM', decimals: 0 },},});
    console.log(wasAdded);
  });
 

  

  document.getElementById("buyAmount").addEventListener("input", async function() {
    const cost = this.value/1000000;
    document.getElementById("cost").innerHTML = this.value/1000000;
      
  })
  document.getElementById("buy").addEventListener("click", async function() {
    const transactionParameters = {
      gasPrice: await web3.eth.getGasPrice(), // customizable by user during MetaMask confirmation.
      gas: await web3.eth.getBlock("latest").gasLimit, // customizable by user during MetaMask confirmation.
      to: wem, // Required except during contract publications.
      from: await getAccount(), // must match user's active address.
      value: document.getElementById("cost").innerHTML, // Only required to send ether to the recipient from the initiating external account.
     
    };
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(txHash);
    
  })


}
