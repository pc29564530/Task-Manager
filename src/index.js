const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const bcrypt = require('bcryptjs')



const app = express()
const port = process.env.PORT||3000

const multer = require('multer');
const upload = multer({
    dest: "images",
    limits:{
        fileSize:10000000
    },
    fileFilter(res,file, cb){
        if(!file.originalname.match(/\.(pdf|doc|docx)$/)){
            return cb(new Error('Please upload a PDF'))
        }
        cb(undefined,true)
    }
})
app.post('/upload', upload.single('upload'), (req,res)=>{
    res.send();
})

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)




app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})




