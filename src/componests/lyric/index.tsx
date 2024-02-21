import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import styles from "./styles";
import {Navigation} from "common/interface";
import StatusBarDiy from "componests/statusBarDiy";
import DragFloating from "componests/dragFloating";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useStore} from "utils/dva16";
import {NMusic} from "common/constant";

//歌词组件
function Lyric(props:{
    navigation:Navigation,
    setVisible: (value: boolean) => void;
    visible: boolean;
}) {
    const {navigation,visible,setVisible} = props;
    const {currentInfo,state} = useStore(NMusic);
    useEffect(()=>{
        if(visible){
            StatusBarDiy.setBarStyle("light-content",true)
        }
    },[visible])
    return (
        <DragFloating visible={visible} style={styles.home} onRequestClose={()=>setVisible(false)}>
            <View style={styles.box}>
                <View style={styles.back}>
                    <AntDesign name='down' size={22} />
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:20}}>{currentInfo?.title||"歌名"}</Text>
                        <Text style={{color:'#b7b7b7'}}>{currentInfo?.artist||"歌手"}</Text>
                    </View>
                    <SimpleLineIcons name='share' size={25} />
                </View>
            </View>
        </DragFloating>
  );
}
export default Lyric

