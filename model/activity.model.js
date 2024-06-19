// models/activity.model.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    elapsedTime: {
        type: Number,
        required: true
    },
   selectedActivity:{
        type:String,
        required: true
    },
    name:{
        type:String,
       
    },
    distance:{
        type:Number,
        required:true
    },
    steps:{
        type:Number,
        required:true
    },
    heartPoints:{
        type:Number,
        required:true
    },
    email:{
        type:String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
