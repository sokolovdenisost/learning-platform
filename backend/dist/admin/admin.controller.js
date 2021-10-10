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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./dto/admin.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async deleteImagesDontUse(res) {
        const result = await this.adminService.deletesImageDontUse();
        res.json(result).status(result.code);
    }
    async setVerified(res, body) {
        const result = await this.adminService.setVerified(body.id);
        res.json(result).status(result.code);
    }
    async sendNotification(res, body) {
        const result = await this.adminService.sendNotification(body);
        res.json(result).status(result.code);
    }
    async banUser(res, body) {
        const result = await this.adminService.banUser(body.id);
        res.json(result).status(result.code);
    }
    async getBanUsers(res) {
        const result = await this.adminService.getBanUsers();
        res.json(result).status(result.code);
    }
    async getAllUsers(res) {
        const result = await this.adminService.getAllUsers();
        res.json(result).status(result.code);
    }
};
__decorate([
    (0, common_1.Post)('delete-images'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteImagesDontUse", null);
__decorate([
    (0, common_1.Post)('set-verified'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.SetVerifiedDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setVerified", null);
__decorate([
    (0, common_1.Post)('send-notification'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.SendNotificationDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendNotification", null);
__decorate([
    (0, common_1.Post)('ban-user'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.BanUserDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "banUser", null);
__decorate([
    (0, common_1.Get)('ban-users'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBanUsers", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map