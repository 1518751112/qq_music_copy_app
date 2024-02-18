import React, {useEffect} from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from "react-native";
import styles from "./styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useStore} from "utils/dva16";
import {NMusic} from "common/constant";
import {CircularProgress} from 'react-native-circular-progress';
import {useProgress} from "react-native-track-player";

//左右滑动组件
function Player(props:{
    style?:StyleProp<ViewStyle>
}) {
    const {style} = props;
    const {currentInfo} = useStore(NMusic);
    const progress = useProgress();
    useEffect(()=>{

    },[])
    return (
      <View style={{
          ...styles.home,
          // @ts-ignore
          ...(style||{})
      }}>
          <View>
              <Image source={{uri:''}}/>
              <Text>{currentInfo?currentInfo.title:'歌曲名'}</Text>
          </View>
          <View>
              <CircularProgress
                  size={200}
                  width={20}
                  fill={40}
                  tintColor={'#565656'}
                  backgroundColor={'#3d5875'}
                  rotation={0}
                  lineCap="round"
              >
                  {() => (
                      // 这里放置圆形进度条中心的内容，比如播放按钮等
                      <FontAwesome6 name='play' size={16} color={'#565656'}/>
                  )}
              </CircularProgress>
              <Fontisto name='play-list' size={16} color={'#565656'}/>
          </View>
      </View>
  );
}
export default Player

