const axios = require("axios");
const sha512 = require("js-sha512");

const PROXY_URL = "https://nct.napdev.workers.dev/";
const API_URL = "https://beta.nhaccuatui.com/api";

const API_KEY = "e3afd4b6c89147258a56a641af16cc79";
const SECRET_KEY = "6847f1a4fc2f4eb6ab13f9084e082ef4";

const now = String(Date.now());
const hash = sha512.hmac(SECRET_KEY, now);

const client = axios.create({
  baseURL: typeof window === "object" ? PROXY_URL + API_URL : API_URL,
  params: {
    a: API_KEY,
    t: now,
    s: hash,
  },
});

client.interceptors.response.use((res) => res.data);

const joinQueryString = (obj) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

const getHome = () => client.post("home");

const getSong = (songId) =>
  client.post("media/info", joinQueryString({ key: songId, type: "song" }));

const getPlaylists = () => client.post("tags");

const getPlaylistDetail = (playlistId) =>
  client.post(
    "media/info",
    joinQueryString({ key: playlistId, type: "playlist" })
  );

const getLyric = (songId) =>
  client.post("lyric", joinQueryString({ key: songId, type: "song" }));

const getVideoDetail = (videoId) =>
  client.post("media/info", joinQueryString({ key: videoId, type: "video" }));

const getTopics = () => client.post("topic");

const getTopicDetail = (topicId) =>
  client.post("topic/detail", joinQueryString({ key: topicId }));

const getChart = (
  { category = "nhac-viet", time } = { category: "nhac-viet" }
) =>
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

const getTop100 = (top100Id) =>
  client.post("top100", joinQueryString({ key: top100Id }));

const searchByKeyword = (keyword) =>
  client.post("search/all", joinQueryString({ key: keyword }));

const getTopKeyword = () => client.post("search/topkeyword");

const getTrendingArtists = () =>
  client.post("ranking/artist", joinQueryString({ size: 10 }));

const exploreArtists = (
  { nation = "hot", gender = 1 } = { nation: "hot", gender: 1 }
) => client.post("artist", joinQueryString({ nation, gender }));

const getArtistDetail = (artistId) =>
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

const explore = ({ type, key = "moi-hot", page = 1, pageSize = 36 }) =>
  client.post(
    "genre",
    joinQueryString({ type, key, order: 1, pageIndex: page, pageSize })
  );

export {
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
