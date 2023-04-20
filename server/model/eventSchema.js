var mongoose=require('mongoose');
const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    head:{
        type:String,
        required:true
    },
    embed:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    feedback:{
        type:String
    }
});



const User=mongoose.model('event', eventSchema);
module.exports=User;