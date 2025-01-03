const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Workspace = require("../models/workspaceModel");



const checkLogin = async(req,res)=>{
    try {

        const userId = req.data._id

        res.status(200).json({
            success: true,
            data : userId
        })

        
    } catch (error) {
        console.log(error);
    }
}


const addUser = async(req,res)=>{

    try {
        const {name,email,password} = req.body;

        const userExist = await User.findOne({email})
        if(userExist){

           return res.status(400).json({
                msg:"This email is already exist",
                success: false
            })
        }

        const hash_pass = await bcrypt.hash(password, 10)

        let user = new User({
            name: name,
            email: email,
            password: hash_pass
        })

        user.save()
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))

        res.status(200).json({
            msg: "User Sign up successfully....",
            success: true
        })    

    } catch (error) {
        console.log(error);
    }

}



const checkUser = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email})
        // console.log(",,,,",user.password);
        if(!user){
            return res.status(400).json({
                msg: "User is not registered",
                success: false
            })
        }

        const check = await bcrypt.compare(password , user.password)

        if(check){

            const tokenData = {
                _id : user._id,
                email : user.email,
                name: user.name
            }

            const token = await jwt.sign(tokenData, 'hsdhvhsjdcsdf', { expiresIn: 60 * 60 * 10 });

            const tokenOption = {
                httpOnly :true,
                sameSite: "none",
                secure: true
            }

            // const tokenOption = {
            //     httpOnly :true,
            //     sameSite: "lax",
            //     secure: false
            // }

            return res.cookie("token",token,tokenOption).status(200).json({
                msg: "User log in Successfully",
                success: true,
                data:token
            })
        }
        else{
            res.status(400).json({
                msg:"Wrong password",
                success: false
            })
        }



        
    } catch (error) {
        console.log(error);
    }
}

const getDetails = async(req,res)=>{
    try {
        // console.log("fetch",req.data);

        const data = req.data



        // const {name,email,id} = req.data

        res.status(200).json({
            msg:"ssss",data:data
        })
    } catch (error) {
        console.log(error);
    }
}

const updateInfo = async(req,res)=>{
    try {

        // console.log("8412379",req.data._id,req.body);

        const userId = req.data._id

        const userInfo = await User.find({_id:userId})

        // console.log("userrrrrr",userInfo[0].password);

        const {name,email,oldpass,newpass} = req.body

        

        if(oldpass){
            const checkP = await bcrypt.compare(oldpass , userInfo[0].password)
            if(!checkP){
                return res.status(201).json({msg:"Incorrect old pass"});
            }
        }

        

       

        if( name && email && oldpass && newpass){
            const newHashpass = await bcrypt.hash(newpass, 10)
            await User.updateOne(
            {_id:userId},
            {
                $set:{
                    name:name,
                    email:email,
                    password:newHashpass
                }
            }
           )
           return res.status(200).json({
            msg: "All info is updated successfully",
            success: true
           })
        }

        if(name && email){
            // console.log("222222");
            await User.updateOne(
                {_id:userId},
                {
                    $set:{
                        name:name,
                        email:email
                    }
                }
               )
               return res.status(200).json({
                msg: "Name & Email are updated successfully",
                success: true
               })
        }

        if(name){
            await User.updateOne(
                {_id:userId},
                {
                    $set:{
                        name:name
                    }
                }
               )
               return res.status(200).json({
                msg: "Name is updated successfully",
                success: true
               })
        }
        if(email){
            await User.updateOne(
                {_id:userId},
                {
                    $set:{
                        email:email
                    }
                }
               )
               return res.status(200).json({
                msg: "Email is updated successfully",
                success: true
               })
        }
        if(oldpass){
            const newHashpass = await bcrypt.hash(newpass, 10)
            await User.updateOne(
            {_id:userId},
            {
                $set:{
                    password:newHashpass
                }
            }
           )
           return res.status(200).json({
            msg: "Password is updated successfully",
            success: true
           })
        }

        // console.log("33333");
    

    } catch (error) {
        console.log(error);
    }
}


const createWorkspace = async(req,res) =>{
    try {
        
        const userId = req.data._id
        // console.log("userrrr",userId);
        const checkWorkspaceExist = await Workspace.findOne({userId})


        if(checkWorkspaceExist){
            // console.log("exist");
            return res.status(201).json({
                msg:"Root exist"
            })
        }

        // console.log("Not exist",checkWorkspaceExist);

        const createWork = new Workspace ({
            userId:userId
        })


        createWork.save()
            .then((res)=> console.log(res))
            .catch((err)=>console.log(err))

        res.status(200)

        

    } catch (error) {
        
    }
}

const addWorkspace = async(req,res)=>{

    const userId = req.data._id
    const {email,mode} = req.body

    console.log(userId,email);


    const userExist = await User.findOne({email})

    const mainUser = await User.findOne({_id:userId})


    if(!userExist){
        return res.status(404).json({
            msg:"Invalid email please enter correct regestered email",
            success: false
        })
    }

    if(userId === userExist.id){
        return res.status(404).json({
            msg: "This is your email Id send another user's email",
            success: false
        })
    }

   const checkEmailisInvited = await Workspace.findOne({
            userId: userExist.id, 
            workspaces: { $elemMatch: { userId: userId } },
});

if(checkEmailisInvited){
    return res.status(201).json({
        msg:"This user is already invited",
        success: false
    })
}

    const addWork = await Workspace.updateOne(
        { userId: userExist.id }, 
        {
            $push: {
                workspaces: {
                    username: mainUser.name, 
                    userId: userId,
                    mode:mode        
                },
            },
        }
    );

    res.status(200).json({
        msg:"Workspace shared",
        success: true
    })


}

const addWorkspacebylink = async(req,res) =>{
    try {
        
        // console.log("mmmmmmmmmmmm",req.body);

        const {linkClickUser,generatorLinkUser,mode} = req.body

        const user = await User.findOne({_id:generatorLinkUser})

        // console.log("userrr",user);
        
    const decodemode  = Buffer.from(mode, 'base64').toString('utf-8');

    console.log("decodede",decodemode);

        const checkLinkInvited = await Workspace.findOne({
            userId: linkClickUser, 
            workspaces: { $elemMatch: { userId: generatorLinkUser } },
        });

        // console.log(checkLinkInvited);

        if(checkLinkInvited){
            return res.status(201).json({
                msg:"This workpace is already exist",
                success: false
            })
        }

        const addWork = await Workspace.updateOne(
            { userId: linkClickUser }, 
            {
                $push: {
                    workspaces: {
                        username: user.name, 
                        userId: generatorLinkUser,
                        mode:decodemode        
                    },
                },
            }
        );
    
        res.status(200).json({
            msg:"Workspace Added",
            success: true
        })


    } catch (error) {
        console.log(error);
    }
}

const getmode = async(req,res)=>{
    try {
        
        const {userIdAnother} = req.body
        
        const userId = req.data._id
        
        // console.log(userId,userIdAnother);

        const data = await Workspace.findOne(
            {userId:userId,  "workspaces.userId":userIdAnother },
            {
              "workspaces.$": 1
            }
        )

        // console.log(">>>>>>>>",data.workspaces[0].mode);

        if(data){

           return res.status(200).json({
                msg:"mode get...",
                success:true,
                data:data.workspaces[0].mode
            })
        }

        res.status(201)



    } catch (error) {
        console.log(error);
    }
}

const getWorkspace = async(req,res)=>{
    try {
        
        const userId = req.data._id

        // console.log(userId);

        const data = await Workspace.findOne({userId})

        // console.log(data);

        res.status(200).json({
            msg:"workspace get...",
            success:true,
            data:data
        })


    } catch (error) {
        
    }
}

module.exports = {addWorkspacebylink,checkLogin,addUser,checkUser,getDetails,updateInfo,createWorkspace,addWorkspace,getWorkspace,getmode}