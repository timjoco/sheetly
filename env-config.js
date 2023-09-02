// env-config.js
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Log environment variables for debugging (optional)
console.log('Environment variables:', process.env);

// Export the loaded environment variables for use in your application
export default process.env;
