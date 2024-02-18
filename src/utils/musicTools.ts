import TrackPlayer, {Event} from 'react-native-track-player';
import {effect, reducer} from "utils/dva16";
import {ESongInfo, NMusic, RSetState} from "common/constant";

export class MusicTools{
    private static readonly idMap:Map<string,MusicInfo> = new Map();
    private static _currentInfo:MusicInfo;
    public static get currentInfo(){
        return this._currentInfo;
    }
    public static set currentInfo(value:MusicInfo){
        this._currentInfo = value;
        reducer(NMusic,RSetState,{currentInfo:value});
    }
    static async play(id:string,config:{title:string,artwork:string,artist:string,time:number}){
        const {title,artwork,artist,time} = config;
        //是否为当前歌曲
        if(this.currentInfo&&this.currentInfo.id==id){
            const {state} = await TrackPlayer.getPlaybackState();
            if(state=='playing'){
                await TrackPlayer.pause();
            }else {
                await TrackPlayer.play();
            }
            return;
        }

        let info:MusicInfo|undefined = this.idMap.get(id);
        if(!info){
            const result =  await effect(NMusic,ESongInfo,{ids:[id]});
            if(result.code==200&&result.data.length>0){
                info = {
                    id:id,
                    title,
                    url:result.data[0].url,
                    artwork,
                    artist,
                    time
                }
                this.idMap.set(id,info);

            }
        }

        if(info){

            console.log("播放",info)
            const result = await TrackPlayer.add(info) as number;
            console.log("播放结果",result)
            if(result!=0){
                await TrackPlayer.skip(result);
            }
            this.currentInfo = info;
            await TrackPlayer.play();

        }

    }
}

export interface MusicInfo {
    id:string;
    title:string;
    url:string;
    artwork:string;
    artist:string;
    time:number;
}

export async function initEvent(){
    TrackPlayer.addEventListener(Event.RemotePause, () => {

        console.log('歌曲暂停');

        TrackPlayer.pause();

    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {

        console.log('Event.RemotePlay');

        TrackPlayer.play();

    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {

        console.log('下一首');

        await TrackPlayer.skipToNext();
        //获取当前播放的歌曲
        const index = await TrackPlayer.getActiveTrackIndex();
        if(typeof index == "number"){
            const currentTrack = await TrackPlayer.getTrack(index);
            if(currentTrack){
                // @ts-ignore
                MusicTools.currentInfo = currentTrack
            }
        }

    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {

        console.log('上一首');

        await TrackPlayer.skipToPrevious();

        //获取当前播放的歌曲
        const index = await TrackPlayer.getActiveTrackIndex();
        if(typeof index == "number"){
            const currentTrack = await TrackPlayer.getTrack(index);
            if(currentTrack){
                // @ts-ignore
                MusicTools.currentInfo = currentTrack;
            }
        }
    });
}
