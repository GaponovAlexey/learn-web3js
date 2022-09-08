export const writeContractOnChain = async (
  contractP2PTradeOnChain,
  payCurrencyContract,
  minLimit,
  rate,
  tokenSell,
  accounts,
  gasPrice,
) => {
  await contractP2PTradeOnChain.methods
    .createOrder(
      '0x4AC7c23dF4e957D4DBF8DEe195B705e24AFFE536',
      '0x4a7d6546Ee53F129369fFf073c2b207174a1Ea35',
      BigInt(+`${minLimit}e18`),
      BigInt(+`${rate}e18`),
      BigInt(+`${tokenSell}e18`),
    )
    .send({ from: accounts[0], gasPrice: gasPrice * 5 })
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
      console.log(receipt)
    })
    .catch((e) => {
      console.log(e)
    })
}
