const Web3 = require('web3');
const abi = require('./abi.json');

let web3, accounts, addVoter, fetchWinner;
window.addEventListener("load", async () => {
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        try{
            await window.ethereum.enable();
        }catch(err){
            console.error(error);
        }
        accounts  = await web3.eth.getAccounts();
        alert("Signed in with: "+accounts[0]);
    }else{
        alert("Metamask not Installed");
    }
})

addVoter = document.getElementById('addVoter');
fetchWinner = document.getElementById('fetchWinner');

addVoter.addEventListener('click', async () => {
    await ballotContract.methods.giveRightToVote(document.getElementById('voter_new').value).send({
        from: accounts[0]
    }).on('transactionHash', (hash) => {
        alert("Transaction Hash: "+hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
    })
    .on('receipt', function(receipt){
        console.log(receipt);
    })
    .on('error', function(error, receipt) {
        console.log(error);
    })

})

fetchWinner.addEventListener('click', async () => {
    const winner = await ballotContract.methods.winnerName().call({from: accounts[0]});
    document.getElementById('winner').innerText = winner;
})




