import { request } from '../network/request'
import { TYPE } from '../utils/common'

export default {
    search(state, payload) {
        console.log('搜索类型' + payload.type)
        return new Promise((resolve, reject) => {
            if (payload.keyword !== state.searchvalue) {
                request({
                    url: "/api/search",
                    params: {
                        keywords: payload.keyword,
                        limit: this.state.pageLimit,
                        type: payload.type,
                        offset: payload.offset
                    }
                }).then(res => {
                    console.log(TYPE.Video)
                    state.commit("updateSearchHistory", payload.keyword)
                    switch (payload.type) {
                        case TYPE.Music:
                            state.commit("updateSongList", { 'songlist': res.data.result.songs, 'songcount': res.data.result.songCount, 'hasmore': res.data.result.hasMore });
                            break;
                        case TYPE.Artist:
                            state.commit('artistlist/updateArtists', { 'artists': res.data.result.artists, 'artistCount': res.data.result.artistCount });
                            break;
                        case TYPE.Album:
                            console.log(res);
                            state.commit('albumlist/updateAlbums', { 'albums': res.data.result.albums, 'albumCount': res.data.result.albumCount });
                            break;
                        case TYPE.Video:
                            console.log(res);
                            state.commit('videolist/updateVideos', { 'videos': res.data.result.videos, 'videoCount': res.data.result.videoCount });
                            break;
                        case TYPE.Lyric:
                            break;
                        case TYPE.Song:
                            break;
                        case TYPE.Radio:
                            break;
                        case TYPE.User:
                            break;
                    }


                    // if (payload.type == TYPE.song) {
                    //     state.commit("updateSongList", { 'songlist': res.data.result.songs, 'songcount': res.data.result.songCount, 'hasmore': res.data.result.hasMore });
                    //     console.log(res.data.result.songs)
                    // } else if (payload.type == TYPE.song.artist) {
                    //     console.log(res.data.result)
                    //     state.commit('artistlist/updateArtists', { 'artists': res.data.result.artists, 'artistCount': res.data.result.artistCount })
                    // }
                });
                resolve('成功')
            } else {
                resolve('关键字相同')
            }

        })

    }
}