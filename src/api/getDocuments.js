import axiosInstance from './axios';

const getDocuments = async () => {
  const response = await axiosInstance.get('/documentsforms');
  return response.data;
};

export default getDocuments;
