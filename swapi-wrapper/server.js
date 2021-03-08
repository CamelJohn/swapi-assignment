import express from 'express';
import routes from './router/routes.js';
import cors from 'cors';

/**
 * @description a simple node server to handle fetching data from the SWAPI
 */

const PORT = process.env.PORT || 8080;
const { Router } = express;

const app = express();

app.use(cors());

app.use('/swapi-wrapper/api/', routes(Router()));

app.listen(PORT, () => console.log('Listening on port', PORT));
