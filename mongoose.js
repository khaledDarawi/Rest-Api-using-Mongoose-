const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = 3000
app.use(express.json())
process.env.MONGO_URL = 'mongodb://localhost:27017/todosdb';
mongoose.connect('mongodb://localhost:27017/todosdb').then((result)=>{
    console.log("Connected")
}).catch(err=>{
    console.error(err)
})

const ToDoSchema = new mongoose.Schema({
    task : String , 
    descreption : String ,
})

const ToDo = mongoose.model('ToDo',ToDoSchema)

app.get('/todos', async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
  }
});


app.post('/todos',async(req,res)=>{
    const NewTask = new ToDo(req.body)
    await NewTask.save()
    res.json({message:"Added new task"})
})

app.get('/todos/:id', async (req, res) => {
  try {
    const task = await ToDo.findById(req.params.id);
    if (!task) {
      return res.json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.json({ message: "Invalid ID" });
  }
});

app.put('/todos/:id',async(req , res)=>{
    const updated = await ToDo.findByIdAndUpdate(req.params.id , req.body,{new:true})
    res.json({message:"updated the task you want to do",updated})
})

app.delete('/todos/:id',async(req , res)=>{
    await ToDo.findByIdAndDelete(req.params.id)
  res.json({ message: 'we delete the id' })
})

app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

