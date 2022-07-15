export interface Artist {
  id: number;
  name: string;
  alias: string[];
}

export interface Album {
  id: number;
  name: string;
  picUrl: string;
}

export interface Song {
  id: number;
  name: string;
  artist: Artist[];
  album: Album;
}

export interface Page {
  page: number;
  size: number;
}
