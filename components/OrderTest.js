import { OneCallContract } from "./contract/call/oncConect";

import { ConnectSmartContract } from "./contract/write/ConnectSmartContract";
import { TwoWrite } from "./contract/write/TwoWrite";

const OrderTest = () => {
  return (
    <div >
      <div>
        <h1 className="text-3xl font-bold underline">write</h1>
        <button onClick={ConnectSmartContract}>connect_smart_contract</button>
        <button onClick={OneCallContract}>connect_CallContractt</button>
      </div>
      <div>
        <h1>call</h1>
        <button onClick={TwoWrite}>TwoWrite</button>
      </div>
    </div>
  );
};

export default OrderTest;
