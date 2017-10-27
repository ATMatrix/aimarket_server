/**
 * Created by zhubg on 2017/10/27.
 */
export default [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_callID",
        "type": "uint256"
      },
      {
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "bizAddr",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_arg",
        "type": "string"
      }
    ],
    "name": "callAI",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_bizAddr",
        "type": "address"
      }
    ],
    "name": "addrResolver",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_callID",
        "type": "uint256"
      },
      {
        "name": "result",
        "type": "string"
      },
      {
        "name": "proof",
        "type": "bytes"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "bizAddr",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_callID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "newCallback",
    "type": "event"
  }
]