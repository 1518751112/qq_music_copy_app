import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import StatusBarDiy from "componests/statusBarDiy";
import DragFloating from "componests/dragFloating";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {reducer, useStore} from "utils/dva16";
import {NHome, NMusic, RSetState} from "common/constant";
import Feather from "react-native-vector-icons/Feather";
import {Lyric as LyricTo} from 'react-native-lyric';
import {useProgress} from "react-native-track-player";
import {numToTime} from "utils/util";
import Progress from "componests/progress";
import {MusicTools} from "utils/musicTools";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from "react-native-vector-icons/Fontisto";

//歌词组件
function Lyric(props:{
    setVisible: (value: boolean) => void;
    visible: boolean;
}) {
    const {visible,setVisible} = props;
    const [dragEnabled,setDragEnabled] = useState(false);
    const {currentInfo,state} = useStore(NMusic);
    const progress = useProgress();
    const outData = useRef({duration:0}).current;
    useEffect(()=>{
        if(visible){
            StatusBarDiy.setBarStyle("light-content",true)
        }
    },[visible])
    useEffect(()=>{
        if(progress&&progress.duration!=outData.duration){
            outData.duration = progress.duration;
        }
    },[progress.duration])
    const lineRenderer = useCallback(
        ({ lrcLine: { millisecond, content }, index, active }:any) => (
                <Text
                    style={{ textAlign: 'center', color: active ? 'white' : 'gray',fontSize:17 }}>
                    {content}
                </Text>
        ),
        [],
    );
    return (
        <DragFloating visible={visible} style={styles.home} onRequestClose={()=>setVisible(false)} dragEnabled={dragEnabled}>
            <Image source={currentInfo?.artwork?{uri:currentInfo.artwork}:require('assets/home/transparent.png')} style={styles.background} blurRadius={20}/>
            <View style={[styles.box]}>

                <View style={styles.back}>
                    <AntDesign name='down' size={22} onPress={()=>setVisible(false)} />
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:20}}>{currentInfo?.title||"歌名"}</Text>
                        <Text style={{color:'#b7b7b7'}}>{currentInfo?.artist||"歌手"}</Text>
                    </View>
                    <SimpleLineIcons name='share' size={25} onPress={()=>{
                        console.log(!dragEnabled?"开启":"关闭")
                        setDragEnabled(!dragEnabled)
                    }} />
                </View>
                <View style={styles.top}>
                    <AntDesign name='sound' size={22} />
                    <Feather name='airplay' size={22} />
                </View>
                <LyricTo
                    style={styles.lrc}
                    lrc={currentInfo?.lrc||"[00:00.00] 暂无歌词"}
                    currentTime={progress?progress.position*1000:0}
                    lineHeight={40}
                    autoScroll={true}
                    showsVerticalScrollIndicator={false}
                    autoScrollAfterUserScroll={2000}
                    lineRenderer={lineRenderer}
                    onScrollBeginDrag={() => {
                    }}
                    activeLineHeight={40} height={520}/>
                <View style={styles.bottom}>
                    <View style={styles.schedule}>
                        <Text style={styles.scheduleText}>{numToTime(progress?.position||0)}</Text>
                        <Progress style={{width:'80%'}} height={2} dragToEnlarge={1.5} schedule={progress.position?(progress.position/progress.duration)*100:0} onCheng={v=>{
                            if(outData.duration) {
                                MusicTools.seekTo(outData.duration*v/100)
                            }
                        }}/>
                        <Text style={styles.scheduleText}>{numToTime(progress.duration||0)}</Text>
                    </View>
                    <View style={styles.function}>
                        <TouchableOpacity>
                            <FontAwesome name='random' size={18} color={'#888888'}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{
                            MusicTools.skipToPrevious()
                        }}>
                        <FontAwesome5 name='step-backward' size={18} color={'#888888'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            MusicTools.play(currentInfo.id,currentInfo)
                        }}>
                        <FontAwesome5 name={state?'pause':'play'} size={30} color={'#888888'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            MusicTools.skipToNext()
                        }}>
                        <FontAwesome5 selectionColor={"red"} name='step-forward' size={18} color={'#888888'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        reducer(NHome,RSetState,{currentListIsShow:true})
                    }}>
                        <Fontisto name='play-list' size={20} color={'#888888'} style={{marginLeft:20}}/>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DragFloating>
  );
}
export default Lyric

