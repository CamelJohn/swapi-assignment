import express from 'express';
import routes from './router/routes.js';
import cors from 'cors';

import error from './middleware/error.js';

/**
 * @description a simple node server to handle fetching data from the SWAPI
 */

const PORT = process.env.PORT || 8080;

const { Router } = express;

const app = express();

app.use(cors());

app.use('/swapi-wrapper/api/', routes(Router()));

/**
 * @description simple middleware to handle errors from different routes/services in the app.
 */
app.use(error);

app.listen(PORT, () => console.log('Listening on port', PORT));
