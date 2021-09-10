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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../schemas/user.schema");
const validate_service_1 = require("../validate/validate.service");
const saltOrRounds = 10;
let AuthService = class AuthService {
    constructor(userModel, validateService) {
        this.userModel = userModel;
        this.validateService = validateService;
    }
    async loginUser(data) {
        if (data.email && data.password) {
            const user = await this.findUserByEmail(data.email);
            if (user) {
                const checkPassword = bcrypt.compareSync(data.password, user.password);
                if (checkPassword) {
                    return { code: 200, type: 'Success', text: 'Signed into account', user_id: user._id };
                }
                else {
                    return { code: 400, type: 'Error', text: 'Data is incorrect' };
                }
            }
            else {
                return { code: 400, type: 'Error', text: 'Data is incorrect' };
            }
        }
        else {
            return { code: 400, type: 'Error', text: 'Not all fields are filled' };
        }
    }
    async createUser(data) {
        if (data.firstName && data.lastName && data.email && data.password) {
            if (!(await this.findUserByEmail(data.email))) {
                if (this.validateService.validateLength(data.password, 50, 10)) {
                    const hashPassword = await bcrypt.hashSync(data.password, saltOrRounds);
                    const user = new this.userModel(Object.assign(Object.assign({}, data), { password: hashPassword }));
                    await user.save();
                    return { code: 200, type: 'Success', text: 'User is registered' };
                }
                else if (data.password.length < 10) {
                    return { code: 400, type: 'Error', text: 'Password must be at least 10 characters' };
                }
            }
            else {
                return { code: 400, type: 'Error', text: 'This email is already taken' };
            }
        }
        else {
            return { code: 400, type: 'Error', text: 'Not all fields are filled' };
        }
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async findUserById(id) {
        if (mongoose.isValidObjectId(id)) {
            return await this.userModel.findById(id).populate({
                path: 'favorites',
                populate: { path: 'owner', select: '_id lastName firstName' },
            });
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, validate_service_1.ValidateService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map