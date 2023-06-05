const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    files: [
        {
            originalname: {type: String, required: true},
            filename: {type: String, required: true},
            contentType: {type: String, requires: true},
            data: {type: Buffer, required: true}
        }
    ],
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    dropPoint: {
        type: String,
        default: 'sjc'
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Order = mongoose.model('Order', fileSchema);
module.exports = Order;
