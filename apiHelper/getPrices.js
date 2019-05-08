let axios = require('axios')

let getPrices = (start, end) => {
  url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
  axios.get(url)
  .then((result) => {
    console.log(result)
  })

}

module.exports = getPrices

getPrices('2013-09-01', '2018-09-05')

