export interface CharacterCard {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: string;
  firstEpisodeName: string | undefined;
  size?: 'small' | 'large';
}
