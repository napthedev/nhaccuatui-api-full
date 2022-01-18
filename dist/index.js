"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explore = exports.getArtistDetail = exports.exploreArtists = exports.getTrendingArtists = exports.getTopKeyword = exports.searchByKeyword = exports.getTop100 = exports.getChart = exports.getTopicDetail = exports.getTopics = exports.getVideoDetail = exports.getLyric = exports.getPlaylistDetail = exports.getPlaylists = exports.getSong = exports.getHome = void 0;
const axios_1 = __importDefault(require("axios"));
const js_sha512_1 = require("js-sha512");
const PROXY_URL = "https://nct.napdev.workers.dev/";
const API_URL = "https://beta.nhaccuatui.com/api";
const API_KEY = "e3afd4b6c89147258a56a641af16cc79";
const SECRET_KEY = "6847f1a4fc2f4eb6ab13f9084e082ef4";
const client = axios_1.default.create({
    baseURL: typeof window === "object" ? PROXY_URL + API_URL : API_URL,
    params: {
        a: API_KEY,
    },
});
client.interceptors.request.use((config) => {
    const now = String(Date.now());
    const hash = js_sha512_1.sha512.hmac(SECRET_KEY, now);
    config.params.t = now;
    config.params.s = hash;
    return config;
});
client.interceptors.response.use((res) => res.data);
const joinQueryString = (obj) => Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
const getHome = () => client.post("home");
exports.getHome = getHome;
const getSong = (songId) => client.post("media/info", joinQueryString({ key: songId, type: "song" }));
exports.getSong = getSong;
const getPlaylists = () => client.post("tags");
exports.getPlaylists = getPlaylists;
const getPlaylistDetail = (playlistId) => client.post("media/info", joinQueryString({ key: playlistId, type: "playlist" }));
exports.getPlaylistDetail = getPlaylistDetail;
const getLyric = (songId) => client.post("lyric", joinQueryString({ key: songId, type: "song" }));
exports.getLyric = getLyric;
const getVideoDetail = (videoId) => client.post("media/info", joinQueryString({ key: videoId, type: "video" }));
exports.getVideoDetail = getVideoDetail;
const getTopics = () => client.post("topic");
exports.getTopics = getTopics;
const getTopicDetail = (topicId) => client.post("topic/detail", joinQueryString({ key: topicId }));
exports.getTopicDetail = getTopicDetail;
const getChart = ({ category = "nhac-viet", time, } = {
    category: "nhac-viet",
}) => client.post("ranking/top20", joinQueryString({
    category,
    type: "song",
    size: 20,
    week: (time === null || time === void 0 ? void 0 : time.week) || undefined,
    year: (time === null || time === void 0 ? void 0 : time.year) || undefined,
}));
exports.getChart = getChart;
const getTop100 = (top100Id) => client.post("top100", joinQueryString({ key: top100Id }));
exports.getTop100 = getTop100;
const searchByKeyword = (keyword) => client.post("search/all", joinQueryString({ key: keyword }));
exports.searchByKeyword = searchByKeyword;
const getTopKeyword = () => client.post("search/topkeyword");
exports.getTopKeyword = getTopKeyword;
const getTrendingArtists = () => client.post("ranking/artist", joinQueryString({ size: 10 }));
exports.getTrendingArtists = getTrendingArtists;
const exploreArtists = ({ nation = "hot", gender = 1, } = { nation: "hot", gender: 1 }) => client.post("artist", joinQueryString({ nation, gender }));
exports.exploreArtists = exploreArtists;
const getArtistDetail = (artistId) => client.post("artist/detail", joinQueryString({
    shortLink: artistId,
    type: "all",
    size: 20,
    index: 1,
    sort: 0,
}));
exports.getArtistDetail = getArtistDetail;
const explore = ({ type, key = "moi-hot", page = 1, pageSize = 36, }) => client.post("genre", joinQueryString({ type, key, order: 1, pageIndex: page, pageSize }));
exports.explore = explore;
exports.default = {
    getHome: exports.getHome,
    getSong: exports.getSong,
    getPlaylists: exports.getPlaylists,
    getPlaylistDetail: exports.getPlaylistDetail,
    getLyric: exports.getLyric,
    getVideoDetail: exports.getVideoDetail,
    getTopics: exports.getTopics,
    getTopicDetail: exports.getTopicDetail,
    getChart: exports.getChart,
    getTop100: exports.getTop100,
    searchByKeyword: exports.searchByKeyword,
    getTopKeyword: exports.getTopKeyword,
    getTrendingArtists: exports.getTrendingArtists,
    exploreArtists: exports.exploreArtists,
    getArtistDetail: exports.getArtistDetail,
    explore: exports.explore,
};
//# sourceMappingURL=index.js.map