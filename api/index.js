const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//for better console logging
const morgan = require('morgan');


// #region routes
const threadRoutes = require('./routes/threadRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const forumRoutes = require('./routes/forumRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const subscribedForumRoutes = require('./routes/subscribedForumRoutes');
const subscribedThreadRoutes = require('./routes/subscribedThreadRoutes');
const favBarRoutes = require('./routes/favBarRoutes');
// #endregion

//jsonwebtoken
const jwt = require('jsonwebtoken');
const sequelize = require('./config/connection');

//set up express app
const app = express();
// app.listen(3001);
app.use(cors());
app.use(bodyParser.json());

//allow access to static files
app.use('/profile_pictures', express.static('static/profile_pictures'));

//DB connection
require('./config/connection');

//use logger
app.use(morgan('dev'));

// #region routers
// contains the routes that are offered by the api
app.use('/api/threads/subscriptions', subscribedThreadRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/forums/subscriptions', subscribedForumRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/favBar', favBarRoutes);
// #endregion

// 404 page
app.use((req, res) => {
    res.sendStatus(404)
})


//chat logic
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`new user with id ${socket.id} connected`);
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    })

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', {
            signal: data.signalData,
            from: data.from,
            name: data.name
        });

    })

    socket.on('answerCall', (data) => {io.to(data.to).emit('callAccepted', data.signal)})
})


server.listen('3001', () => console.log('Server is running on port 5000'));