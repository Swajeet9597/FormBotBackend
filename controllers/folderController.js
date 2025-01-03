// const Folder = require("")

const Folder = require("../models/folderModel");
const { use } = require("../routes/userRoutes");


const createrootFolder = async(req,res)=>{
    try {
        // console.log("create root");
        res.status(200).json({success: true})
    
        const userId = req.data._id;
        // console.log("idcreate",userId);

        const rootExist = await Folder.findOne({
            userId: userId,
            name: "root"
        })

        if(rootExist){
            // console.log("exist");
            return res.status(201).json({
                msg:"Root exists"
            })
        }
            // console.log("not exist");
            const addRoot = new Folder({
                name:"root",
                userId: userId
            })

            addRoot.save()

           


    } catch (error) {
        
    }
}


const addFolder = async(req,res)=>{
    try {
        const {name} = req.body

        const userId = req.data._id

        console.log(",,,,,,,,,",userId);

        

     const folderExist = await Folder.findOne(
        { userId: userId,
        folder: name } 
      )

      console.log("folderexist",folderExist);

      
     if(folderExist){
        return res.status(400).json({
            msg:"This name of folder already exists..",
            success: false
        })
     }

     const rootFolderExists = await Folder.findOne({userId:userId,name:name})




     if(!rootFolderExists){
        const addf = new Folder({
            userId:userId,
            name:name
        })
        addf.save()
     }
     
     const folderr = await Folder.updateOne(
        { userId: userId }, 
        { $push: { folder: name } }               
      )

    res.status(200).json({
        msg:"Folder created successfully",
        success: true
    })        

    } catch (error) {
        console.log(error);
    }
     
}

const getFolder =async(req,res)=>{
    try {
        const userId = req.data._id
        const data = await Folder.findOne({userId:userId,name:"root"})
        // console.log("ooo",data);
        res.status(200).json({
            data: data,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteFolder = async(req,res)=>{
    try {
        const name = req.body;
        const userId = req.data._id
      
        Folder.updateOne(
            { userId: userId },
            { $pull: { folder: name } }
          )
            .then(result => console.log("Updated:", result))
            .catch(err => console.error("Error:", err));

         Folder.deleteOne({
            userId: userId,
            name: name
        }).then(result => console.log("Updated delete:", result))
        .catch(err => console.error("Error delete:", err));

        // console.log(del);
        res.status(200).json({
            msg:"Folder deleted successfully...",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addFolder,getFolder,deleteFolder,createrootFolder};