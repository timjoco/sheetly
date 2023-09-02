// env-config.js
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Use this to log env variables
// console.log('Environment variables:', process.env);

// Export the loaded environment variables for use in your application
export default process.env;
