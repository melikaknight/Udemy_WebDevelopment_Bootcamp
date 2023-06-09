//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
 const firstName=req.body.fName;
 const lastName=req.body.lName;
 const email=req.body.email;
 console.log(firstName);
 const data={
    members:[
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName

            }
        }
    ]
 };
 const jsonData=JSON.stringify(data);
 const url="https://us14.api.mailchimp.com/3.0/lists/0bf785761b";
 const options={
    method:"POST",
    auth:"melika:f0d3e928faebd47bf0653f9f77b2fea0-us14"

 }
 const request=https.request(url, options,function(response){
    
    if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"failure.html");
    }
    
    
    
    
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
 })
 request.write(jsonData);
 request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 2900,function(){
    console.log("Server is running on port 2900");
})
//f0d3e928faebd47bf0653f9f77b2fea0-us14
//0bf785761b
