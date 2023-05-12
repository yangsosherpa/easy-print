const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        required: true,
        enum: ['pdf', 'jpeg', 'jpg', 'png', 'docx', 'xlxs'],
    },
    size: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;