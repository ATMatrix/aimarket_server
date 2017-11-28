const RaidenClient = require("./raidenClient")

let raiden = new RaidenClient('http://106.14.207.120:5001')
let raiden2 = new RaidenClient('http://106.14.207.120:5002')

raiden.address().then(function (res) {
    console.log(res.body)
}).catch(function (error) {
    console.log(error.body)
})
raiden2.address().then(function (res) {
    console.log(res.body)
}).catch(function (error) {
    console.log(error.body)
})