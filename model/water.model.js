const mongoose = require('mongoose');

const WaterTrackSchema = new mongoose.Schema({
   
    waterAmount:{
        type:Number,

    },
    email:{
        type:String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WaterTrack = mongoose.model('WaterTrack', WaterTrackSchema);

module.exports=WaterTrack;