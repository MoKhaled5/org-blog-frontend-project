import axios from 'axios';

export const uploadImageToImgbb = async (imageFile) => {
  const apiKey = '647275195d9d0590b0dc710e51f5611c';
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    return res.data.data.url;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Image upload failed');
  }
};
