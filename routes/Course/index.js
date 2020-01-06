const express = require("express");
const route = express.Router();
const Course = require("../../models/Course");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// Mehtod: Post
// Description: add course
// privilage: Private
route.post("/add", [
  auth,
  [
    check("title", "title is require")
      .not()
      .isEmpty(),
    
 
  ]
],async (req,res) => {
    const {title} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({message:errors.array()});
    }
    try {
        const newCourse = new Course({
            title
        });

        const course = await newCourse.save();
        res.json(course);

    } catch (error) {
        res.status(500).json({message:"Internal server error" + error});
    }
});

// Mehtod: Post
// Description: add course
// privilage: Private
route.put('/subtitle/:id',auth, async (req,res) =>{
    const id = req.params.id;
    const {subtitle} = req.body;
    try {
        const course = await Course.findById(id);
        if(course){
            course.subtitle = subtitle;
         await course.save();
         res.json(course);
        }else{
            return res.status(400).json({message:"course does not exist"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"+ error});
    }
})

module.exports = route;
