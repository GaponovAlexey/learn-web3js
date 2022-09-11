import { Owner } from './contract/call/Owner'
import { TimestampToConflict } from './contract/call/TimestampToConflict'
import { USD } from './contract/call/USD'

import { ConnectSmartContract } from './contract/write/ConnectSmartContract'
import { TwoWrite } from './contract/write/TwoWrite'

const OrderTest = () => {
  return (
    <div className="mr-10 flex flex-wrap justify-center w-full bg-slate-300">
      <div className="m-3 cursor-pointer">
        <h1 className="text-xl p-4">Write</h1>
        <div onClick={ConnectSmartContract}>connectsmartcontract</div>
        <div onClick={TwoWrite}>TwoWrite</div>
      </div>
      <div className="m-3 cursor-pointer">
        <h1 className="text-xl p-4">Call</h1>
        <div className='' onClick={USD}>USD</div>
        <div onClick={TimestampToConflict}>TimestampToConflict</div>
        <div onClick={Owner}>Owner</div>
      </div>
    </div>
  )
}

export default OrderTest
