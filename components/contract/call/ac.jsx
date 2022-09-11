import { getAccountPath } from 'ethers/lib/utils'
import { useState } from 'react'
import Web3 from 'web3'
import { p2pTrade } from '../../../abi/p2pTrade'

export const AC = async () => {
  // const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'

  console.log('start_call_contract')
  let w3 = new Web3(window.ethereum)
  // let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)

    // window.ethereum
    const ac = await w3.eth.getAccounts()
    console.log(ac[0])
    
  // await w3.eth.getAccounts().catch((e) => {
    // console.log(e)
  // })
}
