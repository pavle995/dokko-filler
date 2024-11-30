import axiosInstance from './axios';

const getDocumentsById = async (id) => {
  const response = await axiosInstance.get('/documentsforms/' + id);
  return response.data;
};

export default getDocumentsById;
