let axios = require('axios')

let getPrices = async (start, end) => {
  url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
  return axios.get(url)

}

module.exports = getPrices



