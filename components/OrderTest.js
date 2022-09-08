const OrderTest = () => {
  const connect_smart_contract = async () => {
    const smartContractAddress = '0xE9178f76A7267d27A2ADceF667a967A92494453e'
    const smartContractAddressOnChaindis =
      '0x57849733B06147288e3a97b45214fB145c80486a'
    const smartContractUSDT = '0xC5DC2366997A1Db48ed0a909c12c778d717a1859'

    const smartContractAsset0 = '0x4AC7c23dF4e957D4DBF8DEe195B705e24AFFE536'
    const smartContractAsset1 = '0x4a7d6546Ee53F129369fFf073c2b207174a1Ea35'

    let userToken = sessionStorage.getItem('access_token')
      ? sessionStorage.getItem('access_token')
      : localStorage.getItem('access_token')
    createOrderOnServer(userToken)

    // определяем тип предложения и спопособ оплаты
    let typeOfferContract
    let payCurrencyContract
    if (payMethodCryptocurrency == 'Другая криптовалюта') {
      typeOfferContract = 'crypto'
      payCurrencyContract = crypto
    } else {
      typeOfferContract = 'all'
      payCurrencyContract = fiat
    }

    console.log(crypto, payCurrencyContract)
    let minimumLimit = minLimit

    let w3 = new Web3(window.ethereum)

    let contractP2PTrade = new w3.eth.Contract(p2pTrade, smartContractAddress)
    let contractP2PTradeOnChain = new w3.eth.Contract(
      p2pTradeOnChain,
      smartContractAddressOnChaindis,
    )
    let contractUSDT = new w3.eth.Contract(asset, smartContractUSDT)
    let contractAsset0 = new w3.eth.Contract(abiContract0, smartContractAsset0)
    let contractAsset1 = new w3.eth.Contract(abiContract1, smartContractAsset1)
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    const gasPrice = await w3.eth.getGasPrice().then((result) => {
      return result
    })

    console.log(
      tokenOnChain === true && cryptoOnChain === true,
      tokenOnChain,
      cryptoOnChain,
    )
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
