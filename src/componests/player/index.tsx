import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, Image, StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import styles from "./styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useStore} from "utils/dva16";
import {NavName, NMusic} from "common/constant";
import {CircularProgress} from 'react-native-circular-progress';
import {useProgress} from "react-native-track-player";
import {MusicTools} from "utils/musicTools";
import {Navigation} from "common/interface";
import CompositeAnimation = Animated.CompositeAnimation;

const defaultImage = require('assets/home/defaultImage.jpg')

//音乐播放组件
function Player(props:{
    style?:StyleProp<ViewStyle>,
    navigation:Navigation
}) {
    const rotation = useRef(new Animated.Value(0)).current;
    const {style,navigation} = props;
    const {currentInfo,state,high} = useStore(NMusic);
    const [comm,setComm] = useState<CompositeAnimation|null>(null);
    const progress = useProgress();
    useEffect(()=>{

    },[])

    useEffect(() => {
        if (state) {
            startRotation();
        } else {
            pauseRotation();
        }
    }, [state]);

    const pauseRotation = () => {
        if(comm){
            comm.reset();
        }
    };
    const startRotation = () => {
        let value = comm;
        if(!value){
            value = Animated.loop(Animated.timing(rotation, {
                toValue: 1,
                duration: 6000,
                easing: Easing.linear,
                useNativeDriver: true,
            }))
            setComm(value)
        }
        value.start(() => {
        });
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={{
          ...styles.home,
          // @ts-ignore
          ...(style||{}),
          high
      }}>
          <View style={styles.row}>
              <Animated.View style={{...styles.image,transform: [{ rotate: spin }]}}>
                  <Image source={currentInfo?{uri:currentInfo.artwork}:defaultImage} style={styles.image}/>
              </Animated.View>
              <Text style={styles.txt}>{currentInfo?currentInfo.title+"-"+currentInfo.artist:'歌曲名'}</Text>
          </View>
          <View style={styles.row}>
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

              <Fontisto name='play-list' size={18} color={'#565656'} style={{marginLeft:20}} onPress={()=>{
                  if(currentInfo&&currentInfo.songInfo){
                      navigation.navigate(NavName.SongSheet, currentInfo.songInfo)
                  }
              }}/>
          </View>
      </View>
  );
}
export default Player

