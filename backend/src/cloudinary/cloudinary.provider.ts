import { v2 } from 'cloudinary';
import { API_KEY_CLOUDINARY, API_NAME_CLOUDINARY, API_SECRET_CLOUDINARY, CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: API_NAME_CLOUDINARY,
      api_key: API_KEY_CLOUDINARY,
      api_secret: API_SECRET_CLOUDINARY,
    });
  },
};
