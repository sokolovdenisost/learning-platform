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
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const photo_schema_1 = require("../schemas/photo.schema");
const user_schema_1 = require("../schemas/user.schema");
const settings_controller_1 = require("./settings.controller");
const settings_service_1 = require("./settings.service");
let SettingsModule = class SettingsModule {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
};
SettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: photo_schema_1.Photo.name, schema: photo_schema_1.PhotoSchema },
            ]),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_service_1.SettingsService],
        exports: [settings_service_1.SettingsService],
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map