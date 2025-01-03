const Form = require("../models/formModel");
const Response = require("../models/userResponseModel");


const addFormData = async(req,res)=>{
    try {
        
        let userId = req.data._id

        

        const {formData, folderName, anotherUserId,formName} = req.body

        if(anotherUserId){
            userId=anotherUserId
        }
        
        // console.log(formData, folderName,userId,formName);



        const chack = await Form.findOne(
            {userId:userId,Formname:formName,Foldername:folderName}
        )

        if(chack){
            const d =  await Form.findOneAndDelete(
                {userId:userId,Formname:formName,Foldername:folderName}
            )
            // console.log("form is updated....");
        }

        const addData = new Form ({
            userId:userId,
            Formname:formName,
            Foldername: folderName,
            Formdata:formData
        })

        addData.save()

        res.status(200).json({
            msg:"Form saved Successfully...",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}




const getFormData = async(req,res)=>{
    try {
        
        // console.log("gettttt");

        let userId = req.data._id;
        
        const {formName,folderName,anotherUserId} = req.body

        if(anotherUserId){
            userId = anotherUserId
        }

        // console.log("getformdata",formName,folderName,anotherUserId,userId);

        const data = await Form.findOne(
            {userId:userId,Formname: formName,Foldername:folderName}
        )

        // console.log("dete", data.Formdata);

        if(data){

            
            return res.status(200).json({
                msg:"data fetched..",
                success: true,
                data: data.Formdata
            })
        }
        res.status(400)


    } catch (error) {
        console.log(error);
    }
}

const getFormDataForSubmit = async(req,res)=>{

    try {
        

        
        const {formName,folderName,anotherUserId} = req.body


         const userId = anotherUserId

        //  console.log("sjs",userId);
    

        // console.log("getformdata",formName,folderName,anotherUserId,userId);

        const data = await Form.findOne(
            {userId:userId,Formname: formName,Foldername:folderName}
        )

        // console.log("dete", data.Formdata);

        if(data){

            
            return res.status(200).json({
                msg:"data fetched..",
                success: true,
                data: data.Formdata
            })
        }

        res.status(400)


        // console.log(data);


    } catch (error) {
        console.log(error);
    }

}

const createResponseDoc = async(req,res)=>{
    try {
        
            // console.log("creterespo",req.body);
            const {folderName,anotherUserId,formName} = req.body

            if(anotherUserId){
            const find = await Response.findOne({
                userId:anotherUserId,
                Formname:formName,
                Foldername:folderName
            })

            if(!find){
                console.log("lllplplplplp");
                const addRoot =  new Response({
                    userId:anotherUserId,
                    Formname:formName,
                    Foldername:folderName
                })
        
                addRoot.save()
                    .then((res)=>console.log(res))
                    .catch((err)=>console.log(err))
            }else{

                console.log("finddd");
            }
        }
        res.status(200)

    } catch (error) {
        console.log(error);
    }
}

const saveUserResponse = async(req,res) =>{
    try {
        
        const {userId,arr,folderName,formName} = req.body
        // console.log("lklklklklklkl",userId,arr,folderName,formName)

        const checkExist = await Response.findOne({
            userId:userId,
            Formname:formName,
            Foldername:folderName
        })

        if(checkExist){
            const addNewResponse = await Response.updateOne(
                { userId:userId,
                    Formname:formName,
                    Foldername:folderName},
                    {$push:{userResponses:arr}, $inc:{completed:1}},

            )
            return res.status(200)
        }

        const addUserResponse = new Response({
            userId:userId,
            Formname:formName,
            Foldername:folderName,
            userResponses:arr,
            completed: 1
        })

        addUserResponse.save()
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))

        res.status(200)
        

    } catch (error) {
        console.log(error);
    }
}


const getSaveUserResponse = async(req,res)=>{
    try {

        let userId = req.data._id
        
        // console.log("getSavedata",req.body,userId);

        const {foldername,formname,anotherUserId} = req.body

        if(anotherUserId){
            userId = anotherUserId
        }

        const data = await Response.findOne({
            userId:userId,
            Formname:formname,
            Foldername:foldername
        })

        if(data){
            res.status(200).json({
                msg:"data fetched..",
                success: true,
                data:data
            })
        }

        res.status(400).json({
            msg:"data not fetched..",
            success:false
        })

        // console.log("datatata",data.userResponses);

    } catch (error) {
        console.log(error);
    }
}

const getFormDataForResponse = async(req,res) =>{
    try {
        
        let userId = req.data._id

        const {formName,folderName,anotherUserId} = req.body

        // console.log("mmmmmmmmmmmmmmmm",req.body);

        if(anotherUserId){
            userId = anotherUserId
        }

        const data = await Form.findOne(
            {userId:userId,Formname: formName,Foldername:folderName}
        )

        // console.log("dete", data.Formdata);

        if(data){

            
            res.status(200).json({
                msg:"data fetched..",
                success: true,
                data: data.Formdata
            })
        }
        res.status(400).json({
            msg:"data not fetched..",
            success:false
        })

    } catch (error) {
        
    }
}


const addViews = async(req,res)=>{
    try {
        
        // console.log("addViewspopop",req.body);

        const {formName,folderName,anotherUserId} = req.body

        const addViews = await Response.updateOne(
            {userId:anotherUserId,Formname:formName,Foldername:folderName},
            {$inc:{views:1}}
        )

        res.status(200).json({
            msg:"Views add",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


const addStarts = async(req,res)=>{
    try {
        
        const {formName,folderName,userId} = req.body

        const addViews = await Response.updateOne(
            {userId:userId,Formname:formName,Foldername:folderName},
            {$inc:{starts:1}}
        )

        res.status(200).json({
            msg:"Starts add",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {addStarts,createResponseDoc,addViews,getFormDataForResponse,getSaveUserResponse,saveUserResponse,getFormDataForSubmit,addFormData,getFormData}