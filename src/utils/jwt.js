

const { sign, verify } = require("jsonwebtoken");
const config = require("../../config");

const signToken = (payload) => sign(payload, config.JWT_SECRET, { expiresIn: "24h" });
const verifyToken = (payload, callback) => verify(payload, config.JWT_SECRET, callback);

module.exports = {
    signToken,
    verifyToken
}