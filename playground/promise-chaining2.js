//
// Goal mess around with promise chaining 
//
//1. Create promise-chining-2.js
//2. Load in mongoose and task model 
// 3. Remove a given task by id
//4. Get and print the total number of incomplete task
//5. test your work


require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('61c8341bf0e75a5b02eb5ed2').then((task)=> {
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async(id)=>{
    const task = await Task.findByIdAndDelete(id) 
    const count = await Task.countDocuments({completed:false})
    return count 
}

deleteTaskAndCount('61c8341bf0e75a5b02eb5ed2').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e);
})  