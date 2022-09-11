import Web3 from 'web3'
import { asset } from '../../../abi/asset'

export const CreateOrder = async ({method}) => {
  
  const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
  const smartContractUSDT = '0xC5DC2366997A1Db48ed0a909c12c778d717a1859'

  let w3 = new Web3(window.ethereum)
  let contractUSDT = new w3.eth.Contract(asset, smartContractUSDT)
  // const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

  const accounts = await w3.eth.getAccounts()
  const gasPrice = await w3.eth.getGasPrice().then((result) => {
    return result
  })
  const token = 'USDT'
  const payCurrencyContract = crypto
  //ac
  //methods
  await contractUSDT.methods
    .approve(smartContractAddress, BigInt(1e30))
    .createOrder(
      token,
      payCurrencyContract,
      BigInt(+`${1}e18`),
      BigInt(+`${1}e18`),
      BigInt(`${1}e18`),
    )
    .send({ from: accounts[0], gasPrice: gasPrice * 5 })
    .on('TransactionHash', function (hash) {
      console.log(hash)
    })
    .then(function (receipt) {
      console.log(receipt)
    })
}
// createOrder
// Позволяет создать Order пользователю. Необходимо ввести:
//         string memory method, //   sell or buy
//         string memory Asset 0, // Первый актив в ордере, то что продаёт поставщик, например BTC (адрес смарт контракта токена)
//         string memory Asset 1, //Второй актив в ордере, то что поставщик хочет купить, например USDT (адрес смарт контракта токена)
//         uint256 mintoBuy,  // минимальное для покупки
//         uint256 ratio0, за сколько продаёт по отношению к долару
//         uint256 ratio1,
//         string memory Currensy, к чему расчитвываем валюта сделки USD
//         uint256 ratioCurrensyToUSD,  курс доллара
//         uint256 amountAsset0 , сколько Asset0 выставлено на продажу (указывать как x * 10 ** 18)
// Значение см. в разделаях orderInfo и orderData
// вытащить Id сделки посдене
