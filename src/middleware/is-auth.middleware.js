const config = require("../../config");
const { verifyToken } = require("../utils/jwt");



const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;
    try {
        const decoded = verifyToken(token, config.JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = auth;