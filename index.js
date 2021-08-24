const path=require("path")
const express=require("express");
const app=express();
const PORT=process.env.PORT||3001;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "pages","login.html"))
})