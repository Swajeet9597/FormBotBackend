const mongoose = require("mongoose")


const folderSchema = mongoose.Schema({
    name:{
        type:String
    },
    userId:{
        type: String
    },
    folder:[String],
    forms:[String]
})


const Folder = mongoose.model("Folder", folderSchema)


module.exports = Folder






