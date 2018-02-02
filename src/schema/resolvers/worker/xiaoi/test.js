const Q = require('./index.js')
const config = {
  "APP_KEY": "0MsaHPtJA8M5",
  "APP_SECRET": "auVSuMpW5AY5eJUdGe53"
}
const q = new Q(config)

q.query({ question: '你是谁？' }).then(console.log, console.log)
