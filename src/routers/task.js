
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const routers =  express.Router()
//task routes 

routers.get('/tasks',auth,  async (req,res)=>{
    try{
        const tasks = await Task.find({owner:req.user._id});  // to show the only authenticated tasks 

        //await req.user.populate('tasks')
        if(!tasks){
            return res.status(400).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
    // const task = await Task.find({})
    
    // Task.find({}).then((task)=>{  
    //     if(!task){
    //         return res.status(500).send();
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)

    // })
})


routers.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id;
    try{
       // const task = await Task.findById(_id)
       const task = await Task.findOne({_id,owner:req.user._id})// without authentication we cannot access task
       
       if(!task){
            return res.status(404).send();
        }
        res.send(task)
        
    }catch(e){
        res.status(500).send(e);
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(500).send();
    //     }
    //     res.send(task)
    // }).catch((e)=> {
    //     res.status(400).send(e);
    // })
})

routers.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }
    try{
        const task = await Task.findById(req.params.id)
        
  //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})

    if(!task){
        return res.status(404).send()
    }
    updates.forEach((update)=>task[update]=req.body[update])
    await task.save()
    res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

routers.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

routers.post('/tasks', auth, async (req,res)=> {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body, 
        owner:req.user._id
    });
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(task)
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((e)=> {
    //     res.status(400).send(e);
    // })
})


module.exports = routers

