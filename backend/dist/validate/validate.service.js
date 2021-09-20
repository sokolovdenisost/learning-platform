"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateService = void 0;
const common_1 = require("@nestjs/common");
let ValidateService = class ValidateService {
    validateLength(value, maxLength, minLength) {
        return value.trim().length <= maxLength && value.trim().length >= minLength;
    }
};
ValidateService = __decorate([
    common_1.Injectable()
], ValidateService);
exports.ValidateService = ValidateService;
//# sourceMappingURL=validate.service.js.map