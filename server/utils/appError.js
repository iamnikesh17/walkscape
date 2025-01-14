const appError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.status = 'fail';
    return error;
};

module.exports = appError;





