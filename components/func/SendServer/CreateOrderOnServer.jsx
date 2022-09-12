const axios = require('axios').default;

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
  let userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmRhZGFkZCIsImlhdCI6MTY2Mjk5MDY0MywibmJmIjoxNjYyOTkwNjQzLCJqdGkiOiJkMDQ4MGQyMi0wZDg4LTQ3MWQtODA5NC1mMWEzYWExYWVmYWMiLCJleHAiOjE2NjI5OTE1NDMsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.Jzm6AA0AlgMwEgvw7eVT99u_WX_Ig-FcDQ-r7CK_CiE'
  let orderId = 2147483647
  let contract_type = 'p2p_simple'
  console.log('method',method)
  console.log('sell',sell)
  console.log('buy',buy)
  console.log('minToBuy',minToBuy)
  console.log('rate0',rate0)
  console.log('rate1',rate1)
  console.log('currency',currency)
  console.log('ratioCurrensyToUSD',ratioCurrensyToUSD)
  console.log('tokenSell',tokenSell)
  
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
