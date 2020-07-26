const express = require("express")
const router = express.Router();
const { check } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")

router.post("/signup",[
    check('name',"Fill out a Name that is atleast 3 char long.").isLength({ min:3 }),
    check('email').isEmail().withMessage("Please fill out a valid email.")],
    check('password').isLength({ min: 5 }).withMessage('Fill out a Password that is at least 5 chars long').matches(/\d/).withMessage('Password must contain a number'),
    signup);


router.post("/signin",[
    check('email').isEmail().withMessage("Please fill out a valid email.")],
    check('password').isLength({ min: 5 }).withMessage('Password is required'),
    signin);


router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=> {
    res.send("A Protected Route.")
})


module.exports = router;