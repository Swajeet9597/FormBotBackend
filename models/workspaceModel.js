const mongoose = require("mongoose")




const workspaceSchema = mongoose.Schema({
    userId: {
        type: String
    },
    workspaces: [
        {
            username:{type:String},
            userId:{type:String},
            mode:{type:String}
        }
    ]
})



const Workspace = mongoose.model("Workspace", workspaceSchema)

module.exports = Workspace;