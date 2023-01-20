const dotenv = require("dotenv");

dotenv.config();

const config = {
  httpPort: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000,
  auth: {
    secret: process.env.AUTH_SECRET || "",
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 27017,
    name: process.env.DATABASE_NAME,
  },
};

export default config;