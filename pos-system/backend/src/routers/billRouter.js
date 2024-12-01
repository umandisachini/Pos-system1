const express = require('express');
const Controllers= require('../controllers/billController');

const Billrouter = express.Router();

Billrouter.post('/createbills', Controllers.createBill);
Billrouter.get('/bills', Controllers.getBills);
Billrouter.delete('/deletebills/:id', Controllers.deleteBill);

module.exports = Billrouter;
