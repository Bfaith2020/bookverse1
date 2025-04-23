import express from 'express';
import config from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Corrected import

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route for the root endpoint
// Route for Save a new Book
app.post('/', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Get All Books from database
  app.get('/', async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Get One Book from database by id
  app.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Update a Book
  app.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });
  
      if (!updatedBook) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Delete a book
  app.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
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
