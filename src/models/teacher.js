const { model } = require("mongoose");
const { Schema } = require("mongoose");

const schema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    photoUrl: {
        type: String,
        default: "default.jpg",
        trim: true
    },
    derectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Derection',
        required: true
    }
});

const Teacher = model('Teacher', schema);

module.exports = Teacher;