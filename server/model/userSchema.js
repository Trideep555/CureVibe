var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
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
    ban: {
        type:String,
        default:'N'
    }
});
userSchema.pre("save",async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

const User=mongoose.model('user', userSchema);

module.exports=User;