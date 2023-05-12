//jshint esversion6

const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");


const app=express();
const items=["Buy Food","Cook Food","Eat Food"];
const workItems=[];
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
let day=date.getDate();
// var currentDay=today.getDate();
// var day="";
// switch(currentDay){
//     case 0:
//         day="Sunday";
//         break;
//     case 1:
//         day="Monday";
//         break; 
//     case 2:
//         day="Tuesday";
//         break;
//     case 3:
//         day="Wednesday";
//         break;
//     case 4:
//         day="Thursday";
//         break;  
//     case 5:
//         day="Friday";
//         break;
//     case 6:
//         day="Saturday";
//         break;
//     default:
//     console.log("Error: current day is equal to:"+currentDay);
// }
    res.render("list",{ListTitle: day,newListItems:items}); 
});
app.post("/",function(req,res){
  var item= req.body.newItem;

  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
  
})
app.get("/work",function(req,res){
    res.render("list",{ListTitle:"Work List", newListItems:workItems});
})
app.get("/about",function(req,res){
    res.render("about");
})
app.post("/work",function(req,res){
 const item=req.body.newItem;
 workItems.push(item);
 res.redirect("/work");
});
app.listen(2850,function(){
    console.log("server started on port 2900");
});
