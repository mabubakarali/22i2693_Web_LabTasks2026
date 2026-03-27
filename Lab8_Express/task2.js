const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3002;

let astronauts = [
 { name: "Ayesha Khan", specialization: "Pilot", skillLevel: "Advanced" },
 { name: "Omar Malik", specialization: "Robotics Engineer", skillLevel: "Intermediate" }
];

let missions = [];

// GET astronauts
app.get("/astronauts",(req,res)=>{
 res.json(astronauts);
});

// POST mission
app.post("/missions",(req,res)=>{

 const { missionName, crew } = req.body;

 for(let name of crew){

  const astronaut = astronauts.find(a => a.name === name);

  if(!astronaut){
   return res.status(404).send("Astronaut not found");
  }

 }

 const mission = { missionName, crew };

 missions.push(mission);

 res.json(mission);
});

// GET mission
app.get("/missions/:missionName",(req,res)=>{

 const mission = missions.find(m => m.missionName === req.params.missionName);

 if(!mission){
  return res.status(404).send("Mission not found");
 }

 res.json({
  missionName: mission.missionName,
  crew: mission.crew,
  missionCapabilityScore: 90
 });

});

// DELETE mission
app.delete("/missions/:missionName",(req,res)=>{

 const index = missions.findIndex(m => m.missionName === req.params.missionName);

 if(index === -1){
  return res.status(404).send("Mission not found");
 }

 const name = missions[index].missionName;

 missions.splice(index,1);

 res.send(`Mission "${name}" cancelled`);
});
app.get("/", (req,res)=>{
 res.send("Space Mission Crew Management API Running");
});
app.listen(PORT,()=>console.log(`Task2 running on ${PORT}`));