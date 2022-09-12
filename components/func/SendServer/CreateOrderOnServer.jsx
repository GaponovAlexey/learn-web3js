const { default: axios } = require('axios')

export const createOrderOnServer = ({
  method, //method
  sell, //asset0
  buy, //asset1
  minToBuy, // minToBuy
  rate0, //r0
  rate1, //r1
  currency,
  ratioCurrensyToUSD,
  tokenSell,
}) => {
  let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmRhZGFkZCIsImlhdCI6MTY2Mjk4OTAzMywibmJmIjoxNjYyOTg5MDMzLCJqdGkiOiJmOWFiNjE5OC0wMzU3LTRmNGEtOGFhYy1iMGM0MWYyYThiYzIiLCJleHAiOjE2NjI5ODk5MzMsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.hs6TfFoZgqF1VtXO2kbPXwuujLssDIkCqFQ-ie-P0pA'
   
  // let typeOfferContract
  // let payCurrencyContract
  let orderId = 2147483647
  let contract_type = 'p2p_simple'
  // if (modalPaymentMethod == 'MetaMask') {
  //   orderId = 2147483647
  // } else {
  //   orderId = null
  // }

  // if (tokenOnChain === true && cryptoOnChain === true) {
  //   contract_type = 'p2p_onchain'
  // } else {
  //   contract_type = 'p2p_simple'
  // }

  // if (payMethodCryptocurrency == 'Другая криптовалюта') {
  //   typeOfferContract = 'crypto'
  //   payCurrencyContract = crypto
  // } else {
  //   typeOfferContract = 'all'
  //   payCurrencyContract = fiat
  // }

  axios({
    method: 'post',
    response: 'json',
    url: `http://195.2.75.109:38001/v1/adv`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    data: {
      payment_type: method?.toUpperCase(),
      asset0: sell?.toUpperCase(),
      asset1: buy?.toUpperCase(),
      min_to_buy: minToBuy,
      ratio: rate0,
      ratio0: rate0, // Оценка продажи
      ratio1: rate1, // Оценки покупки
      ratio_currency_to_usd: ratioCurrensyToUSD, // 
      amount_asset0: tokenSell, // Кол-во токенов
      currency: currency?.toUpperCase(), // USD
      sign_contract_from: 'front',
      contract_type: contract_type,
      contract_order_id: orderId,
    },
  })
    .then((response) => {
      // if (modalPaymentMethod != 'MetaMask') {
      // setAdv(response.data.id)
      // connect_server_contract(response.data.id)
      // }
    })
    .catch((error) => {
      console.log('ERRRR:: ', error)
      // updateToken()
    })
}
