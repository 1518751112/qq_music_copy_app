import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from "react-native";
import styles from "./styles";
import {Navigation} from "common/interface";
import IonicFont6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import StatusBarDiy from "componests/statusBarDiy";
import {getImgColor} from "utils/util";

//左右滑动组件
function Back(props:{
    style?:StyleProp<ViewStyle>
    navigation:Navigation
    config?:(setOpacity:(num:number)=>void)=>void,
    breakImage:string,
    onRef?:(ref:any)=>void
}) {
    const {navigation,config} = props
    const ref = useRef(null)
    const [opacity,setOpacity] = useState(0)
    useEffect(()=>{
        StatusBarDiy.setBarStyle("light-content",true)
        config&&config((num)=>{
            setOpacity(num)
        })
    },[])

    useEffect(()=>{
        props.onRef&&props.onRef(ref)
    },[ref.current])
    return (
      <View style={styles.home} ref={ref}>
          <View style={styles.box}>
              <View style={styles.left}>
                  <IonicFont6 name='arrow-left' size={20} color={'#ffffff'} style={styles.leftButton} onPress={()=>{
                      navigation.goBack()
                  }} />
                  <Text style={styles.title}>歌单</Text>
              </View>
              <View style={styles.right}>
                  <Fontisto name='search' size={18} color={'#ffffff'} style={styles.leftButton} onPress={()=>{

                  }} />
                  <Fontisto name='more-v-a' size={18} color={'#ffffff'} onPress={()=>{

                  }} />
              </View>
          </View>
          <Image style={{...styles.backgroundImage,opacity}} source={{uri:getImgColor(props.breakImage)}} />

      </View>
  );
}
export default Back

