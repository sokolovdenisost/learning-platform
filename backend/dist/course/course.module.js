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
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const course_schema_1 = require("../schemas/course.schema");
const lesson_schema_1 = require("../schemas/lesson.schema");
const photo_schema_1 = require("../schemas/photo.schema");
const user_schema_1 = require("../schemas/user.schema");
const validate_module_1 = require("../validate/validate.module");
const course_controller_1 = require("./course.controller");
const course_service_1 = require("./course.service");
let CourseModule = class CourseModule {
    constructor(courseService) {
        this.courseService = courseService;
    }
};
CourseModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: lesson_schema_1.Lesson.name, schema: lesson_schema_1.LessonSchema },
                { name: photo_schema_1.Photo.name, schema: photo_schema_1.PhotoSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            validate_module_1.ValidateModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        exports: [course_service_1.CourseService],
    }),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map