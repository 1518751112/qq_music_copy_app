import {BackHandler, Text, View} from "react-native";
import StatusBarDiy from "componests/statusBarDiy";
import {useEffect} from "react";
import {NavigationDes} from "common/interface";

export default ({ navigation }: NavigationDes) => {
    //监听返回键
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress',onBackPress)
        });
        const blur = navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress',onBackPress)
        });
        return () => {
            unsubscribe()
            blur()
            BackHandler.removeEventListener('hardwareBackPress',onBackPress)
        }
    },[])
    const onBackPress = () => {
        console.log(9999)
        //退出应用
        BackHandler.exitApp()
        return true
    }
  return (
    <View>
        <StatusBarDiy navigation={navigation}/>
      <Text>首页</Text>
    </View>
  )
}
