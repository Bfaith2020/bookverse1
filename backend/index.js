import express from 'express';
import config from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Corrected import
import booksRoute from './routes/booksRoute.js'; // Corrected import
import cors from 'cors'; // Importing CORS middleware


const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: 'http://localhost:5173', // Update to match the frontend's development server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To BookVerse API');
  });
  
  app.use('/books', booksRoute);
  

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
