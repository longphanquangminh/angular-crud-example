const express = require('express');
const app = express();
const port = 3000;

//Enable CORS
const cors = require('cors');
app.use(cors());

//Http Request Logger
// const morgan = require('morgan');
// app.use(morgan('combined'));

// Connect to DB
const db=require('./config/db');
db.connect();

//Parsing data received from client
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// //Import model
// const Product = require('./models/Product');

// //Routing Config
// app.get('/', (reg,res) => {
//     res.send('Hello');
// })

// //GET /products
// app.get('/products', (reg,res) => {
//     // Trả về dữ liệu mẫu?
//     // let data = [
//     //     {productCode: 1, productName: "Heineken", productPrice: 19000},
//     //     {productCode: 2, productName: "Tiger", productPrice: 18000},
//     //     {productCode: 3, productName: "Sapporo", productPrice: 21000}
//     // ];
//     // res.send(data);

//     //Đọc dữ liệu từ db
//     //Cách 1:
//     // Product.find({}, (error, data)=>{
//     //     if(error){
//     //         res.json({"Error": error.message});
//     //     }else{
//     //         res.json(data);
//     //     }
//     // })
    
//     //Cách 2: Promise
//     Product.find({})
//     .then(data => {res.json(data)})
//     .catch(error=>{res.json({"Error":error.message}) })
// })

//Import Example Routing
const exampleRouter = require('./routes/example.router');
app.use('/', exampleRouter);

app.listen(port, () => {
    console.log(`My server listening on port ${port}`);
});
