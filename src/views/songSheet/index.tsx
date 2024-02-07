import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import styles from "./styles";
import {NavigationDes} from "common/interface";
import Back from "componests/back";
import IonicFont5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import {getImgColor, numAddLabel} from "utils/util";
import {ESongSheet, NHome} from "common/constant";
import {effect} from "utils/dva16";

const defaultImage = require('assets/home/defaultImage.jpg')

export default ({navigation,route}:NavigationDes) => {
    const [songSheetInfo,setSongSheetInfo]:any = useState(null);
    const [chState,setChState]:any = useState(false);
    const [openness,setOpenness]:any = useState(0);
    const bottomBoxTop = useRef(null);
    const topRef = useRef(null);
    const [topHeight,setTopHeight] = useState(0);
    // route.params={"diyLogo": null, "id": "2339725169", "image": "http://p2.music.126.net/16YjofanqyKk3GTQz4LhQw==/109951163463413693.jpg", "labelTexts": ["华语", "快乐", "流行"], "onPress": null, "playCount": 78387360, "title": "那些年甜甜的歌 ，甜到爆表～～～❤"}
    // console.log("navigation",route.params)

    useEffect(() => {
        getSongSheetInfo(route.params?.id)
    }, []);

    useEffect(() => {
        if(topRef.current){
            // @ts-ignore
            topRef.current.measure((x, y, width, height, pageX, pageY) => {
                setTopHeight(height)
            });
        }
    }, [topRef.current]);
    const getSongSheetInfo = async (id:string)=>{
        const result = await effect(NHome,ESongSheet,{id})
        if(result.code==200){
            setSongSheetInfo({
                creator:result?.playlist?.creator,
                description:result?.playlist?.description,
                songList:result?.playlist?.tracks.map((v:any)=>({
                    name:v.name,
                    id:v.id,
                }))
            })
            console.log("====",result?.playlist?.creator)
        }

    }
    const handleScroll=(event:any)=>{

    }
    return (
        <View style={styles.home}>
            <Back navigation={navigation} breakImage={route.params?.image} openness={openness} />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} onScroll={(event=>{
                //获取距离顶部的距离
                const y = event.nativeEvent.contentOffset.y
                const is = y+80>=topHeight
                //获取到顶部的百分比
                const num = (y)/(topHeight-80)
                setOpenness(num)
                if(is&&!chState){
                    setChState(true)
                }else if(chState&&!is){
                    setChState(false)
                }
            })}
                        scrollEventThrottle={16}>
                <View>
                    <View style={styles.topBox} ref={topRef}>
                        <View style={styles.topBoxTop}>
                            <View style={styles.topBoxTopLeft}>
                                <View style={styles.ttBack}></View>
                                <Image source={{uri:route.params?.image}} style={styles.topBoxTopLeImage} />
                                <View style={styles.ttTop}>
                                    <IonicFont5 name='play' size={6} color={'#ffffff'}/>
                                    <Text style={{fontSize:17,color:'#ffffff'}}>{numAddLabel(route.params.playCount)}</Text>
                                </View>
                            </View>
                            <View style={styles.topBoxTopRight}>
                                <Text style={styles.topBoxTopRightTitle} >{route.params?.title}</Text>
                                <View style={styles.creator}>
                                    <Image source={songSheetInfo?{uri:songSheetInfo?.creator?.avatarUrl}:defaultImage} style={styles.creatorAvatar} />
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.creatorDesc}>{songSheetInfo?.creator?.description||songSheetInfo?.creator?.nickname}</Text>
                                    <TouchableOpacity style={styles.attention}>
                                        <AntDesign name='plus' color='white' size={14}/>
                                        <Text style={{fontSize:15,color:'white'}}> 关注</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.topBoxTopRightLabel}>
                                    {route.params?.labelTexts.map((v:string,i:number)=>(
                                        <Text key={i} style={styles.tag}>{v}</Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.desc}>{songSheetInfo?.description||"···········"}</Text>
                        <View style={styles.topBoxBottom}>
                            <TouchableOpacity style={styles.topBoxBottomCent}>
                                <FontAwesome6 name='share' size={16} color='white'/>
                                <Text style={styles.topBoxBottomCentText}>123</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.topBoxBottomCent}>
                                <FontAwesome6 name='comment-dots' size={16} color='white'/>
                                <Text style={styles.topBoxBottomCentText}>123</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.topBoxBottomCent}>
                                <MaterialIcons name='library-add' size={16} color='white'/>
                                <Text style={styles.topBoxBottomCentText}>123</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image style={styles.topBoxBackImg} source={{uri:getImgColor(route.params?.image)}} />
                    <View style={{zIndex:4,position:'relative'}}>
                        <View style={styles.bottomBoxTop} ref={bottomBoxTop}>
                            <View style={styles.listPlay}>
                                <View style={styles.listPlayLeft}>
                                    <AntDesign size={18} name={'play'} color={'red'} />
                                    <View style={styles.listPlayLeft}>
                                        <Text style={styles.listPlayLeftText}>播放全部</Text>
                                        <Text style={styles.listPlayLeftNum}>({songSheetInfo?.songList?.length||0})</Text>
                                    </View>
                                </View>
                                <View style={styles.listPlayRight}>
                                    <Octicons size={18} name={'download'} color={'black'}/>
                                    <FontAwesome6 size={18} name={'list-check'} color={'black'} style={{marginLeft:20}}/>
                                </View>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.songList} nestedScrollEnabled={true} scrollEnabled={chState}>
                            {songSheetInfo?.songList.map((v:any,i:number)=>(
                                <TouchableOpacity key={i} style={styles.songListBox} onPress={()=>{
                                    // @ts-ignore
                                    const y = bottomBoxTop.current.measure((x, y, width, height, pageX, pageY) => {
                                        console.log(pageY)
                                    });
                                }}>
                                    <View style={styles.songListBoxLeft}>
                                        <Text style={styles.songListBoxLeftNum}>{i+1}</Text>
                                        <Text style={styles.songListBoxLeftText}>{v.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.songListBoxRight}>
                                        <AntDesign size={20} name={'play'} color={'black'} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

