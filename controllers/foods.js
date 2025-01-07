const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
        });
    } catch (error) {
        res.redirect('/');
    }

});

router.get('/new', async (req, res) => {

    res.render('foods/new.ejs');
});


router.get('/:foodId', async (req, res) => {
    try {//res.send(`here is your request param: ${req.params.applicationId}`);
    const currentUser = await User.findById(req.session.user._id);
      
    const food = currentUser.pantry.id(req.params.foodId);
    res.render('foods/show.ejs', {
      food: food,
    }); }catch(error){
      console.log(error);
      res.render('/')
    }
  });
router.get('/:foodId/edit', async (req, res) => {
    try {//res.send(`here is your request param: ${req.params.applicationId}`);
    const currentUser = await User.findById(req.session.user._id);
      
    const food = currentUser.pantry.id(req.params.foodId);
    res.render(`foods/edit.ejs`, {
      food: food,
    }); }catch(error){
      console.log(error);
      res.render('/')
    }
  });


  

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/foods`);
    } catch {
        console.log(error);
        res.redirect('/users/userId/foods');
    }
});

router.put('/:foodId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      
      const food = currentUser.pantry.id(req.params.foodId);
      
      food.set(req.body);

      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/foods/${req.params.foodId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });



  router.delete('/:foodId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);

      currentUser.pantry.id(req.params.foodId).deleteOne();
      
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });


module.exports = router;