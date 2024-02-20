import TrackPlayer, {Event} from 'react-native-track-player';
import {effect, reducer} from "utils/dva16";
import {ESongInfo, NMusic, RSetState} from "common/constant";
import {getData, setData} from "utils/util";
import _ from "lodash";

export class MusicTools{
    private static idObj:MusicInfoObj = {};
    private static _currentInfo:MusicInfo;
    private static isProcessing:boolean=false;
    public static list:any[]=[];
    public static get currentInfo(){
        return this._currentInfo;
    }
    public static set currentInfo(value:MusicInfo){
        this._currentInfo = value;
        reducer(NMusic,RSetState,{currentInfo:value});
        //本地缓存
        setData("MusicTools",{
            currentInfo:value,
            idObj:this.idObj,
            list:this.list
        });

    }
    static async play(id:string,config:MusicPlayInfo){
        if(this.isProcessing){
            return;
        }
        this.isProcessing = true;
        //是否为当前歌曲
        if(this.currentInfo&&this.currentInfo.id==id){
            const {state} = await TrackPlayer.getPlaybackState();
            if(state=='playing'){
                await TrackPlayer.pause();
            }else {
                await TrackPlayer.play();
            }
            this.isProcessing = false;
            return;
        }
        if(config.list){
            config.list = _.shuffle(config.list);
            this.list = config.list;
        }

        let info:MusicInfo|undefined = this.idObj[id];
        if(!info||(info.logTime&&Date.now()-info.logTime>1000*60*5)){
            const result =  await effect(NMusic,ESongInfo,{ids:[id]});
            if(result.code==200&&result.data.length>0){
                info = {
                    ...config,
                    id:id,
                    url:result.data[0].url,
                    logTime:Date.now()
                }
                this.idObj[id]={
                    ...info,
                    list:null
                };

            }
        }

        if(info){

            // console.log("播放",info)
            const result = await TrackPlayer.add(info) as number;
            // console.log("播放结果",result)
            if(result!=0){
                await TrackPlayer.skip(result);
            }
            this.currentInfo = info;
            await TrackPlayer.play();
        }
        this.isProcessing = false;

    }

    /**
     * 播放下一首歌曲
     * @param index 播放器中，当前歌的索引
     */
    static async next(index:number=0){
        //选取歌单从里面选取下一首歌曲
        if(this.list.length>0){
            const nextIndex = this.list.findIndex((item)=>item.id==this.currentInfo.id);
            if(nextIndex>=0){
                let next = this.list[nextIndex+1];
                if(!next){
                    next = this.list[0];
                }
                await this.play(next.id,{
                    title:next.title,
                    artwork:next.artwork,
                    artist:next.artist,
                    songInfo:this.currentInfo.songInfo,
                    list:this.list
                });
            }
        }
    }

    /**
     * 初始化播放信息
     */
    static async init(){
        const data = await getData("MusicTools");
        if(data){
            const {currentInfo,idObj,list} = JSON.parse(data);
            this._currentInfo = currentInfo;
            this.idObj = idObj;
            this.list = list;
            reducer(NMusic,RSetState,{currentInfo:currentInfo});
            await TrackPlayer.add(currentInfo)
        }
    }
}



export interface MusicPlayInfo {
    title:string;
    artwork:string;
    artist:string;
    songInfo?:any;
    list?:any[]|null;
}
export type MusicInfoObj={
    [key:string]:MusicInfo
}

export interface MusicInfo extends MusicPlayInfo {
    id:string;
    url:string;
    logTime?:number;
}

export async function initEvent(){
    TrackPlayer.addEventListener(Event.RemotePause, () => {

        console.log('歌曲暂停');

        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {

        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        console.log("下一首")
        const currentIndex = await TrackPlayer.getActiveTrackIndex();

        await TrackPlayer.skipToNext();
        //获取当前播放的歌曲
        const index = await TrackPlayer.getActiveTrackIndex();
        if(currentIndex==index){
            console.log("已经是最后一首歌曲了")
            await MusicTools.next(currentIndex);
        }else{
            if(typeof index == "number"){
                const currentTrack = await TrackPlayer.getTrack(index);
                if(currentTrack){
                    // @ts-ignore
                    MusicTools.currentInfo = currentTrack
                }
            }
        }


    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
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

    TrackPlayer.addEventListener(Event.RemoteSeek, async (data) => {

        await TrackPlayer.seekTo(data.position);
    });

    TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {

        if(data.state=='playing'){
            reducer(NMusic,RSetState,{state:true});
        }else {
            reducer(NMusic,RSetState,{state:false});
        }
        if(data.state=='ended'){
            const index = await TrackPlayer.getActiveTrackIndex();
            await MusicTools.next(index);
        }
    });
}
