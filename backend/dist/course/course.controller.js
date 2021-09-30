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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const course_service_1 = require("./course.service");
const course_dto_1 = require("./dto/course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async test(res) {
        const result = await this.courseService.test();
        res.json(result).status(result.code);
    }
    async getCourseById(res, id) {
        const result = await this.courseService.getCourseById(id);
        res.json(result).status(result.code);
    }
    async getCourseByIdAndUserId(res, params) {
        const result = await this.courseService.getCourseByIdAndUserId(params.id, params.user_id);
        res.json(result).status(result.code);
    }
    async joinCourse(res, body) {
        const result = await this.courseService.joinCourse(body);
        res.json(result).status(result.code);
    }
    async createCourse(res, body, file) {
        const result = await this.courseService.createCourse(body, file);
        res.json(result).status(result.code);
    }
    async editCourse(res, body, id, file) {
        const result = await this.courseService.editCourseById(body, id, file);
        res.json(result).status(result.code);
    }
    async toggleFavoriteCourse(res, body) {
        const result = await this.courseService.toggleFavorite(body);
        res.json(result).status(result.code);
    }
    async setRatingForCourse(res, body, id) {
        const result = await this.courseService.ratingForCourse(body, id);
        res.json(result).status(result.code);
    }
    async nextLesson(res, body) {
        const result = await this.courseService.nextLesson(body);
        res.json(result).status(result.code);
    }
    async deleteCourse(res, id, body) {
        const result = await this.courseService.deleteCourse(id, body.user_id);
        res.json(result).status(result.code);
    }
};
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "test", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Get)('edit/:id/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseByIdAndUserId", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.JoinCourseDTO]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "joinCourse", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.CreateCourseDTO, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)('edit-course/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.EditCourseDTO, String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "editCourse", null);
__decorate([
    (0, common_1.Post)('favorite'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.FavoriteCourseDTO]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "toggleFavoriteCourse", null);
__decorate([
    (0, common_1.Post)('rating/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.RatingForCourseDTO, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "setRatingForCourse", null);
__decorate([
    (0, common_1.Post)('next-lesson'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.NextLessonDTO]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "nextLesson", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, course_dto_1.DeleteCourseDTO]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map