import billModel from "../models/billModel";
import productModel from "../models/productModel";
require("dotenv").config();

const createBill = async (req, res) => {
    try {
      const bill = new billModel(req.body);
      await bill.save();
      res.status(201).send(bill);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message });
    }
};

const getBills = async (req, res) => {
    const bills = await billModel.find();
    res.send(bills);
};

const deleteBill = async (req, res) => {
    const { id } = req.params;
    await billModel.findByIdAndDelete(id);
    res.send('Bill deleted successfully');
}

export {
    createBill,
    getBills,
    deleteBill,
}
