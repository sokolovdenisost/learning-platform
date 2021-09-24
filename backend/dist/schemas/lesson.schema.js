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
exports.LessonSchema = exports.Lesson = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const course_schema_1 = require("./course.schema");
let Lesson = class Lesson {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Types.ObjectId, ref: 'Course' }),
    __metadata("design:type", course_schema_1.Course)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ typeForm: String, text: String }] }),
    __metadata("design:type", Array)
], Lesson.prototype, "array", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            { user: { type: mongoose.Types.ObjectId, ref: 'User' }, comment: String, date: { type: String, default: new Date().toLocaleDateString() } },
        ],
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "comments", void 0);
Lesson = __decorate([
    (0, mongoose_1.Schema)()
], Lesson);
exports.Lesson = Lesson;
exports.LessonSchema = mongoose_1.SchemaFactory.createForClass(Lesson);
//# sourceMappingURL=lesson.schema.js.map