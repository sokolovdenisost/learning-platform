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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const course_schema_1 = require("../schemas/course.schema");
const notification_schema_1 = require("../schemas/notification.schema");
const photo_schema_1 = require("../schemas/photo.schema");
const user_schema_1 = require("../schemas/user.schema");
let AdminService = class AdminService {
    constructor(courseModel, photoModel, userModel, notificationModel, cloudinaryService) {
        this.courseModel = courseModel;
        this.photoModel = photoModel;
        this.userModel = userModel;
        this.notificationModel = notificationModel;
        this.cloudinaryService = cloudinaryService;
    }
    async deletesImageDontUse() {
        try {
            const courses = await this.courseModel.find();
            const users = await this.userModel.find();
            const photos = await this.photoModel.find();
            const allUsePhotos = [];
            const allPhotos = [];
            const allDeletePhotoIDS = [];
            courses.forEach((course) => allUsePhotos.push(course.image.public_id));
            users.forEach((user) => allUsePhotos.push(user.avatar.public_id));
            photos.forEach((photo) => allPhotos.push(photo));
            for (let elem of allPhotos) {
                const check = allUsePhotos.find((c) => c === elem.public_id);
                if (check === undefined) {
                    allDeletePhotoIDS.push(elem);
                }
            }
            allDeletePhotoIDS.forEach(async (photo) => {
                await this.photoModel.findByIdAndDelete(photo._id);
                await this.cloudinaryService.removeImage(photo.public_id);
            });
            return { code: 200, text: 'Photos that are not in use deleted', type: 'Success' };
        }
        catch (e) {
            return { code: 500, text: e.message, type: 'Error' };
        }
    }
    async getAllUsers() {
        const users = await this.userModel.find();
        return { code: 200, text: 'All users', type: 'Success', users };
    }
    async setVerified(id) {
        if ((0, mongoose_2.isValidObjectId)(id)) {
            await this.courseModel.findByIdAndUpdate(id, { isVerification: true });
            return { code: 200, text: 'Course is verified!', type: 'Success' };
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
    async sendNotification(body) {
        if ((0, mongoose_2.isValidObjectId)(body.user_id)) {
            if (body.text.trim() && body.type.trim()) {
                const notification = await new this.notificationModel(body);
                await notification.save();
                return { code: 200, text: 'Notification is created!', type: 'Success' };
            }
            else {
                return { code: 400, text: 'Not all fields are filled', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'ID is not valid', type: 'Error' };
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(photo_schema_1.Photo.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map