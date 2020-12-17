import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { EntryFormValues, Entry } from "../types";
const baseUrl = apiBaseUrl + "/patients";

const getOne = async (id: string): Promise<Patient> => {
  const response = await axios.get(baseUrl + "/" + id);
  return response.data;
};

const submitEntry = async (values: EntryFormValues, id: string): Promise<Entry> => {
  const response = await axios.post(baseUrl + "/" + id + "/entries", values);
  return response.data;
};

export default {
  getOne,
  submitEntry
};