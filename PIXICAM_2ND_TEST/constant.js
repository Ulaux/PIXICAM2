export const contractAddress = "0x138e902190a23041a993e5D87963D8bE3030CB50"


export const abi = [
  { "inputs":[], "stateMutability":"nonpayable", "type":"constructor"},
  {
    "anonymous":false,
    "inputs":[{"indexed":false, "internalType":"string", "name":"message", "type":"string"}],
    "name":"LogMessage",
    "type":"event"
  },
  {
    "inputs":[{"internalType":"address", "name":"newOwner", "type":"address"}],
    "name":"addOwner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"addUser",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"},
  {
    "inputs":[{"internalType":"uint256", "name":"row", "type":"uint256"},
    {"internalType":"uint256", "name":"col", "type":"uint256"}],
    "name":"getValuePixel",
    "outputs":[{"internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256", "name":"value", "type":"uint256"}],
    "name":"initializeArray",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256", "name":"row", "type":"uint256"},
    {"internalType":"uint256", "name":"col", "type":"uint256"},
    {"internalType":"uint256", "name":"value", "type":"uint256"}],
    "name":"setValuePixel",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{ "internalType":"uint256", "name":"_money", "type":"uint256"}],
    "name":"store",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256", "name":"_money", "type":"uint256"}],
    "name":"take",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"watch",
    "outputs":[{ "internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
]