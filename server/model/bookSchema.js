var mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    doc_email:{
        type:String,
        required:true
    },
    client_email:{
        type:String,
        required:true
    },
    client_name:{
        type: String,
        required:true,
    },
    room_name:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});


const User=mongoose.model('booking', bookSchema);

module.exports=User;