export declare const getHome: () => Promise<any>;
export declare const getSong: (songId: string) => Promise<any>;
export declare const getPlaylists: () => Promise<any>;
export declare const getPlaylistDetail: (playlistId: string) => Promise<any>;
export declare const getLyric: (songId: string) => Promise<any>;
export declare const getTopics: () => Promise<any>;
export declare const getTopicDetail: (topicId: string) => Promise<any>;
export declare const getChart: ({ category, time, }: {
    category?: string | undefined;
    time?: {
        week: number;
        year: number;
    } | undefined;
}) => Promise<any>;
export declare const getTop100: (top100Id: string) => Promise<any>;
export declare const searchByKeyword: (keyword: string) => Promise<any>;
export declare const getTopKeyword: () => Promise<any>;
export declare const getTrendingArtists: () => Promise<any>;
export declare const exploreArtists: ({ nation, gender, }: {
    nation?: string | undefined;
    gender?: number | undefined;
}) => Promise<any>;
export declare const explore: ({ type, key, page, pageSize, }: {
    type: "song" | "playlist" | "mv";
    key?: string | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
}) => Promise<any>;
//# sourceMappingURL=index.d.ts.map