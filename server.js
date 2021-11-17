const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
const errorhandler = require('errorhandler')

require('./config/db');
const routing = require('./routes')

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({
//   secret: 'signedMySession',
//   resave: false,
//   secure: true,
//   name: 'sessionId',
//   saveUninitialized: true,
//   cookie: { 
//     httpOnly: true, 
//     maxAge: 123456789
//   }
// }));


// // routes
app.use(routing);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// Erreur
// if (process.env.NODE_ENV === 'development') {
//   app.use(errorhandler());
// }
app.use((err, req, res, next) => {
  const env = process.env.NODE_ENV
  if (env === 'production') {
    res.status(500).json({
      code: err.code || 500,
      message: err.message 
    })
  } else {
    res.status(500).json({
      code: err.code || 500,
      message: err.message,
      stack: err.stack
    })
  }
  // else {
  //   res.status(500).render('error', { 
  //     error: {
  //     code: err.code || 500,
  //     message: err.message,
  //     stack: err.stack
  //     }
  //   })
  // }
});


// server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})