const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

const Direction = model("direction", schema);
module.exports = Direction;