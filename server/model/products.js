const mongoose = require("mongoose")

const Products = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    }, 
    Price:{
        type:Number,
        require:true
        
    },
    Quantity:{
        type:Number,
        require:true
    },
    Category:{
        type:String,
        require:true
    },
})

module.exports =mongoose.model('Products',Products)