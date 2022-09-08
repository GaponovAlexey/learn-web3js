let token = 'BTC'

export const CallContract = async (
  contractP2PTrade, // connect SmartCotract
  gasPrice, // gas count
  accounts, // MM account
  typeOfferContract, // method SmartContract
  payCurrencyContract, // token
  minLimit, // mintoBuy
  tokenSell, // amountAsset0
) => {
  await contractP2PTrade.methods
    
    .on('TransactionHash', function (hash) {
      TxHs = hash
      console.log(hash)
      // writeContract(contractP2PTrade)
    })
    .on('receipt ', (receipt) => {
      console.log('receipt ' + receipt)
    })
    .on('error', function (error) {
      console.log(error)
    })
    .then(function (receipt) {
      console.log(123123)
      console.log(receipt)
    })
    .catch((e) => {
      console.log(e)
    })
}
