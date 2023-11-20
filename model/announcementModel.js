const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, 'Announcement must have a topic '],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Announcement must have a content '],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Announcement must have a author '],
    },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
