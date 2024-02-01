import {ScrollView, View} from "react-native";
import React, {useState} from "react";
import styles from "./styles";
import StatusBarDiy from "componests/statusBarDiy";
import {NavigationDes} from "common/interface";

export default ({navigation,route}:NavigationDes) => {
    const [songList,setSongList] = useState([])

    console.log("navigation",route.params)
    return (
        <View style={styles.home}>
            <StatusBarDiy barStyle='dark-content'/>
            <ScrollView showsVerticalScrollIndicator={false}>

            </ScrollView>

        </View>
    )
}

