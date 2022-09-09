import axios from "axios"

export const CreateOrder = (userToken) => {
  let typeOfferContract
  let payCurrencyContract
  let orderId
  let contract_type
  orderId = null

  contract_type = 'p2p_onchain'
  contract_type = 'p2p_simple'

  typeOfferContract = 'crypto'
  payCurrencyContract = crypto
//   typeOfferContract = 'all'

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
      payment_type: 'crypto',
      asset0: 0x4ac7c23df4e957d4dbf8dee195b705e24affe536,
      asset1: 0x4a7d6546ee53f129369fff073c2b207174a1ea35,
      min_to_buy: 1,
      ratio: 200,
      ratio0: 200, // Оценка продажи
      ratio1: 200, // Оценки покупки
      ratio_currency_to_usd: 200,
      amount_asset0: 200, // Кол-во токенов
      currency: 'USD',
      sign_contract_from: 'front',
      contract_type: 'p2p_simple',
      contract_order_id: 2147483647,
    },
  })
    .then((response) => {
        console.log(response)
    //   setAdv(response.data.id)
    //   connect_server_contract(response.data.id)
    })
    .catch((error) => {
      console.log('ERRRR:: ', error)
    })
}
