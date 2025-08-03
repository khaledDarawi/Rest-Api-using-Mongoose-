const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = 3000
app.use(express.json())
// i face a problem here so i asked chatGpt for solution and he gave me this solution (process.env.MONGO_URL = 'mongodb://localhost:27017/todosdb';) only
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

app.get('/todos',async(req,res)=>{
    try{
    const todos = await ToDo.find()
    res.json(todos)

}
catch (err){
    console.error("ERROR",err)
}
})


app.post('/todos',async(req,res)=>{
    try{
    const NewTask = new ToDo(req.body)
    await NewTask.save()
    res.json({message:"Added new task"})
    }
    catch (err){
    console.error("ERROR",err)
}
})

app.get('/todos/:id', async (req, res) => {
  try {
    const task = await ToDo.findById(req.params.id);
    if (!task) {
      return res.json(task);
    }
    res.json(task);
  } catch (err) {
    res.json({ message: "Invalid ID" });
  }
});


app.put('/todos/:id',async(req , res)=>{
    try{
    const updated = await ToDo.findByIdAndUpdate(req.params.id , req.body,{new:true})
    res.json({message:"updated the task you want to do",updated})
    }
catch(err){
    console.error("ERROR",err)
}
})


app.delete('/todos/:id',async(req , res)=>{
    try{
    await ToDo.findByIdAndDelete(req.params.id)
  res.json({ message: 'we delete the id' })
    }
    catch(err){
    console.error("ERROR",err)
}
})


app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

