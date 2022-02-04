
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{
       try{
           const token = req.header('Authorization').replace('Bearer ', '')
           const decoded = jwt.verify(token, 'thisismynewcourse')
           const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
            if(!user){
                throw new Error()
            }
            req.token = token
            req.user = user
            next()
        }catch(e){
           res.status(401).send({error: 'Please authenticate'})
       }
}


// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         console.log(token)
//         console.log('deepak')
//         console.log('hjkashfjksd')
//         console.log('hello')
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         console.log("deepajdf")
        
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
//         console.log('dshfjksdfhk')
//         console.log(user)
//         if (!user) {
//             throw new Error()
//         }
//         //console.log(user)
//         req.token = token
//         req.user = user
//         next()
//     } catch (e) {
//         //console.log(user)
//         res.status(401).send({ error: 'Please authenticate.' })
//     }
// }

 module.exports = auth;