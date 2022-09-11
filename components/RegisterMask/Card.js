import { useState } from 'react'
import { ethers } from 'ethers'

const Card = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [connButtonText, setConnButtonText] = useState('Connect Wallet')

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0])
          setConnButtonText('Wallet Connected')
          getAccountBalance(result[0])
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
    } else {
      console.log('Need to install MetaMask')
      setErrorMessage('Please install MetaMask browser extension to interact')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    getAccountBalance(newAccount.toString())
  }

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }

  const chainChangedHandler = () => {
    window.location.reload()
  }

  // window.ethereum.on("accountsChanged", accountChangedHandler);
  // window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div>
      <div className="walletCard">
        <h4 className='text-2xl' > {'Connection to MetaMask using window.ethereum methods'} </h4>
        <button className='text-xl text-green-500 px-4' onClick={connectWalletHandler}>{connButtonText}</button>
        <button className='text-xl text-red-500 px-4' onClick={chainChangedHandler}>{'Reload'}</button>
        <div >
          <h3 className='text-xl' >Address: {defaultAccount}</h3>
        </div>
        <div className="balanceDisplay">
          <h3>Balance: {userBalance}</h3>
        </div>
        {errorMessage}
      </div>
    </div>
  )
}

export default Card
