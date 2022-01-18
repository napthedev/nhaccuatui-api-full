import axios from "axios";
import { sha512 } from "js-sha512";

const PROXY_URL = "https://nct.napdev.workers.dev/";
const API_URL = "https://beta.nhaccuatui.com/api";

const API_KEY = "e3afd4b6c89147258a56a641af16cc79";
const SECRET_KEY = "6847f1a4fc2f4eb6ab13f9084e082ef4";

const client = axios.create({
  baseURL: typeof window === "object" ? PROXY_URL + API_URL : API_URL,
  params: {
    a: API_KEY,
  },
});

client.interceptors.request.use((config) => {
  const now = String(Date.now());
  const hash = sha512.hmac(SECRET_KEY, now);
  config.params.t = now;
  config.params.s = hash;
  return config;
});

client.interceptors.response.use((res: any) => res.data);

const joinQueryString = (obj: { [key: string]: any }) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

export const getHome = (): Promise<any> => client.post("home");

export const getSong = (songId: string): Promise<any> =>
  client.post("media/info", joinQueryString({ key: songId, type: "song" }));

export const getPlaylists = (): Promise<any> => client.post("tags");

export const getPlaylistDetail = (playlistId: string): Promise<any> =>
  client.post(
    "media/info",
    joinQueryString({ key: playlistId, type: "playlist" })
  );

export const getLyric = (songId: string): Promise<any> =>
  client.post("lyric", joinQueryString({ key: songId, type: "song" }));

export const getVideoDetail = (videoId: string): Promise<any> =>
  client.post("media/info", joinQueryString({ key: videoId, type: "video" }));

export const getTopics = (): Promise<any> => client.post("topic");

export const getTopicDetail = (topicId: string): Promise<any> =>
  client.post("topic/detail", joinQueryString({ key: topicId }));

export const getChart = (
  {
    category = "nhac-viet",
    time,
  }: {
    category?: string;
    time?: { week: number; year: number };
  } = {
    category: "nhac-viet",
  }
): Promise<any> =>
  client.post(
    "ranking/top20",
    joinQueryString({
      category,
      type: "song",
      size: 20,
      week: time?.week || undefined,
      year: time?.year || undefined,
    })
  );

export const getTop100 = (top100Id: string): Promise<any> =>
  client.post("top100", joinQueryString({ key: top100Id }));

export const searchByKeyword = (keyword: string): Promise<any> =>
  client.post("search/all", joinQueryString({ key: keyword }));

export const getTopKeyword = (): Promise<any> =>
  client.post("search/topkeyword");

export const getTrendingArtists = (): Promise<any> =>
  client.post("ranking/artist", joinQueryString({ size: 10 }));

export const exploreArtists = (
  {
    nation = "hot",
    gender = 1,
  }: {
    nation?: string;
    gender?: number;
  } = { nation: "hot", gender: 1 }
): Promise<any> => client.post("artist", joinQueryString({ nation, gender }));

export const getArtistDetail = (artistId: string): Promise<any> =>
  client.post(
    "artist/detail",
    joinQueryString({
      shortLink: artistId,
      type: "all",
      size: 20,
      index: 1,
      sort: 0,
    })
  );

export const explore = ({
  type,
  key = "moi-hot",
  page = 1,
  pageSize = 36,
}: {
  type: "song" | "playlist" | "mv";
  key?: string;
  page?: number;
  pageSize?: number;
}): Promise<any> =>
  client.post(
    "genre",
    joinQueryString({ type, key, order: 1, pageIndex: page, pageSize })
  );

export default {
  getHome,
  getSong,
  getPlaylists,
  getPlaylistDetail,
  getLyric,
  getVideoDetail,
  getTopics,
  getTopicDetail,
  getChart,
  getTop100,
  searchByKeyword,
  getTopKeyword,
  getTrendingArtists,
  exploreArtists,
  getArtistDetail,
  explore,
};
