var mongoose=require('mongoose');
const feedSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    feedback:{
        type:Number,
        required: true
    },
    feedback_count:{
        type: Number,
        required: true
    }
});

const Feedback=mongoose.model('feedback', feedSchema);
module.exports=Feedback;