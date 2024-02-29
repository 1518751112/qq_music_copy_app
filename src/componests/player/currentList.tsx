import React, {useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useStore} from "utils/dva16";
import {fee, NMusic} from "common/constant";
import {MusicTools} from "utils/musicTools";
import DragFloating from "componests/dragFloating";
import {Tabs} from "@ant-design/react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

//当前音乐列表
function CurrentList(props: {
    setVisible: (value: boolean) => void;
    visible: boolean;
}) {
    const {visible, setVisible} = props
    const {currentInfo, state, history} = useStore(NMusic);
    const itemHeight = useRef<{ height: number }>({height: 0}).current

    return (
        <DragFloating visible={visible} onRequestClose={() => setVisible(false)} goInTime={500}>
            <View style={styles.strip}></View>
            <Tabs
                style={styles.wrapper}
                tabBarTextStyle={{fontSize: 18}}
                tabBarUnderlineStyle={styles.tabsLine}
                tabs={[{title: '播放历史'}, {title: `当前播放(${currentInfo?.list?.length || 0})`}]}
                tabBarActiveTextColor={'#000000'}
                tabBarInactiveTextColor={'#757575'}
                prerenderingSiblingsNumber={0}
            >
                {[1, 1].map((v, index: number) => (
                    <View style={styles.menuContent} key={index}>
                        <View style={styles.tool}>
                            {index == 0 ? <Text style={styles.toolLeftTxt}>全部歌曲{history.length || 0}首</Text> :
                                <TouchableOpacity style={styles.toolLeft}>
                                    <FontAwesome name='random' size={16} color='black'/>
                                    <Text style={{color: '#000000'}}> 循环模式</Text>
                                </TouchableOpacity>}
                            <View style={styles.toolRight}>
                                <Fontisto name='cloud-down' size={18} color='black'/>
                                <MaterialIcons name='library-add' size={18} color='black'/>
                                <Feather name='trash-2' size={18} color='black'/>
                            </View>
                        </View>
                        <FlatList style={styles.scrollView} data={index == 0 ? history || [] : currentInfo?.list || []}
                                  keyExtractor={(item, index) => index + ''}
                                  initialNumToRender={15}
                                  extraData={currentInfo}
                            // getItemLayout={getItemLayout}
                                  renderItem={({item: v, index:itemIndex}: any) => (
                                      <TouchableOpacity style={styles.songListBox} onPress={() => {
                                          MusicTools.play(v.id, {
                                              ...v,
                                              songInfo: currentInfo.songInfo
                                          })
                                      }} onLayout={object => {
                                          if (!itemHeight.height) {
                                              itemHeight.height = object.nativeEvent.layout.height
                                          }
                                      }}>
                                          <View style={styles.songListBoxLeft}>
                                              <Text style={styles.songListFee}>{fee[v.fee]}</Text>
                                              <Text
                                                  style={[styles.songListBoxLeftText, currentInfo && currentInfo.id == v.id ? styles.songListBoxLeftTextSelect : null]}
                                                  numberOfLines={1} ellipsizeMode="tail">{v.title}</Text>
                                              <Text
                                                  style={[styles.songListArtist, currentInfo && currentInfo.id == v.id ? styles.songListBoxLeftTextSelect : null]}
                                                  numberOfLines={1} ellipsizeMode="tail"> · {v.artist}</Text>
                                          </View>
                                          <AntDesign size={20}
                                                     name={index==0?"close":currentInfo && currentInfo.id == v.id && state ? 'pause' : 'play'}
                                                     onPress={()=>{
                                                         if(index==0){
                                                             MusicTools.removeHistory(v.id)
                                                         }

                                                     }}
                                                     color={'black'}/>
                                      </TouchableOpacity>)}>
                        </FlatList>
                        <View style={{height: 65}}/>
                    </View>))}
            </Tabs>
        </DragFloating>
    );
}

export default CurrentList

