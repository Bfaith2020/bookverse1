import mongoose from 'mongoose';
import { Book } from '../models/bookModel.js';
import config from '../config.js';
import fs from 'fs';

async function importBooks() {
  try {
    await mongoose.connect(config.mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use the correct path for books.json inside scripts
    const books = JSON.parse(fs.readFileSync(new URL('./books.json', import.meta.url)));
    await Book.insertMany(books, { ordered: false });
    console.log('Books imported successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error importing books:', err);
    process.exit(1);
  }
}

importBooks();
