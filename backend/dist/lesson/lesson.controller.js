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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const lesson_dto_1 = require("./dto/lesson.dto");
const lesson_service_1 = require("./lesson.service");
let LessonController = class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async createLesson(res, body) {
        const result = await this.lessonService.createLesson(body);
        res.json(result).status(result.code);
    }
    async editLesson(res, body) {
        const result = await this.lessonService.editLesson(body);
        res.json(result).status(result.code);
    }
    async getEditLessonByCourse(res, params) {
        const result = await this.lessonService.getEditLessonByCourse(params.lesson_id, params.user_id);
        res.json(result).status(result.code);
    }
    async deleteLesson(res, body) {
        const result = await this.lessonService.deleteLesson(body);
        res.json(result).status(result.code);
    }
    async getLessonById(res, params) {
        const result = await this.lessonService.getLessonById(params.lesson_id, params.user_id);
        res.json(result).status(result.code);
    }
    async addCommentInLesson(res, id, body) {
        const result = await this.lessonService.addCommentInLesson(id, body);
        res.json(result).status(result.code);
    }
};
__decorate([
    common_1.Post('create-lesson'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_dto_1.CreateLessonDTO]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "createLesson", null);
__decorate([
    common_1.Post('edit-lesson'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_dto_1.EditLessonDTO]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "editLesson", null);
__decorate([
    common_1.Get('edit-lesson/:lesson_id/:user_id'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getEditLessonByCourse", null);
__decorate([
    common_1.Post('delete-lesson'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_dto_1.DeleteLessonDTO]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deleteLesson", null);
__decorate([
    common_1.Get(':lesson_id/:user_id'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLessonById", null);
__decorate([
    common_1.Post(':lesson_id/add-comment'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('lesson_id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, lesson_dto_1.AddCommentIdLessonDTO]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "addCommentInLesson", null);
LessonController = __decorate([
    common_1.Controller('lesson'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map