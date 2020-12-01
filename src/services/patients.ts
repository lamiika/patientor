import axios from 'axios';
const baseUrl: string = '/api/patients';

const getOne = async (id: string) => {
  const response = await axios.get(baseUrl + id);
  console.log(response);
  console.log('data', response.data);
  return response.data;
};

export default {
  getOne
};