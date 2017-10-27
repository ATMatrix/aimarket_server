export default [
  {
    "constant": true,
    "inputs": [
      {
        "name": "aiName",
        "type": "bytes32"
      }
    ],
    "name": "isRegistered",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "aiName",
        "type": "bytes32"
      },
      {
        "name": "billingAddr",
        "type": "address"
      }
    ],
    "name": "setBillingAddr",
    "outputs": [],
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
        "name": "aiName",
        "type": "bytes32"
      }
    ],
    "name": "deleteAI",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "aiName",
        "type": "bytes32"
      },
      {
        "name": "billingAddr",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "aiName",
        "type": "bytes32"
      }
    ],
    "name": "getBillingAddr",
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
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "aiName",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "billingAddr",
        "type": "address"
      }
    ],
    "name": "EventRegister",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "aiName",
        "type": "bytes32"
      }
    ],
    "name": "EventDelete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "aiName",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "billingAddr",
        "type": "address"
      }
    ],
    "name": "EventSet",
    "type": "event"
  }
];