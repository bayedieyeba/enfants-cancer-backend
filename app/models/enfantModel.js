const mongoose = require('mongoose')


const  enfantSchema =  new mongoose.Schema({
    firstName: {
        type : String, required:true
    },
    lastName: {
        type : String, required:true
    },
    parentPhone: {
        type : String,required:true,unique:true
    },
    address: {
        type : String,required:true
    },
    age: {
        type: Number
    }, 
    codeEnfant: {
        type: String, required: true
    },
    typeCancer: {
        type: String
    },
    status: {
        type: String
    },
   
},
    {timestamps:true}
)


const Enfant = mongoose.model("Enfant", enfantSchema)

module.exports =  Enfant