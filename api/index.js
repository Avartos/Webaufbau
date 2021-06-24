const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//for better console logging
const morgan = require('morgan');


// #region routes
const threadRoutes = require('./routes/threadRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
// #endregion

//set up express app
const app = express();
app.listen(3001);
app.use(cors());
app.use(bodyParser.json());

//DB connection
require('./config/connection');



//use logger
app.use(morgan('dev'));

// #region routers
// contains the routes that are offered by the api
app.use('/api/threads', threadRoutes);
app.use('/api/users', userRoutes);

// #endregion

// 404 page
app.use((req,res) => {
    res.sendStatus(404)
})