const mongoose = require("mongoose")

const userResponseSchema = mongoose.Schema({
  
    userId:{
        type:String
    },
    Formname:{
        type:String
    },
    Foldername:{
        type:String
    },
    userResponses:{
        type:[[String]]
    },
    completed:{
        type:Number
    },
    views:{
        type: Number,
        default: 0,
    },
    starts:{
        type: Number,
        default: 0,
    }

})


const Response = mongoose.model("Response", userResponseSchema)


module.exports = Response
