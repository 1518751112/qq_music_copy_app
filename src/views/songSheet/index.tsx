import {Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import styles from "./styles";
import {NavigationDes, Pagination} from "common/interface";
import Back from "componests/back";
import IonicFont5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import {getImgColor, numAddLabel} from "utils/util";
import {ESongDetail, ESongSheet, fee, NHome, NMusic, RSetState} from "common/constant";
import {effect, reducer, useStore} from "utils/dva16";
import {MusicTools} from "utils/musicTools";
import {ActivityIndicator} from "@ant-design/react-native";

const defaultImage = require('assets/home/defaultImage.jpg')

let onSetOpacity:((num:number)=>void)|null = null;
export default ({navigation,route}:NavigationDes) => {
    const [songSheetInfo,setSongSheetInfo]:any = useState(null);
    // const [chState,setChState]:any = useState(false);
    const [dataList,setDataList]:any = useState<any[]>([]);
    const bottomBoxTop = useRef(null);
    const topRef = useRef(null);
    const page = useRef(new Pagination(50)).current;
    const [topHeight,setTopHeight] = useState(0);
    const {currentInfo,state} = useStore(NMusic)
    // route.params={"diyLogo": null, "id": "8438502788", "image": "http://p1.music.126.net/CKlGkBooXFEbxC6erWhEig==/109951168638864124.jpg", "labelTexts": ["华语", "流行", "网络歌曲"], "onPress": null, "playCount": 2146097, "title": "168首超好听爆火热歌精选"}


    useEffect(() => {
        setTimeout(()=>{
            getSongSheetInfo(route.params?.id)
        },1000)
        console.log("navigation",route.params)
        setTimeout(()=>{
            reducer(NHome,RSetState,{playerIsShow:true,playerHeight:0})
        },100)
        return ()=>{
            onSetOpacity = null;
        }
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
            const data = {
                creator:result?.playlist?.creator,
                description:result?.playlist?.description,
                songList:result?.playlist?.tracks.map((v:any)=>({
                    name:v.name,
                    id:v.id,
                }))
            }
            setSongSheetInfo(data)
            await handlePage(1,data)
            // console.log("====",result?.playlist?.creator)
        }

    }
    const handleScroll=(event:NativeSyntheticEvent<NativeScrollEvent>)=>{
        //获取距离顶部的距离
        const y = event.nativeEvent.contentOffset.y
        const is = y+80>=topHeight
        //获取到顶部的百分比
        const num = (y)/(topHeight-80)
        if(event.nativeEvent.contentSize.height-event.nativeEvent.layoutMeasurement.height-y<130){
            handlePage(page.page+1)

        }
        onSetOpacity&&onSetOpacity(num)
        // setChState(is)
    }
    //分页
    const handlePage = async (index:number,data?:any)=>{
        if(page.loading){
            return
        }
        page.loading=true;
        const outData = data||songSheetInfo
        if(!page.totalPages){
            //通过总数计算总页数
            page.totalPages = Math.ceil((outData?.songList.length||0)/page.size)
        }
        if(index<1||index>page.totalPages){
            page.loading=false;
            return
        }
        page.page = index
        const ids = outData?.songList.slice((index-1)*page.size,index*page.size).map((v:any)=>v.id)
        //获取数据
        const result = await effect(NMusic,ESongDetail,{ids});
        if(result.code==200){
            setDataList(dataList.concat(result.songs.map((v:any)=>({
                id:v.id,
                title:v.name,
                artwork:v.al.picUrl,
                artist:v.ar.map((value:any)=>value.name).join("|"),
                fee:v.fee
            }))))
        }
        page.loading=false;

    }

    return (
        <View style={styles.home}>
            <Back navigation={navigation} breakImage={route.params?.image} config={(setOpacity)=>{
                onSetOpacity = setOpacity
            }} />
            {/*<Player navigation={navigation} />*/}
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} onScroll={handleScroll} stickyHeaderIndices={[2]}
                        scrollEventThrottle={10} style={{paddingBottom:50}}>
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
                </View >
                <Image style={styles.topBoxBackImg} source={{uri:getImgColor(route.params?.image)}} />
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
                <View style={styles.songList} >
                    <ActivityIndicator animating={!dataList.length} size="small" color="#0000ff" />
                    {dataList.map((v:any,i:number)=>(
                        <TouchableOpacity key={i} style={styles.songListBox} onPress={()=>{
                            MusicTools.play(v.id,{
                                ...v,
                                songInfo:route.params,
                                list:dataList,
                            })
                        }}>
                            <View style={styles.songListBoxLeft}>
                                <Text style={styles.songListBoxLeftNum}>{i+1}</Text>
                                <View>
                                    <Text style={[styles.songListBoxLeftText,currentInfo&&currentInfo.id==v.id?styles.songListBoxLeftTextSelect:null]} numberOfLines={1} ellipsizeMode="tail">{v.title}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.songListBoxLeftNum}>{fee[v.fee]}</Text>
                                        <Text style={styles.songListBoxLeftNum}> {v.artist}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.songListBoxRight}>
                                <AntDesign size={20} name={currentInfo&&currentInfo.id==v.id&&state?'pause':'play'} color={'black'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{height:65}} />
                </View>
            </ScrollView>

        </View>
    )
}

