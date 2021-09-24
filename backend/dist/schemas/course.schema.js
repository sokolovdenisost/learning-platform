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
exports.CourseSchema = exports.Course = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const photo_schema_1 = require("./photo.schema");
let Course = class Course {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Course.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: photo_schema_1.Photo, required: true }),
    __metadata("design:type", photo_schema_1.Photo)
], Course.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Course.prototype, "certificate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Course.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' }),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, ratingNum: Number }] }),
    __metadata("design:type", Array)
], Course.prototype, "rating", void 0);
Course = __decorate([
    (0, mongoose_1.Schema)()
], Course);
exports.Course = Course;
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
//# sourceMappingURL=course.schema.js.map