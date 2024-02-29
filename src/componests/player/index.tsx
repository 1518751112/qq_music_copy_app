import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, Image, StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useStore} from "utils/dva16";
import {NMusic} from "common/constant";
import {Navigation} from "common/interface";
import CurrentList from "componests/player/currentList";
import Schedule from "componests/player/schedule";
import Lyric from "componests/lyric";
import CompositeAnimation = Animated.CompositeAnimation;

const defaultImage = require('assets/home/defaultImage.jpg')

//音乐播放组件
function Player(props:{
    style?:StyleProp<ViewStyle>,
    navigation:Navigation
}) {
    const rotation = useRef(new Animated.Value(0)).current;
    const {style,navigation} = props;
    const {currentInfo,state} = useStore(NMusic);
    const [comm,setComm] = useState<CompositeAnimation|null>(null);
    const [visible,setVisible] = useState<boolean>(false);
    const [visible2,setVisible2] = useState<boolean>(false);
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
      <TouchableOpacity style={{
          ...styles.home,
          // @ts-ignore
          ...(style||{})
      }} activeOpacity={1} onPress={()=>{
          setVisible2(true)
      }}>
          <View style={styles.row}>
              <Animated.View style={{...styles.image,transform: [{ rotate: spin }]}}>
                  <Image source={currentInfo?{uri:currentInfo.artwork}:defaultImage} style={styles.image}/>
              </Animated.View>
              <Text style={styles.txt} numberOfLines={1} ellipsizeMode="tail">{currentInfo?currentInfo.title+"-"+currentInfo.artist:'歌曲名'}</Text>
          </View>
          <View style={styles.row}>
              <Schedule/>

              <Fontisto name='play-list' size={18} color={'#565656'} style={{marginLeft:20}} onPress={()=>{
                  if(currentInfo){
                      setVisible(true)
                  }
              }}/>
          </View>
          <CurrentList visible={visible} setVisible={setVisible}/>
          <Lyric visible={visible2} setVisible={setVisible2}/>
      </TouchableOpacity>
  );
}
export default Player

