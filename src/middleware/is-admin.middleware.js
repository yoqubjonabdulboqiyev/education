const Admins = require("../models/admin");
const CustomError = require("../utils/custom-error");


const isAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        console.log(user.phoneNumber);
        const admin = await Admins.findOne({ phoneNumber: user.phoneNumber })
        if (!admin) {
            // throw new CustomError(403, "Permission denied")
            return res.status(403).json({ message: "Permission denied" })
        }
        req.admin = admin;
        next()
    } catch (err) {
        res.status(403).json({ message: err.message });
        next(err);
    }
}
module.exports = isAdmin;