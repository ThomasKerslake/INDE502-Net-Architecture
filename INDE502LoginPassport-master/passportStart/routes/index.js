const express = require('express');
const router = express.Router();

router.get('/', (rec, res) =>{
  res.render('home');
})

module.exports = router;
