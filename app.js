require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const employeesRouter = require('./routes/employees');

const usersRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);

app.use('/api', employeesRouter);

app.use('/users', usersRouter);

app.use((req, res, next) => { // poner al final
    res.status(404).json({
        msg: 'Endpoint Not Found'
    })
})


app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
