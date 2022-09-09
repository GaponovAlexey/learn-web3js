import { CreateOrder } from '../CreateOrder'
let token = "BTC"

export const writeContract = async (
  contractP2PTrade, // connect SmartCotract
  gasPrice, // gas count
  accounts, // MM account
  typeOfferContract, // method SmartContract
  payCurrencyContract, // token
  minLimit, // mintoBuy
  tokenSell, // amountAsset0
) => {
  await contractP2PTrade.methods
    .CreateOrder(
      typeOfferContract?.toUpperCase(), // method
      token.toUpperCase(), // Asset0
      payCurrencyContract?.toUpperCase(), // Asset1
      BigInt(+`${minLimit}e18`), // mintoBuy
      BigInt(+`${rate}e18`), // ratio0
      BigInt(1e18), // ratio1
      'USD', // Currensy
      BigInt(1e18), // ratioCurrensyToUSD
      BigInt(+`${tokenSell}e18`), // amountAsset0
    )
    .send({ from: accounts[0], gasPrice: gasPrice * 5 })
    .on('TransactionHash', function (hash) {
      TxHs = hash
      console.log(hash)
      // writeContract(contractP2PTrade)
    })
    .then(function (receipt) {
      console.log(123123)
      console.log(receipt)
    })
    .catch((e) => {
      console.log(e)
    })
}
