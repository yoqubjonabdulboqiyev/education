const { Schema, model } = require("mongoose");


const schema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true, 
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    photoUrl: {
        type: String,
        default: "dedefault.png",
        trim: true
    }
})


module.exports = model("Admin", schema);;