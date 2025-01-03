
const clearCookie = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly :true,
            sameSite: "lax",
            secure: false
        })
        res.status(200).json({
            msg:"Logged out successfully",
            success: true
        })
    } catch (error) {
        
    }
}

module.exports = clearCookie;