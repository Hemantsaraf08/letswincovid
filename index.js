const path=require("path")
const express=require("express");
const app=express();
const userArr=require("./userData");
const PORT=process.env.PORT||3001;
 const {run, getTablestr}=require("./webscrapper/puppetAutomation");


app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//handle bar settings
const exphbs  = require('express-handlebars');
const { get } = require("https");
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
 

app.get("/", (req,res)=>res.redirect("/login"));

app.get("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, "pages","login.html"))
})
const currUser=[];
app.post("/result", (req, res)=>{
    const user={
        name:req.body.name,
        age: parseInt(req.body.age),
        email: req.body.email, 
        pincode: parseInt(req.body.pincode)
    }   
    currUser.push(user)
    // userArr.push(user);

    run(user);
    //Start Scheduler
// require("./scheduler");
    // console.log(userArr);
    // console.log(currUser);
    res.redirect("/profile");     
})
app.get("/profile", async (req, res)=>{
    // console.log("for profile page", currUser[0].name)
    let obj=currUser[0]
    await run(obj)
    res.render("header", {
        name: currUser[0].name, 
        age: currUser[0].age, 
        Email: currUser[0].email,
        pincode: currUser[0].pincode,
        table: getTablestr()
    })
    // currUser.pop();

//     //Get all fetched jobs and pass them to the index template for rendering
//   res.render("index", {
//     jobs: remoteJobsScraper.getJobs()
//   });
});



