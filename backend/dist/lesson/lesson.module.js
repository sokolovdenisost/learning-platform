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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const photo_schema_1 = require("../schemas/photo.schema");
const user_schema_1 = require("../schemas/user.schema");
const lesson_controller_1 = require("./lesson.controller");
const lesson_service_1 = require("./lesson.service");
let LessonModule = class LessonModule {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
};
LessonModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: lesson_schema_1.Lesson.name, schema: lesson_schema_1.LessonSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: photo_schema_1.Photo.name, schema: photo_schema_1.PhotoSchema },
            ]),
        ],
        controllers: [lesson_controller_1.LessonController],
        providers: [lesson_service_1.LessonService],
        exports: [lesson_service_1.LessonService],
    }),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonModule);
exports.LessonModule = LessonModule;
//# sourceMappingURL=lesson.module.js.map