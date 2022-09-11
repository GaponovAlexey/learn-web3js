import { useState } from 'react'
import Web3 from 'web3'
import { p2pTrade } from '../../../abi/p2pTrade'

export const TimestampToConflict = async () => {
  const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'

  console.log('timestampToConflict')
  let w3 = new Web3(window.ethereum)
  let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)
  await contractP2PTrade.methods
    .timestampToConflict()
    .call()
    .then(function (receipt) {
      console.log('timestampToConflict', receipt)
    })
}
