const express = require('express');
const convertRoutes = require('./routes/ConvertRoutes');

const app = express();

app.use('/', convertRoutes);

app.listen(3000);