/**
 * Created by zhubg on 2017/10/27.
 */
export default [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_fromAddr",
        "type": "address"
      },
      {
        "name": "_callAIID",
        "type": "uint256"
      },
      {
        "name": "_arg",
        "type": "string"
      }
    ],
    "name": "callFundsFrozen",
    "outputs": [
      {
        "name": "frozenFlag",
        "type": "bool"
      },
      {
        "name": "callID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "status",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
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
        "name": "_callID",
        "type": "uint256"
      },
      {
        "name": "_workerFlag",
        "type": "bool"
      },
      {
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "callFundsDeduct",
    "outputs": [
      {
        "name": "deductFlag",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "registerAddr",
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
        "name": "_consumer",
        "type": "address"
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
    "constant": true,
    "inputs": [],
    "name": "billingAddr",
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
        "name": "_fromAddr",
        "type": "address"
      }
    ],
    "name": "callFundsFrozenBillingTest",
    "outputs": [
      {
        "name": "frozenFlag",
        "type": "bool"
      },
      {
        "name": "callID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_status",
        "type": "uint8"
      },
      {
        "name": "_callID",
        "type": "uint256"
      },
      {
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "callbackAI",
    "outputs": [],
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
        "name": "_callID",
        "type": "uint256"
      },
      {
        "name": "_workerFlag",
        "type": "bool"
      }
    ],
    "name": "callFundsDeductTest",
    "outputs": [
      {
        "name": "deductFlag",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "callAIID",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
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
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "setRegisterAddr",
    "outputs": [],
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
        "name": "_fromAddr",
        "type": "address"
      }
    ],
    "name": "callFundsFrozenRegisterTest",
    "outputs": [
      {
        "name": "addr",
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
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "setBillingAddr",
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
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "saveConsumer",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_registerAddr",
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
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "EventTest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "EventMessage",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_frozenFlag",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "_callID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_id",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "arg",
        "type": "string"
      }
    ],
    "name": "EventFundsFrozen",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_deductFlag",
        "type": "bool"
      }
    ],
    "name": "EventFundsDeduct",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "consumer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "proxy",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_callAIID",
        "type": "uint256"
      }
    ],
    "name": "EventCallFundsFrozen",
    "type": "event"
  }
];