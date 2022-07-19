import axios from 'axios'
import type { Song, Page } from '../types'
import { dtConverter } from '../utils'

interface Response<T> {
  code: number;
  result: T;
}

// 网易云
const request = axios.create({
  baseURL: import.meta.env.DEV
    ? '/netease'
    : 'https://netease-cloud-music-api-lyart-six.vercel.app/'
})

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
}

interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: string[];
  alia: string[];
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ISong {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: H;
  l: H;
  sq: H;
  hr: null;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  single: number;
  noCopyrightRcmd: null;
  mst: number;
  cp: number;
  mv: number;
  rtype: number;
  rurl: null;
  publishTime: number;
  privilege: Privilege;
}

interface SearchResult {
  searchQcReminder: unknown;
  songs: ISong[];
  songCount: number;
}

/**
 * 搜索
 * @see https://neteasecloudmusicapi.vercel.app/#/?id=%e6%90%9c%e7%b4%a2
 */
export function search (keywords:string, pageParam ?: Partial<Page>) {
  const page = pageParam?.page || 0
  const limit = pageParam?.size || 10
  const offset = page ? (page - 1) * limit : 0
  return request({
    url: '/cloudsearch',
    method: 'GET',
    params: {
      keywords,
      limit,
      offset,
    }
  }).then((res) => {
    const data = res.data as Response<SearchResult>
    if (data.code !== 200) {
      throw new Error(`请求错误 ${data.code}`)
    }
    const { songs, songCount } = data.result
    const songList: Song[] = songs.map((s) => ({
      id: s.id,
      name: s.name,
      artist: s.ar.map((ar) => ({ id: ar.id, name: ar.name, alias: ar.alias })),
      album: s.al,
      duration: dtConverter(s.dt),
    }))
    return {
      list: songList,
      total: songCount,
    }
  })
}

export interface FreeTimeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  type: number
  remainTime: number
}

export interface MusicData {
  id: number
  url: string
  br: number
  size: number
  md5: string
  code: number
  expi: number
  type: string
  gain: number
  fee: number
  uf: any
  payed: number
  flag: number
  canExtend: boolean
  freeTrialInfo: any
  level: string
  encodeType: string
  freeTrialPrivilege: FreeTrialPrivilege
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege
  urlSource: number
  rightSource: number
}

export function getMusic (...ids:number[]) {
  return request({
    url: '/song/url',
    method: 'GET',
    params: {
      id: Array.from(ids).join()
    }
  }).then(res => {
    const { code } = res.data as Response<MusicData[]>
    if (code !== 200) {
      throw new Error(`请求错误 ${code}`)
    }
    const musicData = res.data.data as MusicData[]
    return musicData
  })
}
