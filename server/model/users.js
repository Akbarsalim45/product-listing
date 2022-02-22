const mongoose = require("mongoose")

const Users = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    }, 
    Email:{
        type:String,
        require:true
        
    },
    Password:{
        type:String,
        require:true
    },
    Place:{
        type:String,
        require:true
    },
})

module.exports =mongoose.model('Users',Users)