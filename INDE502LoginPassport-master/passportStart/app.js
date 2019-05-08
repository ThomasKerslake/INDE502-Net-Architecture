const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


const db = require('./config/dbconfig').MongoURI;


const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use (
  session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use((req,res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})



app.use((__dirname + '/public', express.static('public')));

mongoose.connect(db,{useNewUrlParser: true})
  .then(console.log('Connected to database'));

app.use('/', require('./routes'));
app.use('/account', require('./routes/account'));

app.listen(port, ()=>{
  console.log('App is listening on port: ' + port);
})
