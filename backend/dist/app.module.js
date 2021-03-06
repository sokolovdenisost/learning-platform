"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const settings_module_1 = require("./settings/settings.module");
const course_module_1 = require("./course/course.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const cloudinary_provider_1 = require("./cloudinary/cloudinary.provider");
const courses_module_1 = require("./courses/courses.module");
const validate_module_1 = require("./validate/validate.module");
const lesson_module_1 = require("./lesson/lesson.module");
const user_module_1 = require("./user/user.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dv9wr.mongodb.net/learningPlatform'),
            auth_module_1.AuthModule,
            settings_module_1.SettingsModule,
            course_module_1.CourseModule,
            cloudinary_module_1.CloudinaryModule,
            courses_module_1.CoursesModule,
            validate_module_1.ValidateModule,
            lesson_module_1.LessonModule,
            user_module_1.UserModule,
            admin_module_1.AdminModule,
        ],
        controllers: [],
        providers: [cloudinary_provider_1.CloudinaryProvider],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map