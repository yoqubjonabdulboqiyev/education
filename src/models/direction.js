const { Schema } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

const Direction = mongoose.model("direction", schema);
module.exports = Direction;