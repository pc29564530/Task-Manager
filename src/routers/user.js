const  express  = require('express');

const User = require('../models/user')
const auth = require('../middleware/auth')
 // user routes 

 
const routers = express.Router()

//create a user
routers.post('/users', async (req,res)=>{
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})


//user login 

routers.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})  
    }catch(e){
        res.status(400).send()
    }
})

//user logout

routers.post('/users/logout', auth, async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//user logout all 

routers.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// get all the user
routers.get('/users/me', auth, async (req,res) => {
    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send()
    // }
    res.send(req.user)
})

routers.get('/users/:id', async(req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

//update the user 
routers.patch('/users/me',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email','password','age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})

        // if(!user){
        //     return res.status(404).send()
        //     }
        // }
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save();
        res.send(req.user)
    }catch(e){
        return res.status(500).send(e);
    }
})

//delete the users

routers.delete('/users/me', auth, async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})




// routers.post('/users', async (req,res) => {

//     const user = new User(req.body)

//     try {
//         await user.save();
//        // const token = await user.generateAuthToken()
//        // res.status(201).send({user, token})
//        res.status(201).send(user)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })



// routers.post('/users/login', async(req,res) =>{
//     try{
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()

//         res.send({user,token})
//         console.log(user)
//     }catch(e){
//         res.status(400).send();
//     }
// })


// //logout

// routers.post('/users/logout',auth, async (req,res)=>{
//     try{
//         req.user.tokens = req.user.tokens.filter((token)=>{
//             return token.token !== req.token
//         })
//         await req.user.save()
//         res.send()
//     }catch(e){
//         res.status(500).send()
//     }
// })
// routers.post('/users/logoutAll', auth, async (req,res)=>{
//     try{
//         req.user.tokens=[]
//         await req.user.save()
//         res.send()
//     }catch(e){
//         res.status(500).send()
//     }
// })


// routers.get('/users/me',auth,async (req,res)=>{
//     console.log(auth)
//     res.send(req.user);
// })   
    
// // routers.get('/users/:id',async (req,res)=>{
// //     const _id = req.params.id;
// //     try{
// //         const user = await User.findById(_id)
// //         if(!user){
// //             return res.status(404).send();
// //         }
// //         res.send(user)
// //     }catch(e){
// //         res.status(500).send(e);
// //     }
// //         // User.findById(_id).then((user)=> {
// //         //     if(!user){
// //         //         return res.status(404).send();
// //         //     }
// //         //     res.send(user)
// //         // }).catch((e)=>{
// //         //     res.status(500).send(e)
// //         // })
// //         // //console.log(req.params)
// // })
   
// routers.patch('/users/:id', async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email ', 'password', 'age']
//     const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    
//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid updates'})
//     }
    
//     try{
//         const user = await User.findById(req.params.id)
//         updates.forEach((update)=> user[update]=req.body[update])
//         await user.save()
//             //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})
    
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })
    
// routers.delete('/users/:id', async(req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })
    

module.exports = routers