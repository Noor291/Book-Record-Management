 const mongoose = require("mongoose");
 function DbConnection(){
     const DB_URL = process.env.MONGO_URI;

     mongoose.connect(DB_URL,{   //settings
        useNewUrlparser :true,
        useUnifiedTopology:true,
     })

     const db = mongoose.connection;//info about connection

     db.on("error", console.error.bind(console,"Connection error: "))
     db.once('open',function(){
        console.log("Db connected...");
     })
 }

 module.exports = DbConnection;