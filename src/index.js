const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const bcrypt = require('bcryptjs')



const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)




app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})


const myFunction = async () =>{
    const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse')
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
    // const password = 'pawan1234'
    // const hashedPassword = await bcrypt.hash(password, 8 )
    // console.log(password)
    // console.log(hashedPassword)
}


myFunction()
// const myFunciton = async () => {
//     const token = jwt.sign({_id:'abc123'}, 't hisismynewcourse')
//    console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
//     // const password = 'Bharat@12'
//     // const hashedPassword = await bcrypt.hash(password, 9)

//     // console.log(password)
//     // console.log(hashedPassword)

//     // const isMatch = await bcrypt.compare('Bharat@12', hashedPassword)
//     // console.log(isMatch)
// }

// myFunciton()
const Task = require('./models/task')
const User = require('./models/user')
// const main= async () =>{
//     // const task = await Task.findById('61fcd3fa9c8d9048527aa813')
//     // await task.populate('owner')
//     // //console.log(task.owner)
//     // const user = await User.findById('61f8e2d4992c82abfe9cf211')
//     // await user.populate('tasks')
//     // console.log(user.tasks)
// }
// main()  