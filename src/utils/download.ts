import { Character } from '../types';

export interface IDownloadFile {
  data: string;
  fileName: string;
  fileType: string;
}

export const downloadFile = (fileDescription: IDownloadFile) => {
  const { data, fileName, fileType } = fileDescription;
  const blob = new Blob([data], { type: fileType });

  const linkElement = document.createElement('a');
  linkElement.download = fileName;
  linkElement.href = window.URL.createObjectURL(blob);
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  linkElement.dispatchEvent(clickEvent);
  linkElement.remove();
};

export const exportToCsv = (characters: Array<Character>) => {
  const headers = ['Id, Name, Status, Species, Gender'];
  const usersCsv = characters?.reduce((accumulate: Array<string>, character) => {
    const { id, name, status, species, gender } = character;
    const bodyCharacter = [id, name, status, species, gender].join(', ');
    accumulate.push(bodyCharacter);
    return accumulate;
  }, []);

  downloadFile({
    data: [...headers, ...usersCsv].join('\n'),
    fileName: 'characters.csv',
    fileType: 'text/csv',
  });
};
