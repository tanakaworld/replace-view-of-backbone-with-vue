const express = require('express');
const app = express();
const api = require('./api');

app.use('/api', api);

app.use(express.static('dist'));
app.listen(8080, () => console.log('Listening on port 8080!'));
