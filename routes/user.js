
const express = require("express")
const router = express.Router();

const {isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth")
const {getUserById, getUser,updateUser} = require("../controllers/user");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated, getUser)

// to update particular user
router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser)


// to see all user in DB
// router.get("/users",getAllUsers)






module.exports = router