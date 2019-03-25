import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../config';

cloudinary.config(cloudinaryConfig);

export const helmet = resolver => async (...params) => {
  try {
    return await resolver(...params);
  } catch (error) {
    const [, args1, args] = params;
    const imagePublicId = args1 ? args1.imagePublicId : args && args.imagePublicId;
    if (imagePublicId) cloudinary.v2.uploader.destroy(imagePublicId);
    throw error;
  }
};
