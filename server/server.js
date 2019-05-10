const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const bodyParser = require('body-parser');
const getPrices = require('../apiHelper/getPrices.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/getPrices', (req, res) => {
  let start = req.body.start
  let end = req.body.end
    getPrices(start, end).then(result => {
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