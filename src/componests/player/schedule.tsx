import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import {useStore} from "utils/dva16";
import {NMusic} from "common/constant";
import {CircularProgress} from 'react-native-circular-progress';
import {useProgress} from "react-native-track-player";
import {MusicTools} from "utils/musicTools";


//音乐进度
function Schedule(props:{
    style?:StyleProp<ViewStyle>,
}) {
    const {currentInfo,state} = useStore(NMusic);
    const progress = useProgress();

    return (
        <TouchableOpacity onPress={()=>{
            if(currentInfo){
                MusicTools.play(currentInfo.id,currentInfo)
            }
        }}>
            <CircularProgress
                size={28}
                width={2}
                fill={progress?(progress.position/progress.duration)*100:100}
                tintColor={'#565656'}
                backgroundColor={'#d3d3d3'}
                rotation={0}
                lineCap="round"
            >
                {() => (
                    // 这里放置圆形进度条中心的内容，比如播放按钮等
                    <FontAwesome6 name={state?'pause':'play'} size={12} color={'#565656'}/>
                )}
            </CircularProgress>
        </TouchableOpacity>
  );
}
export default Schedule

