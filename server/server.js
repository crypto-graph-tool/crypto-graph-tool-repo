const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '/../client/dist')));

// app.get('/', (req, res) => {
//     res.send('hello world');
// })

app.listen(port, () => console.log(`listening on port ${port}!`));