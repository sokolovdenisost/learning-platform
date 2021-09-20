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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const photo_schema_1 = require("../schemas/photo.schema");
const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const saltOrRounds = 10;
let SettingsService = class SettingsService {
    constructor(userModel, photoModel, cloudinaryService) {
        this.userModel = userModel;
        this.photoModel = photoModel;
        this.cloudinaryService = cloudinaryService;
    }
    async changePersonalData(body) {
        if (body._id) {
            if (body.firstName.trim() || body.lastName.trim() || body.email.trim()) {
                await this.userModel.findByIdAndUpdate(body._id, body);
                return { code: 200, text: 'Changed personal data', type: 'Success' };
            }
            else {
                return { code: 400, text: 'Fields must not be empty', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Try later please', type: 'Error' };
        }
    }
    async changePassword(body) {
        if (body._id) {
            const user = await this.userModel.findById(body._id);
            const checkPassword = bcrypt.compareSync(body.oldPassword, user.password);
            if (body.newPassword.trim()) {
                if (checkPassword) {
                    const password = bcrypt.hashSync(body.newPassword, saltOrRounds);
                    await this.userModel.findByIdAndUpdate(body._id, { password: password });
                    return { code: 200, text: 'Password changed', type: 'Success' };
                }
                else {
                    return { code: 400, text: 'Data is incorrect', type: 'Error' };
                }
            }
            else {
                return { code: 400, text: 'Field must not be empty', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'Try later please', type: 'Error' };
        }
    }
    async changePhoto(user_id, file) {
        if (file && mongoose_2.isValidObjectId(user_id)) {
            if (fileTypes.find((c) => c === file.mimetype)) {
                const mb = file.size / 1024 / 1024;
                if (mb <= 3) {
                    const uploadFile = await this.cloudinaryService.uploadImage(file);
                    const photo = await new this.photoModel({
                        photo_url: uploadFile.url,
                        public_id: uploadFile.public_id,
                    });
                    await this.userModel.findByIdAndUpdate(user_id, { avatar: photo });
                    await photo.save();
                    return { code: 200, text: 'File is updated', type: 'Success' };
                }
                else {
                    return { code: 400, text: 'Max file size 3 MB', type: 'Error' };
                }
            }
            else {
                return { code: 400, text: 'Invalid file type', type: 'Error' };
            }
        }
        else {
            return { code: 400, text: 'File is empty', type: 'Error' };
        }
    }
};
SettingsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(1, mongoose_1.InjectModel(photo_schema_1.Photo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map