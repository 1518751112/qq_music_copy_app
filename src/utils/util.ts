import {NativeModules, Platform, StatusBar} from "react-native";

let screenWidth = 0,screenHeight = 0;
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

//图片取色 返回一个像素图片
export const getImgColor = (imgUrl:string)=>{
  const match = imgUrl.match(/^[^\?]+/);
  if (match) {
    return match[0]+'?param=1y1'
  }
  return imgUrl
}

//获取屏幕宽高
export const getScreenSize = ()=>{
  return {screenWidth,screenHeight}
}

//设置屏幕宽高
export const setScreenSize = (width:number,height:number)=>{
  screenWidth = width;
  screenHeight = height;
}
