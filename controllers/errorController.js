const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    // Check if err or errmsg is undefined
    if (!err || !err.errmsg) {
        return new AppError(
            'Duplicate field value. Please use another value!',
            400
        );
    }

    // Using a safer method to extract the value causing the duplication error
    const match = err.errmsg.match(/(["'])(\\?.)*?\1/);

    // Check if match is null or undefined before accessing its index
    if (!match || !match[0]) {
        return new AppError(
            'Duplicate field value. Please use another value!',
            400
        );
    }

    const value = match[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR !!', err);
    // 2) Send generic message
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

module.exports = (err, req, res, next) => {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV.trim() === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV.trim() === 'production') {
        let error = { ...err };
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        sendErrorProd(error, req, res);
    }
};
