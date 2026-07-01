const { body }=require("express-validator");
const playerValidation=[
    body("name").notEmpty().withMessage("player name is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("age").isInt({min:6,max:60}).withMessage("age mustbe 6 and 60"),
    body("fideRating").isInt({min:100,max:3600}).withMessage("invalid rating"),
    body("experienceYears").isInt({min:0}).withMessage("must be positive number")

];
module.exports={ playerValidation };
