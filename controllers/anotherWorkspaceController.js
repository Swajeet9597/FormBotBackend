const Folder = require("../models/folderModel");


const getAnotherworkspacefolder = async(req,res)=>{

    try {


        const {anotherworkspace} = req.body

        const data = await Folder.findOne({userId:anotherworkspace,name: "root"})


        res.status(200).json({
            msg:"fetched",
            success: true,
            data:data
        })

    } catch (error) {
        console.log(error);
    }

}

const deleteFolderanother = async(req,res)=>{

    try {

        const {userId,name} = req.body

        // console.log("==========0",userId,name);
      
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

const addFolderToAnother = async(req,res)=>{
    try {
        
        // console.log("77777777777766666",req.body);

        const {name,userId} = req.body

        const folderExist = await Folder.findOne(
            { userId: userId,
            folder: name } 
          )
    
          
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

const getAnotherworkspaceform = async(req,res)=>{
    try {

        // console.log("../././././",req.body);

        const {userId, name} = req.body

        if(!userId){
            return res.status(200).json({
                msg:"Folder selected...",
                success:false,
            })
        }

        const data = await Folder.findOne({userId:userId,name:name})

        // console.log("lll",data.forms);

        res.status(200).json({
            msg:"Folder selected...",
            success:true,
            data:data.forms
        })
        
    } catch (error) {
        console.log(error);
    }
}


const addFormsAnother = async(req,res)=>{

    try {

        const {name,userId,param} = req.body

        console.log("addaddaddaddadd",name,userId,param);

        const checkForm = await Folder.findOne({
            name:param,
            userId:userId,
            forms:name
        })

        if(checkForm){
            console.log("existsss");
            return res.status(201).json({
                msg:"This name of folder already exists..",
                success: false
            })
        }

        const addForm = await Folder.updateOne(
            {userId:userId,name:param},
            {$push:{forms:name}}
        )

        // console.log("addforms",addForm);


        
    res.status(200).json({
        msg:"Form created successfully",
        success: true
    })     

        
    } catch (error) {
        console.log(error);
    }

}


const deleteFormAnother = async(req,res) =>{
    try {
        
        const {userId,formname,foldername} = req.body

        console.log(userId,formname,foldername);

        Folder.updateOne(
            { userId: userId,name:foldername  },
            { $pull: { forms: formname } }
          )
            .then(result => console.log("Updated:", result))
            .catch(err => console.error("Error:", err));

            const data = await Form.findOne({
                userId:userId,
                Formname:formname,
                Foldername:foldername,
            })

            if(data){
                const data = await Form.findOneAndDelete({
                    userId:userId,
                    Formname:formname,
                    Foldername:foldername,
                })
            }
            
            
          res.status(200).json({
                msg:"Form deleted successfully...",
                success: true
            })

        

    } catch (error) {
        console.log(error);
    }
}




module.exports = {deleteFormAnother,addFormsAnother,getAnotherworkspaceform,getAnotherworkspacefolder,deleteFolderanother,addFolderToAnother}    