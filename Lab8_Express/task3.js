const express = require("express");
const app = express();

let requestCount = 0;

function countRequests(req,res,next){
 requestCount++;
 next();
}

app.use(countRequests);

const PORT = 3003;

app.get("/",(req,res)=>{
 res.send("Server working");
});

app.get("/stats",(req,res)=>{
 res.send(`Total API Requests: ${requestCount}`);
});

app.listen(PORT,()=>console.log(`Task3 running on ${PORT}`));