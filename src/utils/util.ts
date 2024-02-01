import {NativeModules, Platform, StatusBar} from "react-native";

export const setStatusBarHeight = () => {
  const { OS } = Platform
  const {
    StatusBarManager: { HEIGHT },
  } = NativeModules
  let height = OS === 'android' ? StatusBar.currentHeight : HEIGHT
  return height
}

export const numAddLabel = (num:number)=>{
  let str;
  if(num>10000000){
    str = (num/100000000).toFixed(2)+'亿'
  }else if(num>10000){
    str = (num/10000).toFixed(2)+'万'
  }else if(num>1000){
    str = (num/1000).toFixed(2)+'千'
  }else{
    str = num+''
  }
  return str
}
