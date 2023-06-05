const express=require("express");

const {books}= require("../data/books.json")  //destructuring
const {users}= require("../data/users.json");  //destructuring
const { getAllBooks, updateBook,getSingleBookById,getAllIssuedBooks,addNewBook,deleteBook, getIssuedBooksWithFine} = require("../controllers/book-controller");

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


 /**
 * Route: /books
 * Method: GET
 * Description: get all issued books with fine
 * Access: Public
 * Parameters: none
 */
 router.get('/issued-fine/books',getIssuedBooksWithFine)

//default export - single export
module.exports=router;