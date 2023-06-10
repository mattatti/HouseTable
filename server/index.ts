import express, {Express} from 'express';
import dotenv, {} from 'dotenv';
dotenv.config();
const housesRouter = require('./src/routes/houses.js');

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;

// Parse JSON request bodies
app.use(express.json());

// Mount the houses router
app.use('/api/houses', housesRouter);


// Start the server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});
