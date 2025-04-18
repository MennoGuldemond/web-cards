const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const targetPath = "./src/environments/environment.ts";
const envConfigFile = `
import packageJson from '../../package.json';

export const environment = {
  firebase: {
    projectId: 'web-cards-db8d6',
    appId: '1:304612749434:web:d7a6eaae6fe7ad69a48bc3',
    storageBucket: 'web-cards-db8d6.firebasestorage.app',
    apiKey: '${process.env.GOOGLE_API_KEY}',
    authDomain: 'web-cards-db8d6.firebaseapp.com',
    messagingSenderId: '304612749434',
    measurementId: 'G-EBFWN5R40C',
  },
  production: false,
  version: packageJson.version,
};
`;

// Write the environment file
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Environment file generated at ${targetPath}`);
