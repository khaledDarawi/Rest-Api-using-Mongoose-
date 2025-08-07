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
    id : Number ,
    task : String , 
     descreption : String ,
})

const ToDo = mongoose.model('ToDo',ToDoSchema)

let currentId = 1

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
    const newToDo = req.body
    newToDo.id = currentId++
    todol.push(newToDo)
    console.log(newToDo)
    res.json({ message: "Added new task" })
    }
    catch (err){
    console.error("ERROR",err)
}
})
/*Not sure of this part but i hope it is right :)
app.get('/todos/:id', async (req, res) => {
  try {
      const taskId = parseInt(req.params.id)
    const todo = todol.find(t => t.id === taskId)
    if (!task) {
      return res.json(task);
    }
    res.json(task);
  } catch (err) {
    res.json({ message: "Invalid ID" });
  }
});
*/

app.put('/todos/:id',async(req , res)=>{
    try{
    const todoID = parseInt(req.params.id);
    const updatedTodo = req.body; 
    const todoIndex = todol.findIndex(t => t.id === todoID);
    
    if (todoIndex===-1) {
        return res.json({message:"The Task Id not found"})
    }
    if(updatedTodo.title){
        todol[todoIndex].title = updatedTodo.title
    }
    if(updatedTodo.descreption){
        todol[todoIndex].description = updatedTodo.description
    }
    res.json(todol[todoIndex])
   
    }
catch(err){
    console.error("ERROR",err)
}
})


app.delete('/todos/:id',async(req , res)=>{
    try{    
    const id = parseInt(req.params.id);
    const index = todol.findIndex(todo => todo.id === id);
    
    if (index === -1) {
        return res.json({message:'Task not found'})
    }
    
    todol.splice(index, 1);
    res.json({message:'Task deleted'});
        
    }
    catch(err){
    console.error("ERROR",err)
}
})


app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})


