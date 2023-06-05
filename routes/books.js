const express=require("express");

const {books}= require("../data/books.json")  //destructuring
const {users}= require("../data/users.json");  //destructuring
const { getAllBooks, updateBook,getSingleBookById,getAllIssuedBooks,addNewBook,deleteBook} = require("../controllers/book-controller");

const {UserModel,BookModel}=require("../models") //index.js is default file

const router=express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */

router.get('/', getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get single book by id
 * Access: Public
 * Parameters: id
 */

router.get('/:id',getSingleBookById)

/**
 * Route: /books/issued/books
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get('/issued/books',getAllIssuedBooks)

/**
 * Route: /books
 * Method: POST
 * Description: Add new book
 * Access: Public
 * Parameters: None
 */

router.post('/',addNewBook);

 /**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating book data
 * Access: Public
 * Parameters: id
 */

router.put('/:id',updateBook)

 /**
 * Route: /books/:id
 * Method: DELETE
 * Description: delete a book by id
 * Access: Public
 * Parameters: id
 */

router.delete('/:id',deleteBook)

//function
function getFine(user){
    const getDateInDays=(data="")=>{
        let date;
        if(data===""){
            date= new Date();
        }else{
            date=new Date(data);
        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
    };
    
    const subscriptionType=(date)=>{
        if(user.subscriptionType==="Basic"){
            date=date+90;
        }else if(subscriptionType==="Standard"){
            date=date+180;
        }else if(user.subscriptionType==="Premium"){
            date=date+365;
        }
        return date;
    };
    //Subscription expiration calculation
    // January 1, 1970, UTC. in milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiration= subscriptionType(subscriptionDate);

    const fine= returnDate<currentDate ? subscriptionExpiration<=currentDate?200:100:0;
    return fine;
    //dates in mmddyyyy
    
 }

 /**
 * Route: /books
 * Method: GET
 * Description: get all issued books with fine
 * Access: Public
 * Parameters: none
 */
 router.get('/issued-fine/books',(req,res)=>{
 const userWithIssuedBooks= users.filter((each)=>{
    if(each.issuedBook) return each;
});

const issuedBooks=[];

userWithIssuedBooks.forEach((each)=>{
    const book=books.find((book)=>book.id===each.issuedBook);

    book.issuedBy=each.name;
    book.issuedDate=each.issuedDate;
    book.returnDate=each.returnDate;
    book.fine=getFine(each);

    issuedBooks.push(book);
})

if(issuedBooks.length===0)
  return res.status(404).json({
    success:false,
    message:"No books issued yet",
  })
  return res.status(200).json({success:true,data:issuedBooks,})
});

//default export - single export
module.exports=router;