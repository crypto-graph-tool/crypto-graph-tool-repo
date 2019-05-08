const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const getPrices = require('../apiHelper/getPrices.js')

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/getPrices', (req, res) => {
    getPrices('2018-04-01', '2018-05-05').then(result => {
      let data = result.data.bpi
      var data1 = [],
          data2 = [],
          final = []
    
      for (var property in data) {
    
        if (!data.hasOwnProperty(property)) {
            continue;
        }
        data1.push(property);
        data2.push(data[property]);
        final = [data1,data2]
      }
      res.send(final)
    })
})

app.listen(port, () => console.log(`listening on port ${port}!`));