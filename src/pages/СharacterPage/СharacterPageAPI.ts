import { AxiosResponse } from 'axios';
import axiosInstance from '../../axios/index';

export default {
  getCharacterById(id: number | string) {
    return axiosInstance.get(`/character/${id}`).then((response: AxiosResponse) => response);
  },
  getEpisodeById(id: number | string) {
    return axiosInstance.get(`episode/${id}`).then((response: AxiosResponse) => response);
  },
};
