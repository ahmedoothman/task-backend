const Quiz = require('../model/quizModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuiz = catchAsync(async (req, res, next) => {
    // check name , course , topic , dueTo
    if (
        !req.body.name ||
        !req.body.course ||
        !req.body.topic ||
        !req.body.dueTo
    ) {
        return next(new AppError('Some Data are missing', 400));
    }

    const doc = await Quiz.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});
exports.updateQuiz = factory.updateOne(Quiz);
exports.getAllQuizs = factory.getAll(Quiz);
exports.getQuiz = factory.getOne(Quiz);
exports.deleteQuiz = factory.deleteOne(Quiz);
