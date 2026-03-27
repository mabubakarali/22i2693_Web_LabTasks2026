const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3006;

function animalCheck(req,res,next){

 if(!req.body.animalType){
  return res.status(400).send("Animal type missing");
 }

 next();
}

function severityCheck(req,res,next){

 if(req.body.severity === "severe"){
  req.difficulty = "high";
 }

 next();
}

function resourceCheck(req,res,next){

 const resourcesAvailable = true;

 if(!resourcesAvailable){
  req.outcome = "delayed";
 }

 next();
}

app.post("/rescue-mission",
animalCheck,
severityCheck,
resourceCheck,
(req,res)=>{

 const outcome = req.outcome || "success";

 res.json({
  message:"Rescue mission processed",
  outcome
 });

});
app.get("/", (req,res)=>{
 res.send("Wildlife Rescue Mission API Running");
});
app.listen(PORT,()=>console.log(`Task6 running on ${PORT}`));