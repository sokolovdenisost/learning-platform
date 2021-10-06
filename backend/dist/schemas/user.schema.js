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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const photo_schema_1 = require("./photo.schema");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: photo_schema_1.Photo,
        default: {
            public_id: '',
            photo_url: 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
        },
    }),
    __metadata("design:type", photo_schema_1.Photo)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: new Date().toLocaleDateString() }),
    __metadata("design:type", String)
], User.prototype, "registered", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ course: { type: mongoose.Types.ObjectId, ref: 'Course' }, currentLesson: Number }] }),
    __metadata("design:type", Array)
], User.prototype, "takeCourses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Types.ObjectId, ref: 'Course' }] }),
    __metadata("design:type", Array)
], User.prototype, "completedCourses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map