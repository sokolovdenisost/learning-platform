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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const settings_dto_1 = require("./dto/settings.dto");
const settings_service_1 = require("./settings.service");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async changePersonalData(res, body) {
        const result = await this.settingsService.changePersonalData(body);
        res.json(result).status(result.code);
    }
    async changePassword(res, body) {
        const result = await this.settingsService.changePassword(body);
        res.json(result).status(result.code);
    }
    async changePhoto(res, body, file) {
        const result = await this.settingsService.changePhoto(body.user_id, file);
        res.json(result).status(result.code);
    }
};
__decorate([
    common_1.Post('change-personal-data'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, settings_dto_1.ChangePersonalDataDTO]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePersonalData", null);
__decorate([
    common_1.Post('change-password'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, settings_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePassword", null);
__decorate([
    common_1.Post('change-photo'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePhoto", null);
SettingsController = __decorate([
    common_1.Controller('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map