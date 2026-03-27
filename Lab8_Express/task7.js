const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3007;

let books = [
 { id: 1, title: "Clean Code", author: "Robert Martin" },
 { id: 2, title: "Introduction to Algorithms", author: "CLRS" }
];

// GET all
app.get("/books",(req,res)=>{
 res.json(books);
});

// GET by id
app.get("/books/:id",(req,res)=>{

 const book = books.find(b => b.id == req.params.id);

 if(!book){
  return res.status(404).send("Book not found");
 }

 res.json(book);
});

// POST
app.post("/books",(req,res)=>{
 books.push(req.body);
 res.json(req.body);
});

// PUT
app.put("/books/:id",(req,res)=>{

 const book = books.find(b => b.id == req.params.id);

 if(!book){
  return res.status(404).send("Book not found");
 }

 book.title = req.body.title || book.title;
 book.author = req.body.author || book.author;

 res.json(book);
});

// DELETE
app.delete("/books/:id",(req,res)=>{

 const index = books.findIndex(b => b.id == req.params.id);

 if(index === -1){
  return res.status(404).send("Book not found");
 }

 books.splice(index,1);

 res.send("Book deleted");
});
app.get("/", (req,res)=>{
 res.send("Library Book Management API Running");
});
app.listen(PORT,()=>console.log(`Task7 running on ${PORT}`));