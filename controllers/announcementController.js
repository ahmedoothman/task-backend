const Announcement = require('../model/announcementModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAnnouncement = factory.createOne(Announcement);
exports.updateAnnouncement = factory.updateOne(Announcement);
exports.getAllAnnouncements = factory.getAll(Announcement);
exports.getAnnouncement = factory.getOne(Announcement);
exports.deleteAnnouncement = factory.deleteOne(Announcement);
