module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.name?.startsWith('Sequelize')) {
        switch (err.name) {
            case "SequelizeUniqueConstraintError":
                return res.status(400).json({
                    msg: "Duplicated value: A record with these fields already exists",
                    details: err.errors?.map(e => e.message || [])
                });
            case "SequelizeValidationError":
                return res.status(400).json({
                    msg:  err.message || 'Validation error: Check input data',
                    details: err.fields || []
                });

            case "SequelizeforeignKeyConstraintError":
                return res.status(400).json({
                    msg: "Record is linked to another entity",
                    details: err.fields || []
                })
            case "SequelizeDatabaseError":
                return res.status(500).json({
                    msg: "Database error: check server logs for details"
                });
            default:
                return res.status(500).json({
                    msg: 'Unhandled error'
                });
        }

    }

if(err.isCustomError){
        return res.status(err.statusCode || 400).json({msg: err.message || "Bad request"})
    }

    return res.status(500).json({
        msg: "Internal server error. Please try again later"
    })

};