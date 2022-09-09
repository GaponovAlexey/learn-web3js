import Web3 from 'web3'
import { asset } from '../abi/asset'
import { p2pTrade } from '../abi/p2pTrade'
import { CallContract } from './func/WriteContract/CallContract'
import { writeContract } from './func/WriteContract/WriteContract'

const OrderTest = () => {
  const connect_smart_contract = async () => {
    const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
    const smartContractUSDT = '0xC5DC2366997A1Db48ed0a909c12c778d717a1859'

    // определяем тип предложения и спопособ оплаты
    let typeOfferContract = 'crypto'
    let payCurrencyContract = crypto
    let minimumLimit = 1

    let w3 = new Web3(window.ethereum)
    let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)
    let contractUSDT = new w3.eth.Contract(asset, smartContractUSDT)

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const gasPrice = await w3.eth.getGasPrice().then((result) => {
      return result
    })

    let tokenSell = 1

    console.log('Начался обмен обычный')
    await contractUSDT.methods
      .approve(smartContractAddress, BigInt(1e30))
      .send({ from: accounts[0], gasPrice: gasPrice * 5 })
      .on('TransactionHash', function (hash) {
        TxHs = hash
        console.log(hash)
      })
      .then(function (receipt) {
        writeContract(
          contractP2PTrade, // connect SmartCotract
          gasPrice, // gas count
          accounts, // MM account
          typeOfferContract, // method SmartContract
          payCurrencyContract, // token
          minimumLimit, // mintoBuy
          tokenSell, // amountAsset0
        )
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log('Please connect to MetaMask.')
        } else {
          console.error(error)
        }
      })
  }

  const connect_Call_Contract = async () => {
    console.log('call_contract')

    const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
    let w3 = new Web3(window.ethereum)

    let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    const gasPrice = await w3.eth.getGasPrice().then((result) => {
      return result
    })
    // const to = '0x6a4143A3038B0c264700a32aD5A1111F0CfADBfB'

    await contractP2PTrade.methods
      .orderInfo(0)
      .call({ from: smartContractAddress})
      .then(function (receipt) {
        console.log('re', receipt)
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log('Please connect to MetaMask.')
        } else {
          console.error(error)
        }
      })
  }
  return (
    <div>
      <button onClick={connect_smart_contract}>connect_smart_contract</button>
      <button onClick={connect_Call_Contract}>connect_CallContractt</button>
    </div>
  )
}

export default OrderTest
