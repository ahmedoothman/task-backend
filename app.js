const express = require('express'); // import express
////////////////////////////////////////////////////////
const quizRouter = require('./routes/quizRoutes.js');
const announcementRouter = require('./routes/announcementRoutes.js');
const errorController = require('./controllers/errorController');

//secuirty
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError.js');
const app = express(); // creating express app
// cors
app.use(cors());
//multiple request attack
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests drom this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' })); // we need that middleware for convert the url we got to json (not sure)
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); //Data sensitization against no SQL query injection
app.use(xss()); //Data sensitization against XSS
app.use(
    hpp({
        whitelist: [],
    })
);
//routes
app.use('/api/img', express.static(`${__dirname}/img`));
app.use('/api/quiz', quizRouter);
app.use('/api/announcement', announcementRouter);
//unhandeled routes gets response with this , must be put at the end of the file after all routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // node js understand that , when we pass a parameter to next() it means that is an error and will skip all middlewares and send it to the global error handling middleware
});

app.use(errorController);
module.exports = app; // we export it to the server file where we will include it there
