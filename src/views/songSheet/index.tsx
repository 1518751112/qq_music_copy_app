import {Image, ScrollView, Text, View} from "react-native";
import React from "react";
import styles from "./styles";
import {NavigationDes} from "common/interface";
import Back from "componests/back";
import IonicFont5 from "react-native-vector-icons/FontAwesome5";
import {getImgColor, numAddLabel} from "utils/util";

export default ({navigation,route}:NavigationDes) => {
    // route.params={"diyLogo": null, "id": "2339725169", "image": "http://p2.music.126.net/16YjofanqyKk3GTQz4LhQw==/109951163463413693.jpg", "labelTexts": ["华语", "快乐", "流行"], "onPress": null, "playCount": 78387360, "title": "那些年甜甜的歌 ，甜到爆表～～～❤"}
    console.log("navigation",route.params)
    return (
        <View style={styles.home}>
            <Back navigation={navigation} breakImage={route.params?.image} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.topBox}>
                        <View style={styles.topBoxTop}>
                            <View style={styles.topBoxTopLeft}>
                                <View style={styles.ttBack}></View>
                                <Image source={{uri:route.params?.image}} style={styles.topBoxTopLeImage} />
                                <View style={styles.ttTop}>
                                    <IonicFont5 name='play' size={6} color={'#ffffff'}/>
                                    <Text style={{fontSize:18,color:'#ffffff'}}>{numAddLabel(route.params.playCount)}</Text>
                                </View>
                            </View>
                            <View style={styles.topBoxTopRight}>
                                <Text style={styles.topBoxTopRightTitle} >{route.params?.title}</Text>
                                <View style={styles.topBoxTopRightLabel}>
                                    {route.params?.labelTexts.map((v:string,i:number)=>(
                                        <Text key={i} style={{fontSize:15,color:'#ffffff'}}>{v}</Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.topBoxBackImg} source={{uri:getImgColor(route.params?.image)}} />
                </View>

            </ScrollView>

        </View>
    )
}

