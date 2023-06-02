const express= require ("express");

//importing routes
const usersRouter=require("./routes/users")
const booksRouter=require("./routes/books")

const app=express();
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