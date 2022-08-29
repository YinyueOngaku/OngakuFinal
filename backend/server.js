var createError = require('http-errors');
var express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var bandRouter = require('./routes/band');
var chatRouter = require('./routes/chat');
const cors = require('cors');
require('dotenv').config();

var app = express();
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@blueocean.5pe6ny1.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
},
()=> {
  console.log('Mongoose Is Connected')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(session({
  secret: "secretcode",
  resave:true,
  saveUninitialized: true
}))

app.use(cookieParser('secretCode'));
app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/band', bandRouter);
app.use('/chat', chatRouter);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../frontend/client/dist'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const httpServer = createServer(app);
const io = new Server(httpServer, {   cors:{
  origin:'localhost:3000',
}});


io.on('connection', function(socket) {
  // console.log('connected socket!', socket.id);
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log('join room ', data)
  })

  socket.on('leave_room', (data) => {
    socket.leave(data);
    console.log('leave room ', data)
  })
  socket.on('send_message', (data) => {
    const sendTime = new Date().toString().slice(0,24);
    const newData = {...data, time: sendTime}
    console.log('server side: ', newData)
    socket.to(newData.chatroom).emit('receive_message', newData)
    // socket.broadcast.emit('receive_message', newData)
  })
});

port = process.env.PORT || 3005

httpServer.listen(port, () => {
  console.log(`app listening on port ${port}!`)
});



// port = process.env.PORT || 3005

// app.listen(port, function () {
//   console.log(`app listening on port ${port}!`);
//  });
module.exports = app;
