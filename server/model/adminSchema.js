var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});
adminSchema.pre("save",async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})


const User=mongoose.model('admin', adminSchema);
module.exports=User;