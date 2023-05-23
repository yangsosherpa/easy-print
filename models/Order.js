const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    files: [{
        type: String,
        required: true,
    }],
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    dropPoint: {
        type: String,
        default: 'sjc'
    }
});

const Order = mongoose.model('Order', fileSchema);
module.exports = Order;
