const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async(req,res)=>{
    
    const allUsers = User.find()
    console.log(allUsers)
    res.render('users/index.ejs', {
        users: allUsers
    })
})




module.exports = router;
