require('dotenv').config();

export const cloudinaryConfig = {
  cloud_name: 'eventmanager',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};
