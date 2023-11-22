const Quiz = require('../model/quizModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuiz = factory.createOne(Quiz);
exports.updateQuiz = factory.updateOne(Quiz);
exports.getAllQuizs = factory.getAll(Quiz);
exports.getQuiz = factory.getOne(Quiz);
exports.deleteQuiz = factory.deleteOne(Quiz);
