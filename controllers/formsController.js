const Folder = require("../models/folderModel");
const Form = require("../models/formModel");
const Response = require("../models/userResponseModel");


const getForms = async(req,res)=>{
    try {
        
        const folderName = req.body

        const userId = req.data._id

        // console.log("mm",userId);

        // console.log("foldername",folderName);

        const data = await Folder.findOne({userId:userId,name:folderName})

        // console.log("lll",data.forms);

        if(data){   
            res.status(200).json({
                msg:"Folder selected...",
                success:true,
                data:data.forms
            })
        }

        res.status(400)


    } catch (error) {
        console.log(error);
    }
}


const addForms = async(req,res)=>{
    try {
        
        const userId = req.data._id

        const {name,param} = req.body

        console.log("88888",userId,name,param);

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

        console.log("addforms",addForm);




        
    res.status(200).json({
        msg:"Form created successfully",
        success: true
    })     


    } catch (error) {
        console.log(error);
    }


}


// const deleteForm = async(req,res)=>{
//     try {
//         const {formname,foldername} = req.body;
//         const userId = req.data._id

//         // console.log("foldername",foldername);
//         // console.log(formname);

//         res.status(200).json({
//             msg: "delete form",
//             success: true,
//             data: formname
//         })
      
//         Folder.updateOne(
//             { userId: userId,name:foldername  },
//             { $pull: { forms: formname } }
//           )
//             .then(result => console.log("Updated:", result))
//             .catch(err => console.error("Error:", err));

//         const data = await Form.findOne({
//             userId:userId,
//             Formname:formname,
//             Foldername:foldername,
//         })
//         if(data){
//             const data = await Form.findOneAndDelete({
//                 userId:userId,
//                 Formname:formname,
//                 Foldername:foldername,
//             })
//         }

//         const response = await Response.findOne(
//             {userId:userId,
//                 Formname:formname,
//                 Foldername:foldername,}
//         )
        
//         if(response){
//             const data = await Response.findOneAndDelete({
//                 userId:userId,
//                 Formname:formname,
//                 Foldername:foldername,
//             })
//         }

    
//     } catch (error) {
//         console.log(error);
//     }
// }


const deleteForm = async (req, res) => {
    try {
        const { formname, foldername } = req.body;
        const userId = req.data._id;

        // Log the foldername and formname for debugging
        console.log("Foldername:", foldername);
        console.log("Formname:", formname);

        // Remove the form from the Folder collection
        const folderUpdateResult = await Folder.updateOne(
            { userId: userId, name: foldername },
            { $pull: { forms: formname } }
        );
        console.log("Removed form from folder:", folderUpdateResult);

        // Delete the form document if it exists
        const formData = await Form.findOneAndDelete({
            userId: userId,
            Formname: formname,
            Foldername: foldername,
        });
        if (formData) {
            console.log("Deleted form document:", formData);
        }

        // Delete the response document if it exists
        const responseData = await Response.findOneAndDelete({
            userId: userId,
            Formname: formname,
            Foldername: foldername,
        });
        if (responseData) {
            console.log("Deleted response document:", responseData);
        }

        // Respond to the client with success
        res.status(200).json({
            msg: "Form deleted successfully.",
            success: true,
            data: formname,
        });

    } catch (error) {
        console.error("Error deleting form:", error);
        res.status(500).json({
            msg: "An error occurred while deleting the form.",
            success: false,
            error: error.message,
        });
    }
};


module.exports = {getForms,addForms,deleteForm};