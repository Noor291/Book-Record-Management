const express=require("express");

const {books}= require("../data/books.json")  //destructuring
const {users}= require("../data/users.json")  //destructuring

const router=express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get single book by id
 * Access: Public
 * Parameters: id
 */

router.get('/:id',(req,res)=>{
    const{id}=req.params;
    const book =books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"book not found",
        });
    }
    return res.status(200).json({
        sucess: true,
        data: book,
    });
});

/**
 * Route: /books/issued/books
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get('/issued/books',(req,res)=>{
    const userWithIssuedBooks= users.filter((each)=>{
        if(each.issuedBook) return each;
    });
    
    const issuedBooks=[];

    userWithIssuedBooks.forEach((each)=>{
        const book=books.find((book)=>book.id===each.issuedBook);

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
    })

    if(issuedBooks.length===0)
      return res.status(404).json({
        success:false,
        message:"No books issued yet",
      })
      return res.status(200).json({success:true,data:issuedBooks,})
});

/**
 * Route: /books
 * Method: POST
 * Description: Add new book
 * Access: Public
 * Parameters: None
 */

router.post('/',(req,res)=>{
    const{id,name,author,genre,price,publisher}=req.body;
    const book=books.find((each)=>each.id===id);
    if(book){
     return res.status(404).json({
         success:false,
         message:"book exists with this id",
     });
    }
    books.push({
     id,
     name,
     author,
     genre,
     price,
     publisher,
    });
    return res.status(201).json({
     success:true,
     data:books,
    });
 });

 /**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating book data
 * Access: Public
 * Parameters: id
 */

router.put('/:id',(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
    const book=books.find((each)=>each.id===id);
    if(!book){
     return res.status(404).json({
         success:false,
         message:"book does not exists",
     });
    }
    const updatedBook = books.map((each)=>{
        if(each.id===id){
            return{
              ...each,
              ...data,
            };
        }
        return each;
    })
    return res.status(201).json({
     success:true,
     data:updatedBook,
    });
 });

 /**
 * Route: /books/:id
 * Method: DELETE
 * Description: delete a book by id
 * Access: Public
 * Parameters: id
 */

router.delete('/:id',(req,res)=>{
    const{id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
     return res.status(404).json({
         success:false,
         message:"book does not exists",
     });
    }
    const index=books.indexOf(book);
    books.splice(index,1);
    return res.status(201).json({
     success:true,
     data:books,
    });
 });

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