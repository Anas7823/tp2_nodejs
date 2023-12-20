const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');

const marqueRoute = require('./routes/marqueRoute')
const rolesRoute = require('./routes/rolesRoute')
const userRoute = require('./routes/userRoute')

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// appel a nos routes dans le dossier route
app.use('/', marqueRoute);
app.use('/', rolesRoute);
app.use('/', userRoute);


port = 8000;
app.listen(port, () =>
    console.log(`Serveur lancé sur http://localhost:${port}`)
);