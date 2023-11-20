const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Quiz must have a name '],
        trim: true,
    },
    course: {
        type: String,
        required: [true, 'Quiz must have a course '],
        trim: true,
    },
    topic: {
        type: String,
        required: [true, 'Quiz must have a topic '],
        trim: true,
    },
    dueTo: {
        type: Date,
        required: [true, 'Quiz must have a dueTo '],
        trim: true,
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
