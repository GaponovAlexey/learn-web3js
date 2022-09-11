import { useState } from 'react'

const CreateOrderForm = () => {
  const [method, setMethod] = useState('buy')
  const [sell, setSell] = useState('')
  const [buy, setBuy] = useState('')
  

  return (
    <div className="bg-slate-400">
      <div className="inline flex-wrap">
        <div className="selorby">
          <input value={method} placeholder="method sell or buy" />
        </div>
        <div className="what do you sell">
          <input
            value={sell}
            onChange={(e) => setSell(e.target.value)}
            type="text"
            placeholder="what do you sell"
          />
        </div>
        <div className="what do you buy">
          <input  placeholder="what do you buy" />
        </div>
        <div className="div">
          <input placeholder="minBuy or minSell" />
        </div>
        <div className="rate">
          <input placeholder="rate your sell token " />
        </div>
        <div className="rate">
          <input placeholder="rate1 your sell token" />
        </div>
        <div className="rate">
          <input placeholder="usd" />
        </div>
        <div className="rate">
          <input placeholder="curse usd" />
        </div>
        <div className="rate">
          <input placeholder="rate1 your sell token" />
        </div>
      </div>
    </div>
  )
}

export default CreateOrderForm

// createOrder
// Позволяет создать Order пользователю. Необходимо ввести:
//         string memory method, //   sell or buy
//         string memory Asset 0, // Первый актив в ордере, то что продаёт поставщик, например BTC (адрес смарт контракта токена)
//         string memory Asset 1, //Второй актив в ордере, то что поставщик хочет купить, например USDT (адрес смарт контракта токена)
//         uint256 mintoBuy,  // минимальное для покупки
//         uint256 ratio0, за сколько продаёт по отношению к долару
//         uint256 ratio1,
//         string memory Currensy, к чему расчитвываем валюта сделки USD
//         uint256 ratioCurrensyToUSD,  курс доллара
//         uint256 amountAsset0 , сколько Asset0 выставлено на продажу (указывать как x * 10 ** 18)
// Значение см. в разделаях orderInfo и orderData
// вытащить Id сделки посдене
