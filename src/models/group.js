const { Schema, model } = require("mongoose");

const schema = new Schema({
   
    lessonDay: {
        type: String,
        trim: true,
        required: true
    },
    lessonDate: {
        type: new Date(),
        required: true,
        trim: true
    },
    derectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Derection',
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

const Group = model('Group', schema);

module.exports = Group;