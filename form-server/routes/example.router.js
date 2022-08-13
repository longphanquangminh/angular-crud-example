const express = require('express');
const router = express.Router();

//Import model
const Product = require('../models/Product');

//Router config
//Rendering HomePage
router.get('/', (req,res)=>{
    res.send("OK.....");
});

//Get all products
router.get('/products',(req,res)=>{
    Product.find({})
    .then(data=>{res.json(data)})
    .catch(err=>{res.json({"Error":error.message}) })
});

//Get product by id
router.get('/:productId', async(req,res)=>{
    // console.log(req.params.id);
    // res.send("Server received data!");
    try{
        let data = await Product.findById(req.params.productId);
        res.json(data);
    }catch(err){
        res.json({message:err.message});
    }
})

//Insert new product
router.post("/product",async(req,res)=>{
    // console.log("Data from client:", req.body);
    // res.send("Server received data!");
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    try{
        let p = await product.save();
        // res.json({status: 200,data: p});
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
})

//Update product
router.patch("/:id",async(req,res)=>{
    try{
        await Product.updateOne({_id: req.params.id}, {
            $set:{name:req.body.name, price: req.body.price}
        })
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
});

//Delete product
router.delete("/:id",async(req,res)=>{
    try{
        await Product.remove({_id:req.params.id});
        res.json({ message: "success" });
    }catch(err){
        res.json({message:err.message});
    }
})

module.exports = router;