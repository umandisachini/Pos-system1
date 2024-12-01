import brandModel from '../models/brandModel.js'

require("dotenv").config();

const getBrands = async (req, res) => {
    const brands = await brandModel.find();
    res.send(brands);
}

const createBrand = async (req, res) => {
    //console.log("create brand controller called ");
    try {
        const Brand = new brandModel(req.body);
        //console.log(Brand);
        const existingDetail = await brandModel.findOne({brandName: req.body.brandName});
        //console.log(req.body.brandName)
        //console.log(existingDetail);
        if (existingDetail) {
            //console.log(existingDetail);
            return res.status(400).send({ error: 'Brand already exists' });
        }
        //console.log(Brand);
        await Brand.save();
        res.status(201).send("SuccessFully added");
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message });
    }
};

const getBrandbyId = async (req,res) => {
  try {
    const {id} = req.params;
    const brandData = await brandModel.findById(id);
    res.send(brandData);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error : 'Error : ',
      details : error.message
    });
  }
}

const updateBrand = async (req, res) => {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send(brand);
}

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    await brandModel.findByIdAndDelete(id);
    res.send('Brand deleted successfully');
}

export {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    getBrandbyId
}
