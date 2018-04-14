var 
//################ APP VARS #####################  

    express     = require("express"), 
    app         = express(),
    method      = require("method-override"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
//################ Mongo Schema #####################  
    crudSchema  = new mongoose.Schema({
        title:  String,
        body:   String,
        author: String,
        created: 
        {
            type: Date, 
            default: Date.now
        }
    }),
    Crud = mongoose.model("Crud", crudSchema);
    
//################## Site  Set Up #################  
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/crud");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(method("_method"));

//#####################  Routes Table  ###################
app.get("/", function(req, res){
    res.redirect("/crud")
});

app.get("/crud", function(req, res){
    Crud.find({}, function(err, cruds){
        if (err){
            res.redirect("error");
        }else{
            res.render("index", {cruds: cruds})
        }
    })
});


app.get("/crud/new", function(req, res){
    res.render("new");
});

app.get("/crud/sam/controles", function(req, res){
       Crud.find({}, function(err, cruds){
        if (err){
            res.redirect("error");
        }else{
            res.render("admin", {cruds: cruds});
        }
    })
});

 app.get("/crud/:id", function(req, res){
    Crud.findById(req.params.id, function(err, foundCrud){
        if (err){
            res.render("error")
        }
        else{
            res.render("show", {cruds: foundCrud});
        }
    })
 });



//#####################  Post Table  #####################
// creates a new post
 app.post("/crud", function(req, res){
     Crud.create(req.body.crud, function(err, newCrud){
         if (err){
             res.redirect("/crud/new");
         }else{
             res.redirect("/crud");
         }
     });
 });
//############################### edit a post ############
app.get("/crud/:id/edit", function(req, res){
    Crud.findById(req.params.id, function(err, foundCrud){
        if (err){
            res.render("error")
        }else{
            res.render("edit", {cruds: foundCrud});
        }
    });
})



//#####################  dont edit below ##################
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Test the C.R.U.D"); 
});