var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    file:{
        type:String,
        require:true
    },
    day:{
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
    }
    
});
doctorSchema.pre("save",async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})
const User=mongoose.model('doctor', doctorSchema);

module.exports=User;