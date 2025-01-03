const mongoose = require("mongoose")


const formSchema = mongoose.Schema({
    userId:{
        type:String
    },
    Formname:{
        type: String
    },
    Foldername: {
        type:String
    },
    Formdata:[
        {
            type:{type:String},
            name:{type:String},
            value:{type:String},
            id:{type:Number}
        }
    ]
})

const Form = mongoose.model("Form", formSchema)

module.exports = Form;