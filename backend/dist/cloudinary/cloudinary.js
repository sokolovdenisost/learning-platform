"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: constants_1.API_NAME_CLOUDINARY,
            api_key: constants_1.API_KEY_CLOUDINARY,
            api_secret: constants_1.API_SECRET_CLOUDINARY,
        });
    },
};
//# sourceMappingURL=cloudinary.js.map