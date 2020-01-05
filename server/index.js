const configs = require('./configs');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    host: configs.pgHost,
    port: configs.pgPort,
    database: configs.pgDatabase,
    user: configs.pgUser,
    password: configs.pgPassword
});

pgClient.on('error', () => console.log('Lost Postgres Connection!'));

// Create Table for First Time
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(error => console.log(error));



// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: configs.redisHost,
    port: configs.redisPort,
    retry_strategy: () =>  1000
});

const redisPublisher = redisClient.duplicate();



// Express Router
app.get('/', (request, response) => {
   response.send('Express App');
});

// From Postgres DB
app.get('/values/all', async (request, response) => {
    const values = await pgClient.query('SELECT * from values');
    response.send(values.rows);
});

// From Redis DB
app.get('/values/current', async (request, response) => {
    redisClient.hgetall('values', (error, values) => {
        response.send(values);
    });
});

app.post('/values', async (request, response) => {
    const index = request.body.index;

    if(parseInt(index) > 40) {
        return response.status(422).send('Index is Too High! (Above 40)');
    }

    redisClient.hset('values', index, 'Nothing Yet');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    response.send({ working: true });
});

app.listen(5000, error => {
    console.log('Listening on Port 5000');
});