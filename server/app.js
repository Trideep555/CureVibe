var express=require('express');
var cors=require("cors");
var app=express();
app.use(cors());
var bcrypt=require("bcrypt");
app.use(express.json());
var mongoose=require('mongoose');
var user=require('./model/userSchema');
var admin=require('./model/adminSchema');
var events=require('./model/eventSchema');
var doctors=require('./model/doctorSchema');
const bodyParser = require('body-parser');
var book=require('./model/bookSchema');
var feed=require('./model/feedbackSchema');
app.use(bodyParser.json({limit: '16mb', extended: true}));     // Make sure you add these two lines
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}))
mongoose.connect("mongodb://0.0.0.0:27017/CureVibe",(error,client)=>{
  if(error)
  console.log("DB not connected")
 
});
app.post("/admin/ban",async (req,res)=>{
 const {id}=req.body;
 const users=await user.updateOne({"_id":id},{$set:{"ban":"Y"}});
 return res.status(201).json({error : 'Banned'});   
})
app.post("/admin/unban",async (req,res)=>{
    const {id}=req.body;
    const users=await user.updateOne({"_id":id},{$set:{"ban":"N"}});
    return res.status(201).json({error : 'Banned'});   
   })
   app.post("/admin/remove",async (req,res)=>{
    const {id}=req.body;
    try{
        const del=await user.findByIdAndDelete(id);
        return res.status(201).json({error: "Done"});
    }
    catch(err)
    {
        console.log(err);
    }
    return res.status(201).json({error : 'Removed'});   
   })
app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(422).json({error : 'Please fill all the feilds'});
    }
    try{
        const userexist=await user.findOne({email:email});
        if(!userexist)
        {
            const doc=await doctors.findOne({name:email});
            if(!doc){ 
            return res.status(422).json({error : 'No Account with this Email Id  exist.Please Register to Continue'});
            }
            let bool=await bcrypt.compare(password,doc.password);
            if(bool==false)
            {
                return res.status(422).json({error : 'Invalid Password'});
            }
            else{
                return res.status(201).json({error : 'Doctor Logged In Successfully',name:doc.name,type:"doctor"});
            }
        }
        let bool=await bcrypt.compare(password,userexist.password);
        if(bool==false)
        {
            return res.status(422).json({error : 'Invalid Password'});
        }
        else{
            return res.status(201).json({error : 'User Logged In Successfully',name:userexist.name,type:"patient"});
        }
    } catch(err){
        console.log(err);
    }
})
app.post("/feedback",async (req,res)=>{
    const {rating,name}=req.body;
    try{
        const chk=await feed.findOne({name:name});
        
        if(!chk)
        {
            console.log("work");
            const add=new feed({name:name,feedback:rating,feedback_count:1})
            await add.save();
            return res.status(201).json({error:"Feedback Taken"});
        }
        else{
            
            var new_feed=(chk.feedback + rating)/2;
            const up=await feed.updateOne({name:name},{$set:{feedback:new_feed,feedback_count:chk.feedback_count+1}});
            return res.status(201).json({error:"Feedback Taken"});
        }
    }catch(e){
        console.log(e);
    }
    
})
app.post("/book",async (req,res)=>{
    const {name,email,date,time,c_name}=req.body;
    const userfind=await user.findOne({name:{ $regex: c_name }} );
    const em=userfind.email;
    const nm=userfind.name;
    
    const booking=await book.count({email:email,day:date});
    if(booking>4)
    {
        return res.status(422).json({error:"Slot Full"});
    }
    const add=new book({doc_email:email,client_email:em,client_name:nm,room_name:name,day:date,time:time});
    await add.save();
    return res.status(201).json({error:"Booking Successfull"});
})
app.get("/admin/fetchuser",async (req,res)=>{
    try{
        const data=await user.find({});
        return res.status(201).json({data:data});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.get("/admin/event",async (req,res)=>{
    try{
        const data=await events.find({});
        const rating=await feed.find({});
        return res.status(201).json({data:data,rating:rating});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.get("/admin/doctor",async (req,res)=>{
    try{
        const data=await doctors.find({});
        return res.status(201).json({data:data});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.post("/admin/eventdel",async (req,res)=>{
    const {id}=req.body;
    try{
        const del=await events.findByIdAndDelete(id);
        return res.status(201).json({error: "Done"});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.post("/admin/docdel",async (req,res)=>{
    const {id}=req.body;
    try{
        const del=await doctors.findByIdAndDelete(id);
        return res.status(201).json({error: "Done"});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.post("/admin/eventedit",async (req,res)=>{
    const {id,name,head,embed,date,time,desc}=req.body;
    try{
        const eve=await events.updateOne({"_id":id},{$set:{"name":name,"head":head,"embed":embed,"date":date,"time":time,"desc":desc}});
        if(!eve)
        {
            return res.status(422).json({error : 'wrong id'});
        }
        else{
            return res.status(201).json({error : "Event Edited Successfully"});
        }
    } catch(err){
        console.log(err);
    }
})
app.post("/admin/docedit",async (req,res)=>{
    const {id,name,email,desc,convertedImage,value,nums} = req.body;
    console.log("API CALL RECEIVED");
    try{
            const eve=await doctors.updateOne({"_id":id},{$set:{"name":name,"email":email,"day":nums,"time":value,"desc":desc,"file":convertedImage}});
        if(!eve)
        {
            return res.status(422).json({error : 'wrong id'});
        }
        else{
            return res.status(201).json({error : "Doctor Edited Successfully"});
        }
    } catch(err){
        console.log(err);
    }
})
app.post("/admin/eventsearch",async (req,res)=>{
    const {id}=req.body;
   
    try{
        const eve=await events.find({"_id":id});
        if(!eve)
        {
            return res.status(422).json({error : 'wrong id'});
        }
        else{
            return res.status(201).json({data : eve[0]});
        }
    } catch(err){
        console.log(err);
    }
})
app.post("/admin/docsearch",async (req,res)=>{
    const {id}=req.body;
   
    try{
        const eve=await doctors.find({"_id":id});
        if(!eve)
        {
            return res.status(422).json({error : 'wrong id'});
        }
        else{
            return res.status(201).json({data : eve[0]});
        }
    } catch(err){
        console.log(err);
    }
})
app.post("/admin/eventadd",async (req,res)=>{
    const {name,head,embed,date,time,desc}=req.body;
    if(!name || !head || !embed || !time || !desc || !date)
    {
        return res.status(422).json({error : 'Please fill all the feilds'});
    }
    try{
        const eventexist=await events.findOne({name:name});
        if(eventexist)
        {
            return res.status(422).json({error : 'Event Already Exist'});
        }
        
        const event=new events({name,head,embed,date,time,desc});
        await event.save();
        return res.status(201).json({error : 'Event Added Successfully'});
    }catch(err)
    {
        console.log(err);
    }

})

app.post("/admin/adddoctor",async (req,res)=>{
    const {name,email,desc,convertedImage,value,nums} = req.body;
    //console.log(file);
    if(!name || !desc || !email || !convertedImage || !value || !nums)
    {
        
        return res.status(422).json({error : 'Please fill all the feilds'});
    }
    try{
        const docexist=await doctors.findOne({email:email});
        if(docexist)
        {
            return res.status(422).json({error : 'Doctor Already Exist'});
        }
        const password=email;
        const doc=new doctors({name:name,email:email,password:password,file:convertedImage,day:nums,time:value,desc:desc});
        await doc.save();
        return res.status(201).json({error : 'Doctor Added Successfully'});
    }catch(err)
    {
        console.log(err);
    }
    
});
app.post("/currentuser",async (req,res)=>{
    const {name}=req.body;
    const users=await user.findOne({name:{ $regex: name }} );
    if(users)
    return res.status(201).json({data:users });
    const doc=await doctors.findOne({name:{ $regex: name } });
    return res.status(201).json({data:doc});
})
app.post("/currentbook",async (req,res)=>{
    const {name}=req.body;
    const users=await book.find({client_name:{ $regex: `${name}` }} );
    
    if(users.length!=0)
    return res.status(201).json({data:users});
    
    const doc=await book.find({room_name:name});
    return res.status(201).json({data:doc});
})
app.post("/register",async (req,res)=>{
    const {fname,lname,email,password} = req.body;
    if(!fname || !lname || !email || !password)
    {
        
        return res.status(422).json({error : 'Please fill all the feilds'});
    }
    try{
        const userexist=await user.findOne({email:email});
        if(userexist)
        {
            return res.status(422).json({error : 'Email Already Exist'});
        }
        if(password.length <7)
        {
            return res.status(422).json({error : 'Enter Password lenght greater than  8'});
        }
        const name=fname+" "+lname;
        const ban='N';
        const users=new user({name,email,password,ban});
        await users.save();
        return res.status(201).json({error : 'User Registered Successfully'});
    }catch(err)
    {
        console.log(err);
    }
    
});
app.post("/admin/login",async (req,res)=>{
    const {id,password}=req.body;
    
    try{
        const admins=await admin.find({"name":id});
        if(admins){
            
            return res.status(201).json({error:"Admin Logged In Successfully",name:admins[0].name});
            
        }
        else{
            return res.status(422).json({error:"Admin Details Not Found"});
        }

    }catch(err)
    {
        console.log(err);
    }
})
app.listen(8000,()=>{
    console.log(`Server is running at port 8000`);
})