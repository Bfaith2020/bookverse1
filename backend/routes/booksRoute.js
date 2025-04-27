import express from 'express';
import { Book } from '../models/bookModel.js'; // Corrected import

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    const requiredFields = [
      'title',
      'author',
      'genre',
      'description',
      'image',
      'price',
      'isbn',
    ];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response.status(400).send({
          message: `Send all required fields: ${requiredFields.join(', ')}`,
        });
      }
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
      description: request.body.description,
      image: request.body.image,
      price: request.body.price,
      isbn: request.body.isbn,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
  try {
    const requiredFields = [
      'title',
      'author',
      'genre',
      'description',
      'image',
      'price',
      'isbn',
    ];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response.status(400).send({
          message: `Send all required fields: ${requiredFields.join(', ')}`,
        });
      }
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
router.delete('/:id', async (request, response) => {
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

export default router;