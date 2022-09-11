import { useState } from 'react'
import Web3 from 'web3'
import { asset } from '../../../abi/asset'
import { writeContract } from '../../func/WriteContract/WriteContract'

export const ConnectSmartContract = async () => {
  let typeOfferContract = 'crypto'
  let payCurrencyContract = 'crypto'
  let minimumLimit = 1
  const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
  const smartContractUSDT = '0xC5DC2366997A1Db48ed0a909c12c778d717a1859'
  
  let w3 = new Web3(window.ethereum)
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
      console.log(hash)
    })
    .then(function (receipt) {
      writeContract(
        contractP2PTrade, // connect SmartContract
        gasPrice, // gas count
        accounts, // MM account
        typeOfferContract, // method SmartContract
        payCurrencyContract, // token
        minimumLimit, // minBuy
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
