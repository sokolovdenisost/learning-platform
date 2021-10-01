"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_interface_1 = require("../error.interface");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const photo_schema_1 = require("../schemas/photo.schema");
const user_schema_1 = require("../schemas/user.schema");
let LessonService = class LessonService {
    constructor(courseModel, lessonModel, photoModel, userModel) {
        this.courseModel = courseModel;
        this.lessonModel = lessonModel;
        this.photoModel = photoModel;
        this.userModel = userModel;
    }
    async createLesson(body) {
        const course = await this.courseModel.findById(body._id);
        const lesson = await new this.lessonModel({ course: body._id, array: body.array });
        await lesson.save();
        course.lessons.push(lesson);
        await course.save();
        return { code: 200, text: 'Lesson is added', type: 'Success' };
    }
    async editLesson(body) {
        if ((0, mongoose_2.isValidObjectId)(body.course_id) && (0, mongoose_2.isValidObjectId)(body.lesson_id)) {
            const course = await this.courseModel.findById(body.course_id);
            if (course) {
                const check = course.lessons.find((lesson) => String(lesson) === body.lesson_id);
                if (check) {
                    await this.lessonModel.findByIdAndUpdate(body.lesson_id, { array: body.array });
                    return { code: 200, text: 'Lesson is update', type: 'Success' };
                }
                else {
                    return { code: 404, text: 'Course is not found', type: 'Error' };
                }
            }
            else {
                return { code: 404, text: 'Course is not found', type: 'Error' };
            }
        }
    }
    async deleteLesson(body) {
        if ((0, mongoose_2.isValidObjectId)(body.course_id) && (0, mongoose_2.isValidObjectId)(body.lesson_id)) {
            const course = await this.courseModel.findById(body.course_id);
            if (course) {
                await this.lessonModel.findByIdAndDelete(body.lesson_id);
                course.lessons = course.lessons.filter((lesson) => String(lesson) !== body.lesson_id);
                await course.save();
                return { code: 200, text: 'Lesson is deleted', type: 'Success' };
            }
            else {
                return { code: 404, text: 'Course is not found', type: 'Error' };
            }
        }
    }
    async getEditLessonByCourse(lesson_id, user_id) {
        if ((0, mongoose_2.isValidObjectId)(lesson_id) && (0, mongoose_2.isValidObjectId)(user_id)) {
            const lesson = await this.lessonModel.findById(lesson_id).populate('course');
            if (lesson) {
                const checkOwner = String(lesson.course.owner) === user_id;
                if (checkOwner) {
                    return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
                }
                else {
                    return { code: 403, text: 'No access to the lesson', type: 'Error' };
                }
            }
            else {
                return { code: 404, text: 'Lesson is not found', type: 'Error' };
            }
        }
        else {
            return { code: 404, text: 'Invalid id', type: 'Error' };
        }
    }
    async getLessonById(lesson_id, user_id) {
        if ((0, mongoose_2.isValidObjectId)(lesson_id) && (0, mongoose_2.isValidObjectId)(user_id)) {
            const lesson = await this.lessonModel
                .findById(lesson_id)
                .populate({
                path: 'course',
                populate: {
                    path: 'owner',
                    select: '_id firstName lastName',
                },
            })
                .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id firstName lastName avatar',
                },
            });
            const course = await this.courseModel.findById(lesson.course);
            const user = await this.userModel.findById(user_id);
            if (String(course.owner) === String(user._id)) {
                return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
            }
            if (course && lesson && user) {
                const checkTaked = user.takeCourses.filter((c) => String(c.course) === String(course._id));
                const checkCompleted = user.completedCourses.filter((c) => String(c) === String(course._id));
                if (checkTaked || checkCompleted) {
                    const checkAccess = course.lessons.findIndex((l) => String(l) === String(lesson._id));
                    if (checkCompleted || checkAccess <= checkTaked[0]['currentLesson'] - 1) {
                        return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
                    }
                    else {
                        return { code: 400, text: 'No access to the lesson', type: 'Error' };
                    }
                }
                else {
                    return { code: 400, text: 'No access to the lesson', type: 'Error' };
                }
            }
            else {
                return { code: 404, text: 'Lesson is not found', type: 'Error' };
            }
        }
        else {
            return { code: 404, text: 'Lesson is not found', type: 'Error' };
        }
    }
    async addCommentInLesson(lesson_id, body) {
        if ((0, mongoose_2.isValidObjectId)(lesson_id) && body.user.trim() && body.comment.trim().length >= 5) {
            const lesson = await this.lessonModel.findById(lesson_id);
            if (lesson) {
                lesson.comments.push({
                    user: body.user,
                    comment: body.comment,
                });
                await lesson.save();
                return { code: 200, text: 'Add comment in lesson', type: 'Success' };
            }
            else {
                return { code: 404, text: 'Lesson not found', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Invalid data', type: 'Error' };
        }
    }
};
LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(lesson_schema_1.Lesson.name)),
    __param(2, (0, mongoose_1.InjectModel)(photo_schema_1.Photo.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LessonService);
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map