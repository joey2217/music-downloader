import type { MusicInfo, MusicURLData, SearchItem } from "@/types";

const BASE_URL = "https://music-api.gdstudio.xyz";

async function request<T = unknown>(url: string, query: Record<string, unknown>, init?: RequestInit) {
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  const res = await fetch(`${BASE_URL}${url}?${queryString}`, init);
  const data = (await res.json()) as T;
  if (res.ok) {
    return data;
  }
  throw new Error("请求失败");
}

//* 高级用法：在音乐源后加上“_album”，如“netease_album”，可获取专辑中的曲目列表
export type Source =
  | "netease"
  | "netease_album"
  | "tencent"
  | "tencent_album"
  | "tidal"
  | "tidal_album"
  | "spotify"
  | "spotify_album"
  | "ytmusic"
  | "ytmusic_album"
  | "qobuz"
  | "qobuz_album"
  | "joox"
  | "joox_album"
  | "deezer"
  | "deezer_album"
  | "migu"
  | "migu_album"
  | "kugou"
  | "kugou_album"
  | "kuwo"
  | "kuwo_album"
  | "ximalaya"
  | "ximalaya_album";

type ParamValue = string | number;

// 搜索
// API：https://music-api.gdstudio.xyz/api.php?types=search&source=[MUSIC SOURCE]&name=[KEYWORD]&count=[PAGE LENGTH]&pages=[PAGE NUM]
export function fetchSearch(keyword: string, source: Source = "kuwo", page: ParamValue = 1, size: ParamValue = 20) {
  return request<SearchItem[]>("/api.php", {
    types: "search",
    source,
    name: keyword,
    count: size,
    pages: page,
  });
}

type Br = 128 | 192 | 320 | 740 | 999;

//获取歌曲
// API：https://music-api.gdstudio.xyz/api.php?types=url&source=[MUSIC SOURCE]&id=[TRACK ID]&br=[128/192/320/740/999]
// id：曲目ID。必选项，即track_id，根据音乐源不同，曲目ID的获取方式各不相同，可通过本站提供的搜索接口获取
// br：音质。可选项，可选128、192、320、740、999（默认），其中740、999为无损音质
export function fetchMusic(id: ParamValue, source: Source = "kuwo", br: Br = 320) {
  return request<MusicURLData>(
    "/api.php",
    {
      types: "url",
      source,
      id,
      br,
    },
    {
      cache: "force-cache",
    }
  );
}

//获取专辑图
// API：https://music-api.gdstudio.xyz/api.php?types=pic&source=[MUSIC SOURCE]&id=[PIC ID]&size=[300/500]
// id：专辑图ID。必选项，专辑图ID即pic_id，可通过本站提供的搜索接口获取
// size：图片尺寸。可选项，可选300（默认）、500，其中300为小图，500为大图，返回的图片不一定是300px或500px
export function fetchMusicPic(id: ParamValue, source: Source = "kuwo", size: 300 | 500 = 300) {
  return request(
    "/api.php",
    {
      types: "pic",
      source,
      id,
      size,
    },
    {
      cache: "force-cache",
    }
  );
}

// 获取歌词
// API：https://music-api.gdstudio.xyz/api.php?types=lyric&source=[MUSIC SOURCE]&id=[LYRIC ID]
// id：歌词ID。必选项，歌词ID即lyric_id（一般与曲目ID相同），可通过本站提供的搜索接口获取
export function fetchMusicLyric(id: ParamValue, source: Source = "kuwo") {
  return request(
    "/api.php",
    {
      types: "lyric",
      source,
      id,
    },
    {
      cache: "force-cache",
    }
  );
}

interface MusicInfoConfig {
  source: Source;
  br: Br;
  size: 300 | 500;
}

export function fetchMusicURLData(info: SearchItem, config?: Partial<MusicInfoConfig>): Promise<MusicInfo> {
  const musicPromise = fetchMusic(info.url_id, config?.source, config?.br);
  const picPromise = fetchMusicPic(info.pic_id, config?.source, config?.size);
  return Promise.all([musicPromise, picPromise]).then(([music, pic]) => {
    return {
      ...info,
      url: music.url,
      pic: "",
    };
  });
}
