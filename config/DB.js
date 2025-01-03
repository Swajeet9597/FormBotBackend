const mongoose = require("mongoose")
const URI = "mongodb+srv://swajeetdharmadhikari:fWNSjsTDpdF2VyXp@formbot.tvw4u.mongodb.net/?retryWrites=true&w=majority&appName=FormBot"

async function ConnectDB(){
    try {
        await mongoose.connect(URI)
        .then(()=>console.log("Database coneected..."))
        .catch((err)=>console.log(err))
    } catch (error) {
        console.log(error);
    }

}


module.exports = ConnectDB;