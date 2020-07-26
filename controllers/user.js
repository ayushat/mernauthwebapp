const User = require("../models/user");


exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            res.status(400).json({
                error:"No user was found in DB."
            });
        }
        req.profile = user;
        next();
    });

}

exports.getUser = (req,res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set:  req.body},
            {new:true,useFindandModify:false},
            (err,user) => {
                if(err){
                    res.status(400).json({
                        error : "You are not authorized to update this fields."
                    });
                }
                user.salt = undefined
                user.encry_password = undefined
                res.json(user)
            }
        
    )
}