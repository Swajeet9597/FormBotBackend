const express = require("express")
const router = express.Router()

const anotherWorkspace = require("../controllers/anotherWorkspaceController")
const { route } = require("./userRoutes")

router.post("/getAnotherworkspacefolder",anotherWorkspace.getAnotherworkspacefolder)
router.patch("/deleteFolderanother",anotherWorkspace.deleteFolderanother)
router.post("/addFolderToAnother",anotherWorkspace.addFolderToAnother)
router.post("/getAnotherworkspaceform",anotherWorkspace.getAnotherworkspaceform)
router.post("/addFormsAnother",anotherWorkspace.addFormsAnother)
router.patch("/deleteFormAnother",anotherWorkspace.deleteFormAnother)



module.exports = router;   