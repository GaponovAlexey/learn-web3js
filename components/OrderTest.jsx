import { AC } from './contract/call/ac'
import { Owner } from './contract/call/Owner'
import { TimestampToConflict } from './contract/call/TimestampToConflict'
import { USD } from './contract/call/USD'

import CreateOrderForm from './contract/write/CreateOrderForm'
const hov = 'hover:text-blue-200'
const OrderTest = () => {
  return (
    <div className="mr-10 flex flex-wrap justify-center w-full bg-slate-300">
      <div className="m-3 cursor-pointer">
        <h1 className="text-xl p-4">Write</h1>
        <CreateOrderForm />
      </div>
      <div className="m-3 cursor-pointer ">
        <h1 className="text-xl p-4">Call</h1>
        <div className={hov} onClick={USD}>USD</div>
        <div className={hov} onClick={TimestampToConflict}>TimestampToConflict</div>
        <div className={hov} onClick={Owner}>Owner</div>
        <div className={hov} onClick={AC}>AC</div>
      </div>
    </div>
  )
}

export default OrderTest
