const express = require("express")
const auth = require("../controllers/userController")
const folder = require("../controllers/folderController")
const forms = require("../controllers/formsController")
const formData = require("../controllers/formsDataController")
const authToken = require("../middleware/authToken")
const clearCookie = require("../controllers/clearCookie")
const Form = require("../models/formModel")
const Folder = require("../models/folderModel")
const Response = require("../models/userResponseModel")

const router = express.Router()


router.post("/checkLogin",authToken,auth.checkLogin)
router.post("/addUser", auth.addUser)
router.post("/checkUser", auth.checkUser)
router.post("/createrootFolder",authToken,folder.createrootFolder)
router.post("/addFolder",authToken,folder.addFolder)
router.get("/getFolder",authToken,folder.getFolder)
router.patch("/deleteFolder",authToken,folder.deleteFolder)
router.patch("/deleteForm",authToken,forms.deleteForm)
router.get("/getDetails",authToken, auth.getDetails)
router.post("/clearCookie",clearCookie)
router.post("/getForms",authToken, forms.getForms)
router.post("/addForms",authToken,forms.addForms)
router.patch("/updateInfo",authToken,auth.updateInfo)
router.post("/createWorkspace",authToken,auth.createWorkspace)
router.post("/addWorkspace",authToken,auth.addWorkspace)
router.post("/addWorkspacebylink",authToken,auth.addWorkspacebylink)
router.get("/getWorkspace",authToken,auth.getWorkspace)
router.post("/getMode",authToken,auth.getmode)

router.post("/addFormData",authToken,formData.addFormData)
router.post("/getFormData", authToken,formData.getFormData)
router.post("/getFormDataForSubmit",formData.getFormDataForSubmit)

router.post("/saveUserResponse",formData.saveUserResponse)
router.post("/getSaveUserResponse",authToken,formData.getSaveUserResponse)

router.post("/getFormDataForResponse",authToken,formData.getFormDataForResponse)

router.post("/addViews",formData.addViews)
router.post("/addStarts",formData.addStarts)
router.post("/reduceStarts",formData.reduceStarts)

router.post("/createResponseDoc",authToken,formData.createResponseDoc)

router.post("/updatedFormname",authToken, async(req,res)=>{
    try {
        // console.log("UpdatedName",req.body,req.data._id);
        const {folderName,anotherUserId,formName,updatedName} = req.body
        let userId = req.data._id
        if(anotherUserId){
            userId = anotherUserId
        }

        const update = await Form.updateOne(
            {userId:userId,Formname:formName,Foldername:folderName},
            {$set:{Formname:updatedName}}
        ) .then(result => console.log("Updated:", result))
        .catch(err => console.error("Error:", err));

// console.log(formName);

const removeResult = await Folder.updateOne(
    { userId: userId, name: folderName },
    { $pull: { forms: formName } }
);
// console.log("Removed old form:", removeResult);

// Step 2: Add the new value
const addResult = await Folder.updateOne(
    { userId: userId, name: folderName },
    { $push: { forms: updatedName } }
);

// console.log("Added new form:", addResult);


const updateFormNameResponse = await Response.updateOne(
    {userId:userId,Formname:formName,Foldername:folderName},
    {$set:{Formname:updatedName}}
    )
    console.log("Added new form:", updateFormNameResponse);


    res.status(200)


    } catch (error) {
        console.log(error);
    }
})




module.exports = router;

