//jshintesversion:6

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const  _ = require("lodash");





// const date = require(__dirname + "/date.js");----- this is also delete for mongo project and it will simplify the project

mongoose.set('strictQuery', false);



const app = express();



app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));





//define server

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {

  useNewUrlParser: true

});



//define schema name

const itemsSchema=({

  name: String

});



//define model based on schema

const Item= mongoose.model("Item", itemsSchema);



//create some items



const item1= new Item({

  name:"Welcome to your todolist"

});



const item2= new Item({

  name: "Hit the + button to add a new item."

});



const item3= Item({

  name: "<-- Hit this to delete an item."

});



//put our all item in an array

const defaultItems=[item1, item2, item3];



const listSchema = {

  name:String,

  items: [itemsSchema]

};



// const List = mongoose.model("List", listSchema);

module.exports = List = mongoose.model("List", listSchema);















app.get("/", function(req, res) {



// const day = date.getDate(); ----delete this from our app for simplyfy

  Item.find({}).then(function(founditems) {  //here {} refers to  total of elements present in item collection

     if(founditems.length == 0)

     {

       Item.insertMany(defaultItems).then(function(err){

         if(err){

           console.log(err);

         }else{

           console.log("Successfully saved default items to DB.");

         }

       });

       res.redirect("/");

     }

     else{

    res.render("list", {listTitle: "Today", newListItems:founditems});

  }

});





});



app.post("/", function(req, res){



  const itemName = req.body.newItem;

  const listname = req.body.list;



const item = new Item({

  name:itemName

});

if(listname == "Today"){

item.save();

res.redirect("/");

}

else{

  const promise = List.findOne({name:listname}).exec();





promise.then(function (foundList) {

   foundList.items.push(item);

   foundList.save();

   res.redirect("/"+ listname);

});

}

});



app.post("/delete",function(req,res){

  const checkitemid = req.body.checkbox;

  const listname = req.body.listname;

  if(listname == "Today"){

  Item.findByIdAndRemove({_id:checkitemid}).then(function() {

    console.log("deleted successfully");

    res.redirect("/");

  });

}

  else

  {

    List.findOneAndUpdate({name:listname}, {$pull:{items:{_id: checkitemid}}}).then(function(foundlist){ //here  findoneandupdate(condition,update,callback)

      res.redirect("/"+ listname);

    });

  }



  });





app.get("/:customListname",function(req,res){

  const customlistname = _.capitalize(req.params.customListname);



const promise = List.findOne({name:customlistname}).exec();





promise.then(function (foundList) {

  if(!foundList)

  {

    //create a new list

    const list = new List({

      name:customlistname,

      items: defaultItems

    });

    list.save();

    res.redirect("/"+ customlistname)

  }

  else{

    //list already exists

    res.render("list", {listTitle: foundList.name, newListItems:foundList.items});

  }

});



});



app.listen(3000, function() {

  console.log("Server started on port 3000");

});