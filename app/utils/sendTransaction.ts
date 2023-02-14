import getTokenContract from "./tokens";
import Web3 from "web3";
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET

export const sendTransaction = async (
  token: string, // which token is used HERE we use ZLDKC
  address: string, // address of the recipient
  amount: string, // amount of the token to send
  testnet: boolean, // is it testnet?
  account: string
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tokenContract = getTokenContract(token, testnet);
  console.log('tokenContract: ', tokenContract)
  if (tokenContract) { // if tokenContract is not undefined
    const decimals = await tokenContract.methods.decimals().call();
    console.log('decimals: ', decimals);
    const amountToSend = web3.utils.toWei(amount, 'ether');
    console.log('amountToSend: ', amountToSend);
    console.log('Address of the sender: ', account);
    console.log('Address of the recipient: ', address);
    // send the transaction
    // transferOut(address _to, uint256 _amount)
    const receipt1 = await tokenContract.methods.transferOut(address, amountToSend).send({ from: account });
    console.log('receipt1: ', receipt1);

    const tx = await web3.eth.accounts.signTransaction({
      from: account,
      to: address,
      value: amountToSend,
      gas: 21000,
    },
      '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342'
    )
    console.log('tx: ', tx);
    console.log('tx.rawTransaction: ', tx.rawTransaction)
    const receipt = await web3.eth.sendSignedTransaction(tx.rawTransaction);
    console.log('receipt: ', receipt);
  }
  console.log('No contract found for token: ', token);
  return;
}