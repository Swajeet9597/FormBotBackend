const jwt = require("jsonwebtoken")

const authToken = async(req,res,next)=>{

        try {
            
            const token = req.cookies?.token;
            
            // console.log("token",token);

            if(!token){
                return res.status(400).json({
                    msg: "User is not logged in",
                    error: true,
                    success: false
                })
            }

            jwt.verify(token,"hsdhvhsjdcsdf",(err,decode)=>{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        msg: "Invalid token"
                    })
                }
                req.data = decode

                next()
            })
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error"
            });
        }

}

module.exports = authToken;