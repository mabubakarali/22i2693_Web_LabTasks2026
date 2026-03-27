const express = require("express");
const app = express();

const PORT = 3005;

function addRequestTime(req,res,next){

 req.requestTime = new Date().toISOString();

 next();
}

app.use(addRequestTime);

app.get("/request-time",(req,res)=>{
 res.send(`This request was received at: ${req.requestTime}`);
});
app.get("/", (req,res)=>{
 res.send("Request Time Middleware API Running");
});
app.listen(PORT,()=>console.log(`Task5 running on ${PORT}`));