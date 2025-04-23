import express from 'express';
import config from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Corrected import

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route for the root endpoint
app.get('/', (request, response) => {
  return response.status(200).send('Hello World!');
});

// Route to save a new book
app.post('/books', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    // Validate required fields
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'All fields are required: title, author, publishYear',
      });
    }

    // Create a new book
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books from the database
app.get('/books', async (request, response) => {
  try {
    // Count the number of books
    const count = await Book.countDocuments();

    // Retrieve all books
    const books = await Book.find({});

    return response.status(200).json({
      count,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(config.mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(config.PORT, () => {
      console.log(`App is listening to port: ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });