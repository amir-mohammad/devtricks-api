const express = require("express");
const route = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Instructor = require('../../models/Instructor');

//description: add Instructor
// privilage: Private
//Method:Post
route.post("/add", [
  auth,
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('email',"email must follow email format").isEmail()  
  ]
],async (req,res)=>{
    const {name,email,degree,pic,resume,socials} = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }

    try {
        const instructor = await Instructor.findOne({email});
        if(instructor){
            return res.status(401).json({message:"Instructor is already exist"});
        }

        const newInstractor = new Instructor({
            name,
            email,
            degree,
            resume,
            pic,
            socials
        });

        const saveInstructor =  await newInstractor.save();
        res.json(saveInstructor);
    } catch (error) {
        
    }





});


//description: get all Instructor
//Privilage: Public
//Method: GET

route.get('/get',async (req,res) =>{
    try {
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (error) {
        res.status(500).json("Internal server err" + error);
    }

  
});

//description: get an Instructor by Id
//Privilage: Public
//Method: GET
route.get('/getById/:id', async (req,res) =>{
   try {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
    if(instructor){
        res.json(instructor);
    }else{
        //put error
    }
    
   } catch (error) {
       res.status(500).json({message:"Internal server errror" + error});
   }
});
//description: get an Instructor by Email
//Privilage: Public
//Method: GET
route.get('/getByEmail/:email', async (req,res) =>{
    try {
     const email = req.params.email;
     const instructor = await Instructor.findOne({email});
     if(instructor){
        res.json(instructor);
     }else{
         //put err
     }
    
    } catch (error) {
        res.status(500).json({message:"Internal server errror" + error});
    }
 });

 //description: update Instructor
//Privilage: Private
//Method: Put
route.put('/update/:id', async (req,res) => {
    const {name,email,resume,socials,degree,pic} = req.body;
    const id = req.params.id;

    try {
        const instructorInstance = await Instructor.findById(id);
        if(!instructorInstance){
                // put err
        }else{
            const update = await Instructor.update({_id:id},{$set:{name,email,socials,resume,pic}});
            res.json({message:"instructor has been updated"});
        }
    } catch (error) {
        res.status(500).json({message:"internal server error" + error});
    }

})

module.exports = route;
