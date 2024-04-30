//Import Required Modules:
const express = require("express");
const bodyParser = require("body-parser");  //we havents installed this module
const booksController = require("./controllers/booksController"); // Import controllers
const validateBook = require("./middlewares/validateBook");  //is this correct?

//Initialize Express App
const app = express();

//Configure Middleware
app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Define individual routes for each controller function
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook
app.delete("/books/:id", booksController.deleteBook);

//Define Port and Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});