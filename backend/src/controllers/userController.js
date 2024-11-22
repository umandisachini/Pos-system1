import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import userModel from "../models/userModel";
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

const secretKey  = generateSecretKey();

//controlllers
const register = async (req, res) => {
    try {
        const { username, password, type } = req.body; // Removed uuid from body
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uuid = uuidv4(); // Generate a new UUID
        const user = new userModel({ username, password: hashedPassword, uuid, type });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) return res.status(404).send('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ uuid: user.uuid, type: user.type }, secretKey);
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, '-password');
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUserById = async(req,res) =>{
  try {
    const {id} = req.params;
    const userdata = await userModel.findById(id);
    res.send(userdata);
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        //console.log("update User")
        // Check if password is being updated
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const user = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.send('User deleted successfully');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export{
    register,
    login,
    getUsers,
    updateUser,
    deleteUser,
    getUserById
}
