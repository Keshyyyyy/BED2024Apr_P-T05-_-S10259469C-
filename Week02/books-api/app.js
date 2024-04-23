//import express
const express = require ('express');
const bodyParser = require ('body-parser');

//insantiate express app 
const app = express();

//define the port
const port = 3000;

//creating an array to store book data 
//use let so that you can change the variable values in the future, const can't be changed
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

 //middlewear to parse oncoming JSON data in requests 
 //parse incoming JSON data in requests
app.use(express.json())
//Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

//creating route to get data 
app.get('/books', (req,res) => {
    res.json(books); //sending the array of books to JSON response 
});  //first route 

//submitting data, second route , post request 
app.post('/books', (req, res) => {
    const newBook = req.body; //Get the new book data from the request body
    newBook.id = books.length + 1; //Assign a unique ID
    books.push(newBook); //Add the new book to the array
    res.status(201).json(newBook); //Send created book with status code 201
   });

//third route using a GET with a specific ID 
app.get('/books/:id', (req, res) => {  //colon expexts a number there
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      res.json(book); // Send the book data if found
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
    });

//fourth route to update the records using PUT, extract the book ID from the parameter 
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body
  
    const bookIndex = books.findIndex(book => book.id === bookId);  //use find index to find the book with this ID, triple = so that it's exactly the same type (value and data type in which it was declared in)
  
    if (bookIndex !== -1) {
      updatedBook.id = bookId;
      books[bookIndex] = updatedBook; // Update book data in the array
      res.json(updatedBook); // Send updated book data
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });

//fifth route to delete records, use DELETE
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // Remove book from the array, splice is the syntax in js to remove 
      res.status(204).send(); // Send empty response with status code 204 (No Content) also referes to successful deletion
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book, this message will be shown when the records are not found in the database
    }
  });

//starting the server 
   app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
   });



