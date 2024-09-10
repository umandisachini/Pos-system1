const express = require("express");
const Controllers = require("../controllers/userController");
const Userrouter = express.Router();

Userrouter.post('/register', Controllers.register);
Userrouter.post('/login', Controllers.login);
Userrouter.get('/users', Controllers.getUsers);
Userrouter.get('/userdata/:id', Controllers.getUserById);
Userrouter.put('/updateusers/:id', Controllers.updateUser);
Userrouter.delete('/deleteusers/:id', Controllers.deleteUser);

module.exports = Userrouter;
