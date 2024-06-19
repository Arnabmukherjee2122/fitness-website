const mongoose = require ('mongoose')
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    FirstName :String,
    LastName :String ,
    Email:String,
    Age:Number,
    Weight:Number,
    Height:Number,
    Password :String,
    ConfirmPassword:String,
    

})
const user =new mongoose.model('user',userSchema)
module.exports=user
