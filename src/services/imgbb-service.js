import axios from 'axios';

const IMG_BB_API_URL = 'https://api.imgbb.com/1/upload';
const IMG_BB_API_KEY = process.env.IMG_BB_API_KEY;

export async function uploadImageToImgBB(imageBase64) {
  const formData = new FormData();
  formData.append('key', IMG_BB_API_KEY);
  formData.append('image', imageBase64);

  try {
    const response = await axios.post(IMG_BB_API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error.message);
    throw new Error('Failed to upload image to ImgBB.');
  }
}
