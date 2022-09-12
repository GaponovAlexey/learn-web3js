import { useState } from 'react'
import Web3 from 'web3'
import { p2pTrade } from '../../../abi/p2pTrade'
import { createOrderOnServer } from '../../func/SendServer/CreateOrderOnServer'

const CreateOrderForm = () => {
  const [method, setMethod] = useState('CRYPTO') //method
  const [sell, setSell] = useState('BTC') //asset0
  const [buy, setBuy] = useState('BTC') //asset1
  const [minBS, setMinBS] = useState(1) // minToBuy
  const [rate0, setRate0] = useState(30000)
  const [rate1, setRate1] = useState(200000)
  const [Currensy, setCurrensy] = useState('USD')
  const [ratioCurrensyToUSD, setratioCurrensyToUSD] = useState(1)
  const [amountAsset, setamountAsset] = useState(1)

  const CreateOrderSubmit = () => {
    // CreateOrder()
    createOrderOnServer({
      method: method?.toUpperCase(), //method
      sell: sell?.toUpperCase(), //asset0 = "BTC"
      buy: buy?.toUpperCase(), //asset0 = "BTC"
      minToBuy: minBS, // minToBuy = 1
      rate0: rate0, //rate0 = 30000
      rate1: rate1, //rate1 = 20000
      currency: Currensy?.toUpperCase(), // currency = 'USD'
      ratioCurrensyToUSD: ratioCurrensyToUSD, //ratioCurrensyToUSD = 1
      tokenSell: amountAsset, //tokenSell - 1
    })
  }

  const CreateOrder = async () => {
    const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'

    let w3 = new Web3(window.ethereum)
    let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress) // const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    const accounts = await w3.eth.getAccounts()
    const gasPrice = await w3.eth.getGasPrice().then((result) => {
      return result
    })
    await contractP2PTrade.methods
      .createOrder(
        method?.toUpperCase(), //method = all
        sell?.toUpperCase(), //asset0 = "BTC"
        buy?.toUpperCase(), //asset0 = "BTC"
        BigInt(+`${minBS}e18`), // minToBuy = 1
        BigInt(+`${rate0}e18`), //rate0 = 30000
        BigInt(+`${rate1}e18`), //rate1 = 20000
        Currensy?.toUpperCase(), // currency = 'USD'
        BigInt(+`${ratioCurrensyToUSD}e18`), //ratioCurrensyToUSD = 1
        BigInt(+`${amountAsset}e18`), //tokenSell - 1
      )
      .send({ from: accounts[0], gasPrice: gasPrice })
      .on('TransactionHash', function (hash) {
        console.log(hash)
      })
      .then(function (receipt) {
        console.log(receipt)
      })
  }

  return (
    <div className="bg-slate-400">
      <div className="inline flex-wrap">
        <div className="selorby">
          <input
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="method sell or buy"
          />
        </div>
        <div className="what do you sell">
          <input
            value={sell}
            onChange={(e) => setSell(e.target.value)}
            type="text"
            placeholder="what do you sell"
          />
        </div>
        <div className="what do you buy">
          <input
            value={buy}
            onChange={(e) => setBuy(e.target.value)}
            placeholder="what do you buy"
          />
        </div>
        <div className="minBuy">
          <input
            value={minBS}
            onChange={(e) => setMinBS(e.target.value)}
            placeholder="minBuy or minSell"
          />
        </div>
        <div className="rate0">
          <input
            value={rate0}
            onChange={(e) => setRate0(e.target.value)}
            placeholder="rate your sell token "
          />
        </div>
        <div className="rate1">
          <input
            value={rate1}
            onChange={(e) => setRate1(e.target.value)}
            placeholder="rate1 your sell token"
          />
        </div>
        <div className="Currensy">
          <input
            value={Currensy}
            onChange={(e) => setCurrensy(e.target.value)}
            placeholder="usd"
          />
        </div>
        <div className="ratioCurrensyToUSD">
          <input
            value={ratioCurrensyToUSD}
            onChange={(e) => setratioCurrensyToUSD(e.target.value)}
            placeholder="curse usd"
          />
        </div>
        <div className="amountAsset">
          <input
            value={amountAsset}
            onChange={(e) => setamountAsset(e.target.value)}
            placeholder="amount your tokens"
          />
        </div>
      </div>
      <button onClick={CreateOrderSubmit}>Create Contract</button>
    </div>
  )
}

export default CreateOrderForm

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
