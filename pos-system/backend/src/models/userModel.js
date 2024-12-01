const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uuid: { type: String, required: true }, // Changed from userid to uuid for clarity
    type: { type: String, required: true } // 'admin' or 'user'
  });
  

const user = mongoose.model("user",userSchema);

module.exports = user;