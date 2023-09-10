const { Schema } = require("mongoose");

const schema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    parents: {
        phoneNumber: {
            type: String,
            trim: true,
            required: true
        },
        fullName: {
            type: String,
            trim: true,
            required: true
        }
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
    },
    active: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', schema);

module.exports = User;