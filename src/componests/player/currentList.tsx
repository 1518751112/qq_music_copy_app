import React, {useRef} from 'react';
import {Animated, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useStore} from "utils/dva16";
import {fee, NMusic} from "common/constant";
import {MusicTools} from "utils/musicTools";
import DragFloating from "componests/dragFloating";
import {Tabs} from "@ant-design/react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

//当前音乐列表
function CurrentList(props:{
    setVisible:(value:boolean)=>void;
    visible:boolean;
}) {
    const {visible,setVisible} = props
    const {currentInfo,state} = useStore(NMusic);
    const itemHeight = useRef<{height:number}>({height:0}).current

    const getItemLayout = (data:any, index:number) => {
        const length = itemHeight.height;
        const offset = length*index
        return {length, offset, index}
    }
    return (
        <DragFloating visible={visible} onRequestClose={()=>setVisible(false)} goInTime={500}>
            <View style={styles.strip}></View>
            <Tabs
                style={styles.wrapper}
                tabBarTextStyle={{fontSize:18}}
                tabBarUnderlineStyle={styles.tabsLine}
                tabs={[{ title: '播放历史' }, { title: '当前播放' }]}
                tabBarActiveTextColor={'#000000'}
                tabBarInactiveTextColor={'#757575'}
                prerenderingSiblingsNumber={0}
            >
                {[1,1].map((v, index: number) => (
                    <TouchableOpacity activeOpacity={1} style={styles.menuContent} key={index}>
                        <View style={styles.tool}>
                            <TouchableOpacity style={styles.toolLeft}>
                                <Fontisto name='cloud-down' size={16} color='black'/>
                                <Text style={{color:'#000000'}}> 循环模式</Text>
                            </TouchableOpacity>
                            <View style={styles.toolRight}>
                                <Fontisto name='cloud-down' size={18} color='black'/>
                                <MaterialIcons name='library-add' size={18} color='black'/>
                                <Feather name='trash-2' size={18} color='black'/>
                            </View>
                        </View>
                        <FlatList style={styles.scrollView} data={currentInfo?.list||[]}  keyExtractor={(item,index) => index+''}
                                  initialNumToRender={15}
                                  extraData={currentInfo}
                                  // getItemLayout={getItemLayout}
                                  renderItem={({item:v,index}:any)=>(
                                      <TouchableOpacity style={styles.songListBox} onPress={()=>{
                            MusicTools.play(v.id,{
                                ...v,
                                songInfo:currentInfo.songInfo
                            })
                        }} onLayout={object => {
                            if(!itemHeight.height){
                                itemHeight.height = object.nativeEvent.layout.height
                            }
                                      }}>
                            <View style={styles.songListBoxLeft}>
                                <Text style={styles.songListBoxLeftNum}>{index+1}</Text>
                                <View>
                                    <Text style={[styles.songListBoxLeftText,currentInfo&&currentInfo.id==v.id?styles.songListBoxLeftTextSelect:null]}>{v.title}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.songListBoxLeftNum}>{fee[v.fee]}</Text>
                                        <Text style={styles.songListBoxLeftNum}> {v.artist}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.songListBoxRight}>
                                <AntDesign size={20} name={currentInfo&&currentInfo.id==v.id&&state?'pause':'play'} color={'black'} />
                            </View>
                        </TouchableOpacity>)}>
                        </FlatList>
                        <View style={{height:65}} />
                    </TouchableOpacity>))}
            </Tabs>
        </DragFloating>
  );
}
export default CurrentList

