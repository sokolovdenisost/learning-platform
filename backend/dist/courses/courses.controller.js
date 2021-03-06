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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async getProvenCourses(res) {
        const result = await this.coursesService.getProvenCourses();
        res.json(result).status(result.code);
    }
    async getUntestedCourses(res) {
        const result = await this.coursesService.getUntestedCourses();
        res.json(result).status(result.code);
    }
    async getCreatedCoursesByUserId(res, id) {
        const result = await this.coursesService.getCreatedCoursesByUserId(id);
        res.json(result).status(result.code);
    }
    async getTakeCoursesByUserId(res, id) {
        const result = await this.coursesService.getTakeCoursesByUserId(id);
        res.json(result).status(result.code);
    }
    async getFavoriteCourses(res, id) {
        const result = await this.coursesService.getFavoriteCourses(id);
        res.json(result).status(result.code);
    }
    async getCompletedCourses(res, id) {
        const result = await this.coursesService.getCompletedCourses(id);
        res.json(result).status(result.code);
    }
    async getAllCourses(res) {
        const result = await this.coursesService.getAllCourses();
        res.json(result).status(result.code);
    }
};
__decorate([
    (0, common_1.Get)('proven-courses'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getProvenCourses", null);
__decorate([
    (0, common_1.Get)('untested-courses'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getUntestedCourses", null);
__decorate([
    (0, common_1.Get)(':id/created-courses'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCreatedCoursesByUserId", null);
__decorate([
    (0, common_1.Get)(':id/take-courses'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getTakeCoursesByUserId", null);
__decorate([
    (0, common_1.Get)(':id/favorite-courses'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getFavoriteCourses", null);
__decorate([
    (0, common_1.Get)(':id/completed-courses'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCompletedCourses", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getAllCourses", null);
CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map