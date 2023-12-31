import express, {Express} from 'express';
import dotenv, {} from 'dotenv';
const cors = require('cors');

dotenv.config();
import {sequelize} from './src/models/House';

const housesRouter = require('./src/routes/houses.js');

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;

// Parse JSON request bodies
app.use(express.json());

app.use(cors());

// Mount the houses router
app.use('/api/houses', housesRouter);

// Start the server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});

(async () => {
    await sequelize.sync({})
})();
