const expresa = require('express');
const brandController= require('../controllers/brandController');

const brandrouter = expresa.Router();

brandrouter.get('/brands', brandController.getBrands);
brandrouter.get('/getbrand/:id',brandController.getBrandbyId);
brandrouter.post('/createbrands', brandController.createBrand);
brandrouter.put('/updatebrands/:id', brandController.updateBrand);
brandrouter.delete('/deletebrands/:id', brandController.deleteBrand);

export default brandrouter;
