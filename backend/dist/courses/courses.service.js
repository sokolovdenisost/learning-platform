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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("../schemas/course.schema");
const user_schema_1 = require("../schemas/user.schema");
let CoursesService = class CoursesService {
    constructor(courseModel, userModel) {
        this.courseModel = courseModel;
        this.userModel = userModel;
    }
    async getCreatedCoursesByUserId(id) {
        if ((0, mongoose_2.isValidObjectId)(id)) {
            const courses = await this.courseModel.find({ owner: id }).populate('owner', 'firstName lastName');
            return { code: 200, text: 'All courses', type: 'Success', courses: courses };
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
    async getTakeCoursesByUserId(id) {
        if ((0, mongoose_2.isValidObjectId)(id)) {
            const user = await this.userModel.findById(id).populate({
                path: 'takeCourses',
                populate: {
                    path: 'course',
                    populate: {
                        path: 'owner',
                        select: '_id firstName lastName',
                    },
                },
            });
            if (user) {
                return { code: 200, text: 'All take courses', type: 'Success', courses: user.takeCourses };
            }
            else {
                return { code: 400, text: 'Error', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
    async getFavoriteCourses(id) {
        if ((0, mongoose_2.isValidObjectId)(id)) {
            const courses = await this.courseModel
                .find({ favorites: { $all: [id] } })
                .populate('owner', '_id firstName lastName');
            return { code: 200, text: `Favorite courses`, type: 'Success', courses };
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
    async getCompletedCourses(id) {
        if ((0, mongoose_2.isValidObjectId)(id)) {
            const user = await this.userModel.findById(id).populate({
                path: 'completedCourses',
                populate: {
                    path: 'owner',
                    select: '_id firstName lastName',
                },
            });
            console.log(user);
            return { code: 200, text: `Completed courses`, type: 'Success', courses: user.completedCourses };
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
    async getProvenCourses() {
        const courses = await this.courseModel.find({ isVerification: true });
        return { code: 200, text: 'Proven courses', type: 'Success', courses };
    }
    async getUntestedCourses() {
        const courses = await this.courseModel.find({ isVerification: false });
        return { code: 200, text: 'Untested courses', type: 'Success', courses };
    }
    async getAllCourses() {
        const courses = await this.courseModel.find({}).populate('owner', '_id firstName lastName');
        return { code: 200, text: 'This all courses', courses: courses.reverse() };
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map