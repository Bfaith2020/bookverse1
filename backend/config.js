// filepath: c:\Users\Admin\Desktop\bookverse\backend\config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 5555,
  mongoDBURL: process.env.MONGODB_URL,
};

export default config;