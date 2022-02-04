const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
     usenewUrlParser:true,
     //useCreateIndex:true
})



// const me = new User({
//     name:'   Tarun',
//     email:'TARUN@GMAIL.COM',
//     age:14,
//     password:'abcd1235'
    
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=> {
//     console.log('Error!',error)
// })



// const task = new Task({
//     description:'     Learn the a mongoose',
//     completed:false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=> {
//     console.log(error)
// })