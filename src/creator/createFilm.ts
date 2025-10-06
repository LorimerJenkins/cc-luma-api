export interface Film {
  film: string;
  filmUID: string;
  creatorUID: string;
  targetCities: string[];
  date: string;
  time: string;
  runTimeMins: string;
  genre: string;
  trailer: string;
  coverImage: string;
  description: string;
  cast: string[];
  otherImages: string[];
}

export async function createFilm(film: Film) {
  return true;
}
