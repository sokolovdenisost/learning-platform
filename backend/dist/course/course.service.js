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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const validate_service_1 = require("../validate/validate.service");
const photo_schema_1 = require("../schemas/photo.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const user_schema_1 = require("../schemas/user.schema");
let CourseService = class CourseService {
    constructor(courseModel, lessonModel, photoModel, userModel, validateService, cloudinaryService) {
        this.courseModel = courseModel;
        this.lessonModel = lessonModel;
        this.photoModel = photoModel;
        this.userModel = userModel;
        this.validateService = validateService;
        this.cloudinaryService = cloudinaryService;
    }
    async getCourseByIdAndUserId(id, user_id) {
        if (mongoose.isValidObjectId(id) && mongoose.isValidObjectId(user_id)) {
            const course = await this.courseModel.findById(id).populate('lessons');
            if (course) {
                if (String(course.owner) === user_id) {
                    return { code: 200, text: `Course ${id}`, type: 'Success', course };
                }
                else {
                    return { code: 404, text: 'Course is not found', type: 'Error' };
                }
            }
            else {
                return { code: 404, text: 'Course is not found', type: 'Error' };
            }
        }
        else {
            return { code: 404, text: 'Course is not found', type: 'Error' };
        }
    }
    async editCourseById(body, id, file) {
        if (mongoose.isValidObjectId(id)) {
            const course = await this.courseModel.findById(id);
            if (course && String(course.owner) === body.user_id) {
                const tags = JSON.parse(body.tags);
                if (file) {
                    const result = await this.cloudinaryService.uploadFunc(file);
                    const photo = await new this.photoModel({ photo_url: result.url, public_id: result.public_id });
                    await this.courseModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, body), { tags, image: { photo_url: result.url, public_id: result.public_id } }));
                    await photo.save();
                }
                else {
                    await this.courseModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, body), { tags }));
                }
                return { code: 200, text: 'Course is update', type: 'Success' };
            }
            else {
                return { code: 404, text: 'Course not found', type: 'Error' };
            }
        }
    }
    async getCourseById(id) {
        if (mongoose.isValidObjectId(id)) {
            const course = await this.courseModel.findById(id).populate('owner', 'firstName lastName');
            if (course) {
                return { code: 200, text: `Course ${id}`, type: 'Success', course };
            }
            else {
                return { code: 404, text: 'Course not found', type: 'Error' };
            }
        }
        else {
            return { code: 404, text: 'Course not found', type: 'Error' };
        }
    }
    async createCourse(body, file) {
        const { _id, certificate, description, level, tags, title } = body;
        if (file) {
            if (_id.trim() && certificate && description.trim() && level && tags && title.trim()) {
                if (!this.validateService.validateLength(title, 50, 10)) {
                    return { code: 400, text: 'Title must have more than 10 characters but less than 50', type: 'Error' };
                }
                if (!this.validateService.validateLength(description, 1000, 100)) {
                    return {
                        code: 400,
                        text: 'Description must have more than 100 characters but less than 1000',
                        type: 'Error',
                    };
                }
                const uploadFile = await this.cloudinaryService.uploadImage(file);
                const photo = await new this.photoModel({
                    photo_url: uploadFile.url,
                    public_id: uploadFile.public_id,
                });
                await photo.save();
                const course = await new this.courseModel({
                    owner: _id,
                    certificate,
                    description,
                    image: photo,
                    level,
                    tags: JSON.parse(tags),
                    title,
                });
                await course.save();
                return { code: 200, text: 'Course is created', type: 'Success', course_id: course._id.toString() };
            }
            else {
                return { code: 400, text: 'Not all fields are filled', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Not image found', type: 'Error' };
        }
    }
    async deleteCourse(id, user_id) {
        if (mongoose.isValidObjectId(id) && mongoose.isValidObjectId(user_id)) {
            const user = await this.userModel.findById(user_id);
            const completedCoursesForUsers = await this.userModel.find({ completedCourses: { $all: [id] } });
            const takeCoursesForUsers = await this.userModel.find({ 'takeCourses.course': id });
            const course = await this.courseModel.findById(id);
            if ((course && String(course.owner) === user_id) || user.role === 'admin') {
                completedCoursesForUsers.forEach(async (user) => {
                    const idx = user.completedCourses.findIndex((id) => id === course._id);
                    user.completedCourses.splice(idx, 1);
                    await user.save();
                });
                takeCoursesForUsers.forEach(async (user) => {
                    const idx = user.takeCourses.findIndex((c) => c.course === course._id);
                    user.takeCourses.splice(idx, 1);
                    await user.save();
                });
                await this.courseModel.findByIdAndDelete(id);
                return { code: 200, text: 'Course is delete', type: 'Success' };
            }
            else {
                return { code: 400, text: 'Course is not found', type: 'Error' };
            }
        }
        return { code: 404, text: 'Course is not found', type: 'Error' };
    }
    async toggleFavorite(body) {
        if (mongoose.isValidObjectId(body.course_id) && mongoose.isValidObjectId(body.user_id)) {
            const course = await this.courseModel.findById(body.course_id);
            if (course) {
                const user = await this.userModel.findById(body.user_id);
                if (user) {
                    const check = course.favorites.filter((c) => String(c) === body.user_id);
                    if (check.length) {
                        const idx = course.favorites.findIndex((c) => c === course._id);
                        course.favorites.splice(idx, 1);
                        await course.save();
                        return { code: 200, text: 'Remove favorite', type: 'Success' };
                    }
                    else {
                        course.favorites.push(user._id);
                        await course.save();
                        return { code: 200, text: 'Add favorite', type: 'Success' };
                    }
                }
                else {
                    return { code: 401, text: 'Unauthorized', type: 'Error' };
                }
            }
            else {
                return { code: 404, text: 'Course is not found', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Invalid data', type: 'Error' };
        }
    }
    async ratingForCourse(body, course_id) {
        if (mongoose.isValidObjectId(body.user) && mongoose.isValidObjectId(course_id)) {
            const user = await this.userModel.findById(body.user);
            const course = await this.courseModel.findById(course_id);
            if (!user) {
                return { code: 400, text: 'Unauthorized', type: 'Error' };
            }
            if (course && user) {
                const check = course.rating.filter((r) => String(r.user) === body.user);
                if (check.length) {
                    return { code: 200, text: 'The rating is already', type: 'Success' };
                }
                else {
                    course.rating.push({
                        user: body.user,
                        ratingNum: body.rating,
                    });
                    await course.save();
                    return { code: 200, text: 'Successfully rated', type: 'Success' };
                }
            }
            else {
                return { code: 404, text: 'Course is not found', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Invalid data', type: 'Error' };
        }
    }
    async joinCourse(body) {
        if (mongoose.isValidObjectId(body.user_id) && mongoose.isValidObjectId(body.course_id)) {
            const user = await this.userModel.findById(body.user_id);
            const course = await this.courseModel.findById(body.course_id);
            if (user && course) {
                const checkTakeCourse = user.takeCourses.filter((c) => String(c.course) === String(course._id));
                const checkCompletedCourse = user.completedCourses.filter((c) => String(c) === String(course._id));
                if (checkTakeCourse.length || checkCompletedCourse.length) {
                    return { code: 200, text: 'You are already taking this course', type: 'Success' };
                }
                else {
                    user.takeCourses.push({
                        course: course,
                        currentLesson: 1,
                    });
                    await user.save();
                    return { code: 200, text: 'Joined the course', type: 'Success' };
                }
            }
            else {
                return { code: 404, text: 'User and course is not found', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'For user and course is not valid id', type: 'Error' };
        }
    }
    async nextLesson(body) {
        if (mongoose.isValidObjectId(body.course_id) &&
            mongoose.isValidObjectId(body.user_id) &&
            mongoose.isValidObjectId(body.lesson_id)) {
            const course = await this.courseModel.findById(body.course_id);
            const user = await this.userModel.findById(body.user_id);
            const lesson = await this.lessonModel.findById(body.lesson_id);
            if (course && user && lesson) {
                const idxCourseTaked = user.takeCourses.findIndex((crs) => String(crs.course) === String(course._id));
                const idxCourseCompleted = user.completedCourses.findIndex((crs) => String(crs) === String(course._id));
                if (idxCourseTaked >= 0) {
                    const idxLesson = course.lessons.findIndex((les) => String(les) === body.lesson_id);
                    if (user.takeCourses[idxCourseTaked].currentLesson < course.lessons.length) {
                        user.takeCourses[idxCourseTaked] = Object.assign(Object.assign({}, user.takeCourses[idxCourseTaked]), { course, currentLesson: idxLesson + 2 });
                        await user.save();
                        return { code: 200, text: 'Text', type: 'Success', nextLessonId: course.lessons[idxLesson + 1] };
                    }
                    else if (course.lessons.length === user.takeCourses[idxCourseTaked].currentLesson) {
                        user.takeCourses.splice(idxCourseTaked, 1);
                        user.completedCourses.push(course);
                        await user.save();
                        return { code: 200, text: 'Completed course', type: 'Success' };
                    }
                    else if (user.takeCourses[idxCourseTaked].currentLesson > course.lessons.length) {
                        const check = user.completedCourses.filter((c) => String(c) === String(course._id));
                        if (check.length) {
                            user.takeCourses.splice(idxCourseTaked, 1);
                            await user.save();
                            return { code: 200, text: 'Course is already completed', type: 'Success' };
                        }
                    }
                }
                else if (idxCourseCompleted >= 0) {
                    return { code: 200, text: 'Course is already completed', type: 'Success' };
                }
                return { code: 400, text: 'Take course not found', type: 'Error' };
            }
            else {
                return { code: 404, text: 'Course or user or lesson not found', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Invalid id', type: 'Error' };
        }
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(lesson_schema_1.Lesson.name)),
    __param(2, (0, mongoose_1.InjectModel)(photo_schema_1.Photo.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        validate_service_1.ValidateService,
        cloudinary_service_1.CloudinaryService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map