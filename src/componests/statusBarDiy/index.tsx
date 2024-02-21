import React, {useEffect} from 'react';
import {ColorValue, StatusBar, View} from "react-native";

type BarStyle = 'light-content'|'dark-content'|'default'
function StatusBarDiy(props:{
    backgroundColor?:ColorValue
    barStyle?:BarStyle
    translucent?:boolean
    animated?:boolean
    navigation?:any
}) {
    useEffect(()=>{
        StatusBar.setBarStyle(props.barStyle||'default',props.animated||false)
        const unsubscribe = props.navigation?props.navigation.addListener('focus', () => {
            console.log(999999)
            StatusBar.setBarStyle(props.barStyle||'default',props.animated||false)
        }):null;
        return ()=>{
            unsubscribe&&unsubscribe()
        }
    },[props])
    return (
      <View style={{
          height:StatusBar.currentHeight,
          width:'100%',
          display:props.translucent?'none':'flex',
          backgroundColor:props.backgroundColor||'white',
      }}>

      </View>
  );
}
//设置状态栏的样式
StatusBarDiy.setBarStyle = (style:BarStyle,animated?:boolean)=>{
    StatusBar.setBarStyle(style,animated||false)
}
export default StatusBarDiy
