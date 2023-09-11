const { Schema, model } = require("mongoose");

const schema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

const Attendance = model('Attendance', schema);

module.exports = Attendance;