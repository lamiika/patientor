import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
const baseUrl = apiBaseUrl + '/diagnosis';

const getAll = async (): Promise<Diagnosis[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  getAll
};