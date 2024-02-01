import {Text, View} from "react-native";
import StatusBarDiy from "componests/statusBarDiy";

export default ({ navigation }: any) => {

  return (
    <View>
        <StatusBarDiy navigation={navigation}/>
      <Text>首页</Text>
    </View>
  )
}
