const express = require('express');
const usersRouter = require('./routers/usersRouter');

const app = express();

var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

require('./configs/database');

app.use('/users', usersRouter)

app.listen(8000);
