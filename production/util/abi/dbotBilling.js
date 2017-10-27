"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by zhubg on 2017/10/27.
 */
exports.default = [{
  "constant": false,
  "inputs": [{
    "name": "_callID",
    "type": "uint256"
  }, {
    "name": "_from",
    "type": "address"
  }],
  "name": "getPrice",
  "outputs": [{
    "name": "_fee",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_newController",
    "type": "address"
  }],
  "name": "changeController",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_callID",
    "type": "uint256"
  }],
  "name": "unfreezeToken",
  "outputs": [{
    "name": "isSucc",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_callID",
    "type": "uint256"
  }],
  "name": "deductFee",
  "outputs": [{
    "name": "isSucc",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_callID",
    "type": "uint256"
  }],
  "name": "freezeToken",
  "outputs": [{
    "name": "isSucc",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_callID",
    "type": "uint256"
  }],
  "name": "billing",
  "outputs": [{
    "name": "isSucc",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "inputs": [{
    "name": "_att",
    "type": "address"
  }, {
    "name": "_beneficiary",
    "type": "address"
  }, {
    "name": "_billingType",
    "type": "uint256"
  }, {
    "name": "_arg0",
    "type": "uint256"
  }, {
    "name": "_arg1",
    "type": "uint256"
  }],
  "payable": false,
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_callID",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_gas",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_from",
    "type": "address"
  }],
  "name": "Billing",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_callID",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_gas",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_price",
    "type": "uint256"
  }],
  "name": "GetPrice",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_callID",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_gas",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_tokens",
    "type": "uint256"
  }],
  "name": "FreezeToken",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_callID",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_gas",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_fee",
    "type": "uint256"
  }],
  "name": "DeductFee",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_callID",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_gas",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_fee",
    "type": "uint256"
  }],
  "name": "UnfreezeToken",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_value",
    "type": "uint256"
  }],
  "name": "Allowance",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_beneficiary",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "WithdrawProfit",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "_oldController",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_newController",
    "type": "address"
  }],
  "name": "ChangedController",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}];