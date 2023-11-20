const Announcement = require('../model/announcementModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAnnouncement = catchAsync(async (req, res, next) => {
    // check name , course , topic , dueTo
    if (!req.body.topic || !req.body.content || !req.body.author) {
        return next(new AppError('Some Data are missing', 400));
    }

    const doc = await Announcement.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});
exports.updateAnnouncement = factory.updateOne(Announcement);
exports.getAllAnnouncements = factory.getAll(Announcement);
exports.getAnnouncement = factory.getOne(Announcement);
exports.deleteAnnouncement = factory.deleteOne(Announcement);
