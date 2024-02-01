import React, {useEffect} from 'react';
import {
    ColorValue,
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import styles from "./styles";

export interface KingKongData {
    title: string,
    source?: ImageSourcePropType,
    onPress?: (data:KingKongData,index:number) => void
    diyLogo?:React.JSX.Element
}

//左右滑动组件
function KingKong(props:{
    style?:StyleProp<ViewStyle>
    data:KingKongData[]
    size?:number,
    fontColor?: ColorValue,
    interval?:number,
    numberOfLines?:number,
    sourceStyle?:ViewStyle
}) {
    const {data,size,fontColor,interval,numberOfLines,sourceStyle} = props
    useEffect(() => {


    }, []);
    return (
      <View style={props.style?props.style:{
          width: '100%',
          overflow:'hidden',
      }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
              {data.map((temp,index)=>(
                  <TouchableOpacity onPress={()=>{
                      temp.onPress&&temp.onPress(temp,index)
                  }} key={index} style={{
                      marginRight: interval?interval:5,
                      alignItems: 'center',
                  }}>
                      {temp.source?<Image style={{
                            ...(sourceStyle||{}),
                          width: size?size:50,
                          height: size?size:50,
                          overflow: 'hidden',
                      }} source={temp.source}/>:temp.diyLogo}
                      <Text ellipsizeMode="tail" numberOfLines={numberOfLines||1} style={{
                          color: fontColor||"black",
                          maxWidth: size?size:50,
                      }}>{temp.title}</Text>
                  </TouchableOpacity>
              ))}

          </ScrollView>
      </View>
  );
}
export default KingKong

