import {View} from "react-native";
import {useEffect} from "react";
import Styles from "./styles";
import StatusBarDiy from "componests/statusBarDiy";


export default ({ navigation }: any) => {
  useEffect(() => {
    /*if(!timeCode){
      timeCode = setInterval(getLoading,5000)
    }*/

  },[]);

  return (
    <View style={Styles.home}>
      <StatusBarDiy/>
    </View>
  )
}
