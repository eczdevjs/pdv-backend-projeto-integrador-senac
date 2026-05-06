
const logger = require('../utils/logger');


module.exports = (err, req, res, next) => {
    const userId = req.userId || 'Anonymous';
  
    logger.error(`${err.name}: ${err.message}`, {
        userId,
        url: req.originalUrl,
        method: req.method,
        stack: err.stack
    });


    if (err.name?.startsWith('Sequelize')) {
        switch (err.name) {
            case "SequelizeUniqueConstraintError":
                return res.status(400).json({
                    message: "Duplicated value: A record with these fields already exists",
                    details: err.errors?.map(e => e.message || [])
                });

            case "SequelizeValidationError":
                const errorMessages = err.errors.map(error => error.message);
        
                return res.status(400).json({
                    message: err.message || 'Validation error: Check input data',
                    details: errorMessages
                });

            case "SequelizeForeignKeyConstraintError":
                return res.status(400).json({
                    message: "Record is linked to another entity, or data sent is not matching references verify data",
                    details: err.fields || []
                })
            case "SequelizeDatabaseError":
                return res.status(500).json({
                    message: "Database error: check server logs for details"
                });

            default:
                return res.status(500).json({
                    message: `'Unhandled error: ${err.message}'`
                });
        }

    }

    if (err.isCustomError) {
        return res.status(err.statusCode || 400).json({ message: err.message || "Bad request" });
      
    }

    return res.status(500).json({
        message: "Internal server error. Please try again later"
    })

};