import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
const baseUrl = apiBaseUrl + '/patients';

const getOne = async (id: string): Promise<Patient> => {
  const response = await axios.get(baseUrl + '/' + id);
  return response.data;
};

export default {
  getOne
};