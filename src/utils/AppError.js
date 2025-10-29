

class AppError extends Error {

    constructor(msg, statusCode = 400){
        super(message);
        this.statusCode = statusCode,
        this.isCustomError = true
    }

}

module.exports = AppError;