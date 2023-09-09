import { AxiosResponse } from 'axios';
import axiosInstance from '../../axios/index';

export default {
  getCharactersByPage(page: number) {
    return axiosInstance.get(`character/?page=${page}`).then((response: AxiosResponse) => response);
  },
  getEpisodeById(id: number) {
    return axiosInstance.get(`episode/${id}`).then((response: AxiosResponse) => response);
  },
};
