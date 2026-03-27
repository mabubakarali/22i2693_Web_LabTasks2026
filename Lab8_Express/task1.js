const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3001;

let courses = [
 { id: 1, name: "Data Structures", seats: 30 },
 { id: 2, name: "Operating Systems", seats: 25 }
];

// GET all courses
app.get("/courses", (req,res)=>{
 res.json(courses);
});

// GET course by id
app.get("/courses/:id",(req,res)=>{

 const course = courses.find(c => c.id == req.params.id);

 if(!course){
  return res.status(404).send("Course not found");
 }

 res.json(course);
});

// POST new course
app.post("/courses",(req,res)=>{
 courses.push(req.body);
 res.json(req.body);
});

// UPDATE seats
app.put("/courses/:id",(req,res)=>{

 const course = courses.find(c => c.id == req.params.id);

 if(!course){
  return res.status(404).send("Course not found");
 }

 course.seats = req.body.seats;

 res.json(course);
});

// DELETE course
app.delete("/courses/:id",(req,res)=>{

 const index = courses.findIndex(c => c.id == req.params.id);

 if(index === -1){
  return res.status(404).send("Course not found");
 }

 courses.splice(index,1);

 res.send("Course deleted");
});
app.get("/", (req,res)=>{
 res.send("Course Registration API Running");
});
app.listen(PORT,()=>console.log(`Task1 running on ${PORT}`));