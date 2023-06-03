const express= require ("express");
const dotenv = require('dotenv');

const DbConnection = require("./databaseConnection")

//importing routes
const usersRouter=require("./routes/users")
const booksRouter=require("./routes/books")

dotenv.config()

const app=express(); //instance of nodejs server

DbConnection(); // connect to database

const PORT=8081;
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send({
    message:"Server is up and running",
    })
});

app.use('/users',usersRouter);
app.use('/books',booksRouter);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
}) 