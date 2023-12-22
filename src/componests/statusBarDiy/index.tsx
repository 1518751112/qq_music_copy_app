import React, {useEffect} from 'react';
import {ColorValue, StatusBar, View} from "react-native";

type BarStyle = 'light-content'|'dark-content'|'default'
function StatusBarDiy(props:{
    backgroundColor?:ColorValue
    barStyle?:BarStyle
    translucent?:boolean
    animated?:boolean
}) {

    useEffect(()=>{
        StatusBar.setBarStyle(props.barStyle||'default',props.animated||false)
    },[props])
    return (
      <View style={{
          height:StatusBar.currentHeight,
          width:'100%',
          display:props.translucent?'none':'flex',
          backgroundColor:props.backgroundColor||'transparent',
      }}>

      </View>
  );
}
//设置状态栏的样式
StatusBarDiy.setBarStyle = (style:BarStyle,animated?:boolean)=>{
    StatusBar.setBarStyle(style,animated||false)
}
export default StatusBarDiy
