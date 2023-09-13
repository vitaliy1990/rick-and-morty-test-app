import { AxiosResponse } from 'axios';
import axiosInstance from '../../axios/index';

export default {
  getCharacters(serchParams: string) {
    return axiosInstance.get(`character/?${serchParams}`).then((response: AxiosResponse) => response);
  },
  getCharactersById(id: string | Array<string>) {
    return axiosInstance.get(`character/${id}`).then((response: AxiosResponse) => response);
  },
  getEpisodeById(id: number) {
    return axiosInstance.get(`episode/${id}`).then((response: AxiosResponse) => response);
  },
  getEpisodes(serchParams: string) {
    return axiosInstance.get(`episode/?${serchParams}`).then((response: AxiosResponse) => response);
  },
  getLocations(serchParams: string) {
    return axiosInstance.get(`location/?${serchParams}`).then((response: AxiosResponse) => response);
  },
};
