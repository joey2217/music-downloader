export interface SearchItem {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  url_id: string;
  lyric_id: string;
  source: string;
}

export interface MusicURLData {
  url: string;
  br: number;
  size: number;
}

export interface MusicInfo extends SearchItem {
  url: string;
  picURL: string;
}

export interface Option<K = string, V = string> {
  label: K;
  value: V;
}
