const express = require('express');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `${req.method} ${req.url}`
    });
    next();
});

// Endpoint for addition
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        // Send error response if input parameters are not valid numbers
        logger.log({
            level: 'error',
            message: 'Invalid input. Please provide valid numbers.'
        });
        res.status(400).send('Invalid input. Please provide valid numbers.');
    } else {
        // Perform addition operation and send result
        const result = num1 + num2;
        logger.log({
            level: 'info',
            message: `New addition operation requested: ${num1} + ${num2}`
        });
        res.send(`The result of ${num1} + ${num2} is ${result}.`);
    }
});

// Endpoint for subtraction
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        // Send error response if input parameters are not valid numbers
        logger.log({
            level: 'error',
            message: 'Invalid input. Please provide valid numbers.'
        });
        res.status(400).send('Invalid input. Please provide valid numbers.');
    } else {
        // Perform subtraction operation and send result
        const result = num1 - num2;
        logger.log({
            level: 'info',
            message: `New subtraction operation requested: ${num1} - ${num2}`
        });
        res.send(`The result of ${num1} - ${num2} is ${result}.`);
    }
});

// Endpoint for multiplication
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        // Send error response if input parameters are not valid numbers
        logger.log({
            level: 'error',
            message: 'Invalid input. Please provide valid numbers.'
        });
        res.status(400).send('Invalid input. Please provide valid numbers.');
    } else {
        // Perform multiplication operation and send result
        const result = num1 * num2;
        logger.log({
            level: 'info',
            message: `New multiplication operation requested: ${num1} * ${num2}`
        });
        res.send(`The result of ${num1} * ${num2} is ${result}.`);
    }
});

// Endpoint for division
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        // Send error response if input parameters are not valid numbers
        logger.log({
            level: 'error',
            message: 'Invalid input. Please provide valid numbers.'
        });
        res.status(400).send('Invalid input. Please provide valid numbers.');
    } else if (num2 === 0) {
        // Send error response if attempting to divide by zero
        logger.log({
            level: 'error',
            message: 'Cannot divide by zero.'
        });
        res.status(400).send('Cannot divide by zero.');
    } else {
        // Perform division operation and send result
        const result = num1 / num2;
        logger.log({
            level: 'info',
            message: `New division operation requested: ${num1} / ${num2}`
        });
        res.send(`The result of ${num1} / ${num2} is ${result}.`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = logger;