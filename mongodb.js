//CRUD create read update delete
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
// const { ObjectId ,MongoClient } = require('mongodb');

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL,{useNewUrlParser:true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to databse!')
    }
   

    const db = client.db(databaseName)

//    db.collection('users').insertOne({name:'Rajvir', age:52},(error,result)=> {
//        if(error){
//            return console.log('Unable to insert');
//        }
//        console.log(result)
//    })
//find a data

    // db.collection('users').findOne({_id:new ObjectId("61c5a3d28f8ef3d06642f6fa")}, (error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age:27}).toArray((error,users)=>{
    //     console.log(users);
    // })
    // db.collection('users').find({age:27}).count((error,count)=> {
    //     console.log(count);
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=> {
    //     console.log(tasks);
    // })


    // //updata the document
    // db.collection('users').updateOne({
    //     _id:new ObjectId("61c5a3d28f8ef3d06642f6fa")
    // },{
    //     $set:{
    //         name:'Rajvir Singh'
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=> {
    //     console.log(error);
    // })

    // update the many document 

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=> {
    //     console.log(result)
    // }).catch((error)=> {
    //     console.log(error);
    // })

    // delete the document 

    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result)=> {
    //     console.log(result)
    // }).catch((error)=> {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        completed:true
    }).then((result)=> {
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })



  
})

