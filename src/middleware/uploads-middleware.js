const { v4: uuid } = require("uuid");
const path = require("path");

const uploads = async (req, res, next) => {
    try {
        const file = req.files?.photo;
        if (file) {
            const fileName = uuid() + path.extname(file.name);
            file.mv(process.cwd() + '/uploads/' + fileName)
            req.body.photoUrl = fileName;
        }
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
        console.log(error.message);
        next(error);
    }
};

module.exports = uploads;