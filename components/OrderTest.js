import Web3 from 'web3'
import { asset } from '../abi/asset'
import { abiContract0 } from '../abi/assetContract0'
import { abiContract1 } from '../abi/assetContract1'
import { p2pTrade } from '../abi/p2pTrade'
import { p2pTradeOnChain } from '../abi/p2pTradeOnChain'
import { createOrderOnServer } from './func/CreateOrder'
import { writeContract } from './func/WriteContract/WriteContract'
import { writeContractOnChain } from './func/WriteContract/writeContractOnChain'

const OrderTest = () => {
  const connect_smart_contract = async () => {
    const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
    const smartContractAddressOnChaindis =
      '0x57849733B06147288e3a97b45214fB145c80486a'
    const smartContractUSDT = '0xC5DC2366997A1Db48ed0a909c12c778d717a1859'

    const smartContractAsset0 = '0x4AC7c23dF4e957D4DBF8DEe195B705e24AFFE536'
    const smartContractAsset1 = '0x4a7d6546Ee53F129369fFf073c2b207174a1Ea35'

    // let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmRhZGFkZCIsImlhdCI6MTY2MjY0Nzc3MCwibmJmIjoxNjYyNjQ3NzcwLCJqdGkiOiI5ZDEyNmZhYy0zN2NmLTRmYzUtYjAxNC1kNzUyMmJjZTFhNjAiLCJleHAiOjE2NjI2NDg2NzAsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.jly6RpyAYsxtglftxgvwaAubYxGuFTIh3EbRoskB61g'
    // createOrderOnServer(userToken)

    // определяем тип предложения и спопособ оплаты
    let typeOfferContract
    let payCurrencyContract
    typeOfferContract = 'crypto'
    payCurrencyContract = crypto

    let minimumLimit = 1

    let w3 = new Web3(window.ethereum)

    let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)
    let contractP2PTradeOnChain = new w3.eth.Contract(
      p2pTradeOnChain,
      smartContractAddressOnChaindis,
    )
    let contractUSDT = new w3.eth.Contract(asset, smartContractUSDT)
    let contractAsset0 = new w3.eth.Contract(abiContract0, smartContractAsset0)
    let contractAsset1 = new w3.eth.Contract(abiContract1, smartContractAsset1)
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const gasPrice = await w3.eth.getGasPrice().then((result) => {
      return result
    })

    let tokenOnChain = false
    let cryptoOnChain = true
    let offerType = 'sel'
    let TxHs
    let tokenSell = 1

    if (tokenOnChain === true && cryptoOnChain === true) {
      console.log('Начался обмен он чейн')
      if (offerType == 'buy') {
        await contractAsset1.methods
          .approve(smartContractAddressOnChaindis, BigInt(1e30))
          .send({ from: accounts[0], gasPrice: gasPrice * 5 })
          .on('TransactionHash', function (hash) {
            TxHs = hash
            console.log(hash)
          })
          .on('receipt ', (receipt) => {
            console.log('receipt ' + receipt)
          })
          .on('error', function (error) {
            console.log(error)
          })
          .then(function (receipt) {
            console.log('re', receipt)
            writeContractOnChain(
              contractP2PTradeOnChain,
              payCurrencyContract,
              minimumLimit,
              rate,
              tokenSell,
              accounts,
              gasPrice,
            )
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        await contractAsset0.methods
          .approve(smartContractAddressOnChaindis, BigInt(1e30))
          .send({ from: accounts[0], gasPrice: gasPrice * 5 })
          .on('TransactionHash', function (hash) {
            TxHs = hash
            console.log(hash)
          })
          .on('receipt ', (receipt) => {
            console.log('receipt ' + receipt)
          })
          .on('error', function (error) {
            console.log(error)
          })
          .then(function (receipt) {
            console.log(receipt)
            writeContractOnChain(
              contractP2PTradeOnChain,
              payCurrencyContract,
              minimumLimit,
              rate,
              tokenSell,
              accounts,
              gasPrice,
            )
          })
          .catch((e) => {
            console.log(e)
          })
      }
    } else {
      console.log('Начался обмен обычный')
      await contractUSDT.methods
        .approve(smartContractAddress, BigInt(1e30))
        .send({ from: accounts[0], gasPrice: gasPrice * 5 })
        .on('TransactionHash', function (hash) {
          TxHs = hash
          console.log(hash)
        })
        .on('receipt ', (receipt) => {
          console.log('receipt ' + receipt)
        })
        .on('error', function (error) {
          console.log(error)
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
        .catch((e) => {
          console.log(e)
        })
    }
  }
  return (
    <div>
      <button onClick={connect_smart_contract}>connect_smart_contract</button>
    </div>
  )
}

export default OrderTest
