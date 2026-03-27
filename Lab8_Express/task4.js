const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3004;

function validateMission(req,res,next){

 const { missionName, crew } = req.body;

 if(!missionName || !crew){
  return res.status(400).send("Invalid Request: Required fields missing");
 }

 next();
}

app.post("/missions",validateMission,(req,res)=>{
 res.json({
  message:"Mission created",
  data:req.body
 });
});
app.get("/", (req,res)=>{
 res.send("Input Validation API Running");
});
app.listen(PORT,()=>console.log(`Task4 running on ${PORT}`));